const { body } = require('express-validator');

const createOrderValidator = [
  body('items')
    .isArray({ min: 1 })
    .withMessage('Order must contain at least one item'),
  body('items.*.menuItem').isMongoId().withMessage('Valid menu item ID is required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  body('orderType')
    .isIn(['dine_in', 'takeaway', 'delivery'])
    .withMessage('Invalid order type'),
  body('paymentMethod').isIn(['cod', 'razorpay']).withMessage('Invalid payment method'),
  body('deliveryAddress.line1')
    .if(body('orderType').equals('delivery'))
    .notEmpty()
    .withMessage('Delivery address is required for delivery orders'),
];

const updateOrderStatusValidator = [
  body('status')
    .isIn(['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'])
    .withMessage('Invalid order status'),
];

const verifyPaymentValidator = [
  body('razorpayOrderId').notEmpty().withMessage('razorpayOrderId is required'),
  body('razorpayPaymentId').notEmpty().withMessage('razorpayPaymentId is required'),
  body('razorpaySignature').notEmpty().withMessage('razorpaySignature is required'),
  body('orderId').isMongoId().withMessage('Valid internal orderId is required'),
];

module.exports = { createOrderValidator, updateOrderStatusValidator, verifyPaymentValidator };
