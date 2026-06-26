const asyncHandler = require('../middleware/asyncHandler');
const Gallery = require('../models/Gallery');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Get gallery images (public, supports category filter for masonry tabs)
// @route   GET /api/v1/gallery?category=
// @access  Public
const getGalleryImages = asyncHandler(async (req, res) => {
  const filter = { isActive: true };
  if (req.query.category) filter.category = req.query.category;

  const images = await Gallery.find(filter).sort('displayOrder -createdAt');
  new ApiResponse(200, images, 'Gallery images fetched').send(res);
});

// @desc    Upload one or more images to the gallery
// @route   POST /api/v1/gallery
// @access  Private/Admin
const uploadGalleryImages = asyncHandler(async (req, res) => {
  if (!req.files?.length) throw ApiError.badRequest('Please upload at least one image');

  const { category, caption } = req.body;

  const uploaded = await Promise.all(
    req.files.map(async (file) => {
      const { url, publicId } = await uploadBufferToCloudinary(file.buffer, 'oldmonk/gallery');
      return Gallery.create({
        image: { url, publicId },
        category,
        caption,
        uploadedBy: req.user._id,
      });
    })
  );

  new ApiResponse(201, uploaded, `${uploaded.length} image(s) uploaded successfully`).send(res, 201);
});

// @desc    Update gallery image metadata (category, caption, order, active flag)
// @route   PATCH /api/v1/gallery/:id
// @access  Private/Admin
const updateGalleryImage = asyncHandler(async (req, res) => {
  const allowedFields = ['category', 'caption', 'displayOrder', 'isActive'];
  const updates = {};
  allowedFields.forEach((f) => {
    if (req.body[f] !== undefined) updates[f] = req.body[f];
  });

  const image = await Gallery.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!image) throw ApiError.notFound('Gallery image not found');

  new ApiResponse(200, image, 'Gallery image updated').send(res);
});

// @desc    Delete a gallery image (removes from Cloudinary too)
// @route   DELETE /api/v1/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = asyncHandler(async (req, res) => {
  const image = await Gallery.findByIdAndDelete(req.params.id);
  if (!image) throw ApiError.notFound('Gallery image not found');

  await deleteFromCloudinary(image.image.publicId);

  new ApiResponse(200, null, 'Gallery image deleted').send(res);
});

module.exports = { getGalleryImages, uploadGalleryImages, updateGalleryImage, deleteGalleryImage };
