const { body } = require('express-validator');

const menuItemValidator = [
  body('name').trim().notEmpty().withMessage('Item name is required').isLength({ max: 80 }),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('category').isMongoId().withMessage('Valid category ID is required'),
  body('description').optional().isLength({ max: 400 }),
  body('isVeg').optional().isBoolean(),
  body('isFeatured').optional().isBoolean(),
  body('isAvailable').optional().isBoolean(),
];

const categoryValidator = [
  body('name').trim().notEmpty().withMessage('Category name is required'),
  body('description').optional().isLength({ max: 300 }),
];

module.exports = { menuItemValidator, categoryValidator };
