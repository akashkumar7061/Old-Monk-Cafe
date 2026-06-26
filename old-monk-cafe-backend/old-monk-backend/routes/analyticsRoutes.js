const express = require('express');
const router = express.Router();

const {
  getSummary,
  getRevenueTrend,
  getPopularItems,
  getReservationStats,
  getOrderStatusBreakdown,
} = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');
const { ROLES } = require('../utils/constants');

router.use(protect, authorize(ROLES.ADMIN, ROLES.STAFF));

router.get('/summary', getSummary);
router.get('/revenue-trend', getRevenueTrend);
router.get('/popular-items', getPopularItems);
router.get('/reservations', getReservationStats);
router.get('/orders-breakdown', getOrderStatusBreakdown);

module.exports = router;
