const express = require('express');
const router = express.Router();

const {
  getApprovedReviews,
  createReview,
  getAllReviewsForAdmin,
  moderateReview,
  respondToReview,
  deleteReview,
} = require('../controllers/reviewController');
const { protect, authorize, attachUserIfPresent } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');
const validateRequest = require('../middleware/validateRequest');
const { createReviewValidator } = require('../validators/reviewValidator');
const { ROLES } = require('../utils/constants');

router.get('/', getApprovedReviews);
router.post(
  '/',
  attachUserIfPresent,
  uploadMultiple('images', 4),
  createReviewValidator,
  validateRequest,
  createReview
);

// ---- Admin moderation ----
router.get('/admin/all', protect, authorize(ROLES.ADMIN, ROLES.STAFF), getAllReviewsForAdmin);
router.patch('/:id/moderate', protect, authorize(ROLES.ADMIN, ROLES.STAFF), moderateReview);
router.patch('/:id/respond', protect, authorize(ROLES.ADMIN, ROLES.STAFF), respondToReview);
router.delete('/:id', protect, authorize(ROLES.ADMIN), deleteReview);

module.exports = router;
