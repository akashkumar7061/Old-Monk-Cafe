const crypto = require('crypto');
const razorpay = require('../config/razorpay');
const ApiError = require('../utils/ApiError');

/**
 * Creates a Razorpay order. Amount must be in paise (₹1 = 100 paise).
 */
const createRazorpayOrder = async (amountInRupees, receipt) => {
  try {
    const order = await razorpay.orders.create({
      amount: Math.round(amountInRupees * 100),
      currency: 'INR',
      receipt,
      payment_capture: 1,
    });
    return order;
  } catch (error) {
    throw ApiError.internal(`Razorpay order creation failed: ${error.message}`);
  }
};

/**
 * Verifies the HMAC-SHA256 signature Razorpay sends back after checkout
 * to confirm the payment wasn't tampered with client-side.
 */
const verifyPaymentSignature = ({ razorpayOrderId, razorpayPaymentId, razorpaySignature }) => {
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  return generatedSignature === razorpaySignature;
};

/**
 * Verifies the webhook payload signature (used for the server-to-server
 * Razorpay webhook, independent of the client-side checkout flow).
 */
const verifyWebhookSignature = (rawBody, signature) => {
  const expected = crypto
    .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex');
  return expected === signature;
};

module.exports = { createRazorpayOrder, verifyPaymentSignature, verifyWebhookSignature };
