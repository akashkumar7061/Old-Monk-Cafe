const asyncHandler = require('../middleware/asyncHandler');
const Category = require('../models/Category');
const MenuItem = require('../models/MenuItem');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Get all active categories (public menu navigation)
// @route   GET /api/v1/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const filter = req.query.includeInactive === 'true' ? {} : { isActive: true };
  const categories = await Category.find(filter).sort('displayOrder');
  new ApiResponse(200, categories, 'Categories fetched').send(res);
});

// @desc    Create a new category
// @route   POST /api/v1/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const payload = { ...req.body };

  if (req.file) {
    const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, 'oldmonk/categories');
    payload.image = { url, publicId };
  }

  const category = await Category.create(payload);
  new ApiResponse(201, category, 'Category created successfully').send(res, 201);
});

// @desc    Update a category
// @route   PATCH /api/v1/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) throw ApiError.notFound('Category not found');

  Object.assign(category, req.body);

  if (req.file) {
    if (category.image?.publicId) await deleteFromCloudinary(category.image.publicId);
    const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, 'oldmonk/categories');
    category.image = { url, publicId };
  }

  await category.save();
  new ApiResponse(200, category, 'Category updated successfully').send(res);
});

// @desc    Delete a category (blocked if menu items still reference it)
// @route   DELETE /api/v1/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const itemCount = await MenuItem.countDocuments({ category: req.params.id });
  if (itemCount > 0) {
    throw ApiError.badRequest(
      `Cannot delete category with ${itemCount} menu item(s) attached. Reassign or delete them first.`
    );
  }

  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) throw ApiError.notFound('Category not found');
  if (category.image?.publicId) await deleteFromCloudinary(category.image.publicId);

  new ApiResponse(200, null, 'Category deleted successfully').send(res);
});

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };
