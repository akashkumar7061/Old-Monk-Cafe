const mongoose = require('mongoose');
const { GALLERY_CATEGORIES } = require('../utils/constants');

const gallerySchema = new mongoose.Schema(
  {
    image: {
      url: { type: String, required: true },
      publicId: { type: String, required: true },
    },
    caption: { type: String, trim: true, maxlength: 150 },
    category: { type: String, enum: GALLERY_CATEGORIES, default: 'interior' },
    displayOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

gallerySchema.index({ category: 1, isActive: 1 });

module.exports = mongoose.model('Gallery', gallerySchema);
