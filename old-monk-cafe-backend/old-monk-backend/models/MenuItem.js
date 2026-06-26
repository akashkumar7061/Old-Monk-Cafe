const mongoose = require('mongoose');
const slugify = require('slugify');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Item name is required'], trim: true, maxlength: 80 },
    slug: { type: String, index: true },
    description: { type: String, trim: true, maxlength: 400 },
    price: { type: Number, required: [true, 'Price is required'], min: 0 },
    discountPrice: { type: Number, min: 0, default: null },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    image: { url: String, publicId: String },
    gallery: [{ url: String, publicId: String }],
    isVeg: { type: Boolean, default: true },
    spicyLevel: { type: Number, min: 0, max: 3, default: 0 },
    prepTimeMinutes: { type: Number, default: 15 },
    tags: [{ type: String, trim: true, lowercase: true }], // e.g. "bestseller", "new", "combo"
    isFeatured: { type: Boolean, default: false },
    isAvailable: { type: Boolean, default: true },
    ratingsAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingsCount: { type: Number, default: 0 },
    orderCount: { type: Number, default: 0 }, // incremented on each order for "popular items" analytics
  },
  { timestamps: true }
);

menuItemSchema.index({ name: 'text', description: 'text', tags: 1 });
menuItemSchema.index({ category: 1, isAvailable: 1 });
menuItemSchema.index({ isFeatured: 1 });

menuItemSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, strict: true }) + '-' + Date.now().toString(36);
  }
  next();
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
