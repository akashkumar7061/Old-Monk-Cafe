const express = require('express');
const router = express.Router();

const {
  createOrder,
  verifyPayment,
  getMyOrders,
  getOrderById,
  getInvoice,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { protect, authorize, attachUserIfPresent } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {
  createOrderValidator,
  updateOrderStatusValidator,
  verifyPaymentValidator,
} = require('../validators/orderValidator');
const { ROLES } = require('../utils/constants');

router.post('/', attachUserIfPresent, createOrderValidator, validateRequest, createOrder);
router.post('/verify-payment', verifyPaymentValidator, validateRequest, verifyPayment);

router.get('/my', protect, getMyOrders);
router.get('/:id/invoice', protect, getInvoice);
router.get('/:id', protect, getOrderById);

// ---- Admin ----
router.get('/', protect, authorize(ROLES.ADMIN, ROLES.STAFF), getAllOrders);
router.patch(
  '/:id/status',
  protect,
  authorize(ROLES.ADMIN, ROLES.STAFF),
  updateOrderStatusValidator,
  validateRequest,
  updateOrderStatus
);

module.exports = router;
