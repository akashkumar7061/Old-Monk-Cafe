const rateLimit = require('express-rate-limit');

const windowMs = Number(process.env.RATE_LIMIT_WINDOW_MIN || 15) * 60 * 1000;

/** General API limiter applied globally. */
const apiLimiter = rateLimit({
  windowMs,
  max: Number(process.env.RATE_LIMIT_MAX || 100000), // Increased to 100,000 for demo and testing
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later' },
});

/** Stricter limiter for auth routes to slow down brute-force/credential-stuffing attempts. */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000, // Increased to 10,000 for ease of testing
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many login attempts, please try again in 15 minutes' },
});

module.exports = { apiLimiter, authLimiter };
