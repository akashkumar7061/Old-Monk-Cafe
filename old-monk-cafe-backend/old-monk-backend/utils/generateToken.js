const jwt = require('jsonwebtoken');

/**
 * Sign a short-lived access token carrying id & role.
 */
const generateAccessToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

/**
 * Sign a longer-lived refresh token (used to mint new access tokens).
 */
const generateRefreshToken = (payload) =>
  jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });

/**
 * Set the access token as an httpOnly cookie (defense against XSS token theft)
 * while also returning it in the JSON body for clients that prefer header auth.
 */
const setTokenCookie = (res, token) => {
  const days = Number(process.env.JWT_COOKIE_EXPIRES_DAYS || 7);
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    expires: new Date(Date.now() + days * 24 * 60 * 60 * 1000),
  });
};

module.exports = { generateAccessToken, generateRefreshToken, setTokenCookie };
