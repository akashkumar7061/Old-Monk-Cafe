const Razorpay = require('razorpay');

/**
 * Single Razorpay instance reused across the app.
 * Keys come from env so test/live can be swapped without code changes.
 * Fallbacks are provided so the server doesn't crash on boot if keys are missing in production env.
 */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_placeholder',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'placeholder_secret',
});

module.exports = razorpay;
