const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { uploadBufferToCloudinary, deleteFromCloudinary } = require('../config/cloudinary');

// @desc    Update own profile (name, phone, addresses)
// @route   PATCH /api/v1/users/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {
  const allowedFields = ['name', 'phone', 'addresses'];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.user._id, updates, {
    new: true,
    runValidators: true,
  });

  new ApiResponse(200, user, 'Profile updated successfully').send(res);
});

// @desc    Upload/replace own avatar
// @route   PATCH /api/v1/users/me/avatar
// @access  Private
const updateAvatar = asyncHandler(async (req, res) => {
  if (!req.file) throw ApiError.badRequest('Please upload an image file');

  const user = await User.findById(req.user._id);
  if (user.avatar?.publicId) await deleteFromCloudinary(user.avatar.publicId);

  const { url, publicId } = await uploadBufferToCloudinary(req.file.buffer, 'oldmonk/avatars');
  user.avatar = { url, publicId };
  await user.save({ validateBeforeSave: false });

  new ApiResponse(200, user, 'Avatar updated successfully').send(res);
});

// ============ ADMIN-ONLY ============

// @desc    List all users (filter by role, search by name/email)
// @route   GET /api/v1/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  const { role, search, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [users, total] = await Promise.all([
    User.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
    User.countDocuments(filter),
  ]);

  new ApiResponse(200, users, 'Users fetched', {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  }).send(res);
});

// @desc    Get a single user by ID
// @route   GET /api/v1/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw ApiError.notFound('User not found');
  new ApiResponse(200, user, 'User fetched').send(res);
});

// @desc    Update a user's role or active status (promote to staff/admin, deactivate, etc.)
// @route   PATCH /api/v1/users/:id
// @access  Private/Admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const allowedFields = ['role', 'isActive'];
  const updates = {};
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) updates[field] = req.body[field];
  });

  const user = await User.findByIdAndUpdate(req.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) throw ApiError.notFound('User not found');

  new ApiResponse(200, user, 'User updated successfully').send(res);
});

// @desc    Delete a user account
// @route   DELETE /api/v1/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) throw ApiError.notFound('User not found');
  new ApiResponse(200, null, 'User deleted successfully').send(res);
});

module.exports = { updateMe, updateAvatar, getAllUsers, getUserById, updateUserByAdmin, deleteUser };
