const { body } = require('express-validator');

const createReservationValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone')
    .matches(/^[6-9]\d{9}$/)
    .withMessage('Valid 10-digit Indian phone number is required'),
  body('date').isISO8601().toDate().withMessage('Valid reservation date is required'),
  body('timeSlot')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage('Time slot must be in HH:mm format'),
  body('guests').isInt({ min: 1, max: 30 }).withMessage('Guests must be between 1 and 30'),
];

const updateReservationStatusValidator = [
  body('status')
    .isIn(['pending', 'confirmed', 'rejected', 'cancelled', 'completed'])
    .withMessage('Invalid reservation status'),
];

module.exports = { createReservationValidator, updateReservationStatusValidator };
