const { body } = require('express-validator');

const createContactValidator = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('phone').optional().trim(),
  body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 1000 }),
];

module.exports = { createContactValidator };
