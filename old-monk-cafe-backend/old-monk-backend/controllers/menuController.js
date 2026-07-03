const asyncHandler = require('../middleware/asyncHandler');
const MenuItem = require('../models/MenuItem');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Get menu items with filtering, search, and pagination
// @route   GET /api/v1/menu?category=&search=&isVeg=&featured=&page=&limit=&sort=
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  const { category, search, isVeg, featured, minPrice, maxPrice, page = 1, limit = 50, sort } = req.query;

  const filter = {};
  if (req.query.isAvailable !== undefined) {
    filter.isAvailable = req.query.isAvailable === 'true';
  }
  if (category) filter.category = category;
  if (isVeg !== undefined) filter.isVeg = isVeg === 'true';
  if (featured !== undefined) filter.isFeatured = featured === 'true';
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }
  if (search) filter.$text = { $search: search };

  const sortOption = sort || (search ? { score: { $meta: 'textScore' } } : '-createdAt');

  const skip = (Number(page) - 1) * Number(limit);
  const [items, total] = await Promise.all([
    MenuItem.find(filter)
      .populate('category', 'name slug')
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit)),
    MenuItem.countDocuments(filter),
  ]);

  new ApiResponse(200, items, 'Menu items fetched', {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  }).send(res);
});

// @desc    Get single menu item by ID or slug
// @route   GET /api/v1/menu/:idOrSlug
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
  const { idOrSlug } = req.params;
  const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? { _id: idOrSlug } : { slug: idOrSlug };

  const item = await MenuItem.findOne(query).populate('category', 'name slug');
  if (!item) throw ApiError.notFound('Menu item not found');

  new ApiResponse(200, item, 'Menu item fetched').send(res);
});

// @desc    Create a menu item (with image upload)
// @route   POST /api/v1/menu
// @access  Private/Admin
const createMenuItem = asyncHandler(async (req, res) => {
  const payload = { ...req.body };
  if (payload.tags && typeof payload.tags === 'string') {
    payload.tags = payload.tags.split(',').map((t) => t.trim());
  }

  if (req.file) {
    const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, 'oldmonk/menu');
    payload.image = { url, publicId };
  }

  const item = await MenuItem.create(payload);
  new ApiResponse(201, item, 'Menu item created successfully').send(res, 201);
});

// @desc    Update a menu item
// @route   PATCH /api/v1/menu/:id
// @access  Private/Admin
const updateMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) throw ApiError.notFound('Menu item not found');

  const payload = { ...req.body };
  if (payload.tags && typeof payload.tags === 'string') {
    payload.tags = payload.tags.split(',').map((t) => t.trim());
  }
  Object.assign(item, payload);

  if (req.file) {
    if (item.image?.publicId) await deleteFromCloudinary(item.image.publicId);
    const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, 'oldmonk/menu');
    item.image = { url, publicId };
  }

  await item.save();
  new ApiResponse(200, item, 'Menu item updated successfully').send(res);
});

// @desc    Delete a menu item
// @route   DELETE /api/v1/menu/:id
// @access  Private/Admin
const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await MenuItem.findByIdAndDelete(req.params.id);
  if (!item) throw ApiError.notFound('Menu item not found');
  if (item.image?.publicId) await deleteFromCloudinary(item.image.publicId);

  new ApiResponse(200, null, 'Menu item deleted successfully').send(res);
});

// @desc    Toggle featured flag quickly from the admin dashboard
// @route   PATCH /api/v1/menu/:id/toggle-featured
// @access  Private/Admin
const toggleFeatured = asyncHandler(async (req, res) => {
  const item = await MenuItem.findById(req.params.id);
  if (!item) throw ApiError.notFound('Menu item not found');

  item.isFeatured = !item.isFeatured;
  await item.save();

  new ApiResponse(200, item, `Item is now ${item.isFeatured ? 'featured' : 'unfeatured'}`).send(res);
});

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleFeatured,
};
