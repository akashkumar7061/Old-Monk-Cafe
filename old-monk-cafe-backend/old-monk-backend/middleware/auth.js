const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler');
const ApiError = require('../utils/ApiError');
const User = require('../models/User');

/**
 * Verifies JWT from "Authorization: Bearer <token>" header OR httpOnly cookie.
 * Attaches the authenticated user (minus password) to req.user.
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    throw ApiError.unauthorized('Not authorized, no token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) throw ApiError.unauthorized('User belonging to this token no longer exists');
    if (!user.isActive) throw ApiError.forbidden('Your account has been deactivated');

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Session expired, please log in again');
    }
    throw ApiError.unauthorized('Not authorized, invalid token');
  }
});

/**
 * Role guard. Usage: authorize('admin'), authorize('admin', 'staff')
 */
const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    throw ApiError.forbidden(`Role '${req.user?.role}' is not permitted to access this resource`);
  }
  next();
};

/**
 * Optional auth: attaches req.user if a valid token is present, but never blocks
 * the request. Useful for routes like "submit review" that allow guest + logged-in users.
 */
const attachUserIfPresent = asyncHandler(async (req, res, next) => {
  let token;
  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
  } catch {
    // Silently ignore invalid token for optional-auth routes
  }
  next();
});

module.exports = { protect, authorize, attachUserIfPresent };
