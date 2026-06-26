const Razorpay = require('razorpay');

/**
 * Single Razorpay instance reused across the app.
 * Keys come from env so test/live can be swapped without code changes.
 */
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;
