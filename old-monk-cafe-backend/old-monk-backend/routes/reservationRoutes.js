const express = require('express');
const router = express.Router();

const {
  checkAvailability,
  createReservation,
  getMyReservations,
  getReservationById,
  cancelMyReservation,
  getAllReservations,
  updateReservationStatus,
} = require('../controllers/reservationController');
const { protect, authorize, attachUserIfPresent } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const {
  createReservationValidator,
  updateReservationStatusValidator,
} = require('../validators/reservationValidator');
const { ROLES } = require('../utils/constants');

router.get('/availability', checkAvailability);
router.post('/', attachUserIfPresent, createReservationValidator, validateRequest, createReservation);

router.get('/my', protect, getMyReservations);
router.patch('/:id/cancel', protect, cancelMyReservation);
router.get('/:id', protect, getReservationById);

// ---- Admin ----
router.get('/', protect, authorize(ROLES.ADMIN, ROLES.STAFF), getAllReservations);
router.patch(
  '/:id/status',
  protect,
  authorize(ROLES.ADMIN, ROLES.STAFF),
  updateReservationStatusValidator,
  validateRequest,
  updateReservationStatus
);

module.exports = router;
