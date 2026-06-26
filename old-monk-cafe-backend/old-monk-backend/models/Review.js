const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestName: { type: String, trim: true }, // used when no logged-in user
    guestEmail: { type: String, trim: true, lowercase: true },
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', default: null }, // optional: review on specific dish
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true, maxlength: 100 },
    comment: { type: String, required: true, trim: true, maxlength: 1000 },
    images: [{ url: String, publicId: String }],
    isApproved: { type: Boolean, default: false },
    adminResponse: { type: String, trim: true },
  },
  { timestamps: true }
);

reviewSchema.index({ isApproved: 1, createdAt: -1 });
reviewSchema.index({ menuItem: 1 });

// Keep MenuItem's ratingsAverage/ratingsCount in sync whenever an approved review is added
reviewSchema.statics.recalculateMenuItemRatings = async function (menuItemId) {
  if (!menuItemId) return;
  const MenuItem = mongoose.model('MenuItem');
  const stats = await this.aggregate([
    { $match: { menuItem: menuItemId, isApproved: true } },
    { $group: { _id: '$menuItem', avg: { $avg: '$rating' }, count: { $sum: 1 } } },
  ]);

  await MenuItem.findByIdAndUpdate(menuItemId, {
    ratingsAverage: stats[0]?.avg?.toFixed(1) || 0,
    ratingsCount: stats[0]?.count || 0,
  });
};

module.exports = mongoose.model('Review', reviewSchema);
