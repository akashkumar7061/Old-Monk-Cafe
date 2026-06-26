const { body } = require('express-validator');

const createReviewValidator = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required').isLength({ max: 1000 }),
  body('guestName')
    .if((value, { req }) => !req.user)
    .notEmpty()
    .withMessage('Name is required for guest reviews'),
  body('menuItem').optional().isMongoId().withMessage('Invalid menu item ID'),
];

module.exports = { createReviewValidator };
