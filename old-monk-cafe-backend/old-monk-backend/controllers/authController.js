const crypto = require('crypto');
const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { generateAccessToken, setTokenCookie } = require('../utils/generateToken');
const { sendPasswordResetEmail } = require('../services/emailService');

// @desc    Register a new customer
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) throw ApiError.conflict('An account with this email already exists');

  const user = await User.create({ name, email, phone, password });
  const token = generateAccessToken({ id: user._id, role: user.role });
  setTokenCookie(res, token);

  new ApiResponse(201, { user: user.toSafeObject(), token }, 'Registration successful').send(
    res,
    201
  );
});

// @desc    Login (customer, staff, or admin — role is returned to the client)
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized('Invalid email or password');
  }
  if (!user.isActive) throw ApiError.forbidden('Your account has been deactivated');

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  const token = generateAccessToken({ id: user._id, role: user.role });
  setTokenCookie(res, token);

  new ApiResponse(200, { user: user.toSafeObject(), token }, 'Login successful').send(res);
});

// @desc    Logout - clears auth cookie
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  new ApiResponse(200, null, 'Logged out successfully').send(res);
});

// @desc    Get currently logged-in user's profile
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  new ApiResponse(200, req.user, 'Current user fetched').send(res);
});

// @desc    Request a password reset link via email
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // Always respond the same way to avoid leaking which emails are registered
  if (!user) {
    return new ApiResponse(200, null, 'If that email exists, a reset link has been sent').send(res);
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendPasswordResetEmail(user, resetUrl);

  new ApiResponse(200, null, 'If that email exists, a reset link has been sent').send(res);
});

// @desc    Reset password using the token emailed to the user
// @route   PATCH /api/v1/auth/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw ApiError.badRequest('Token is invalid or has expired');

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  const token = generateAccessToken({ id: user._id, role: user.role });
  setTokenCookie(res, token);

  new ApiResponse(200, { token }, 'Password reset successful').send(res);
});

// @desc    Update password while logged in
// @route   PATCH /api/v1/auth/update-password
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('+password');
  const { currentPassword, newPassword } = req.body;

  if (!(await user.comparePassword(currentPassword))) {
    throw ApiError.badRequest('Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  new ApiResponse(200, null, 'Password updated successfully').send(res);
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  updatePassword,
};
