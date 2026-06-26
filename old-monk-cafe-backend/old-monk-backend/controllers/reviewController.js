const asyncHandler = require('../middleware/asyncHandler');
const Review = require('../models/Review');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { uploadBufferToCloudinary } = require('../config/cloudinary');

// @desc    Get approved reviews (public testimonials section)
// @route   GET /api/v1/reviews?menuItem=&page=&limit=
// @access  Public
const getApprovedReviews = asyncHandler(async (req, res) => {
  const { menuItem, page = 1, limit = 12 } = req.query;
  const filter = { isApproved: true };
  if (menuItem) filter.menuItem = menuItem;

  const skip = (Number(page) - 1) * Number(limit);
  const [reviews, total] = await Promise.all([
    Review.find(filter).populate('user', 'name avatar').sort('-createdAt').skip(skip).limit(Number(limit)),
    Review.countDocuments(filter),
  ]);

  new ApiResponse(200, reviews, 'Reviews fetched', { total }).send(res);
});

// @desc    Submit a review (logged-in user or guest)
// @route   POST /api/v1/reviews
// @access  Public
const createReview = asyncHandler(async (req, res) => {
  const { rating, title, comment, menuItem, guestName, guestEmail } = req.body;

  const images = [];
  if (req.files?.length) {
    for (const file of req.files) {
      const { url, publicId } = await uploadBufferToCloudinary(file.buffer, 'oldmonk/reviews');
      images.push({ url, publicId });
    }
  }

  const review = await Review.create({
    user: req.user?._id || null,
    guestName: req.user ? undefined : guestName,
    guestEmail: req.user ? undefined : guestEmail,
    rating,
    title,
    comment,
    menuItem: menuItem || null,
    images,
    isApproved: false, // requires admin moderation before going public
  });

  new ApiResponse(201, review, 'Review submitted! It will appear after moderation.').send(res, 201);
});

// ============ ADMIN ============

// @desc    Get all reviews (including unapproved) for moderation
// @route   GET /api/v1/reviews/admin/all?isApproved=&page=&limit=
// @access  Private/Admin
const getAllReviewsForAdmin = asyncHandler(async (req, res) => {
  const { isApproved, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (isApproved !== undefined) filter.isApproved = isApproved === 'true';

  const skip = (Number(page) - 1) * Number(limit);
  const [reviews, total] = await Promise.all([
    Review.find(filter).populate('user', 'name email').sort('-createdAt').skip(skip).limit(Number(limit)),
    Review.countDocuments(filter),
  ]);

  new ApiResponse(200, reviews, 'Reviews fetched', { total }).send(res);
});

// @desc    Approve or reject a review
// @route   PATCH /api/v1/reviews/:id/moderate
// @access  Private/Admin
const moderateReview = asyncHandler(async (req, res) => {
  const { isApproved } = req.body;

  const review = await Review.findById(req.params.id);
  if (!review) throw ApiError.notFound('Review not found');

  review.isApproved = isApproved;
  await review.save();

  if (review.menuItem) await Review.recalculateMenuItemRatings(review.menuItem);

  new ApiResponse(200, review, `Review ${isApproved ? 'approved' : 'rejected'}`).send(res);
});

// @desc    Admin reply to a review
// @route   PATCH /api/v1/reviews/:id/respond
// @access  Private/Admin
const respondToReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) throw ApiError.notFound('Review not found');

  review.adminResponse = req.body.adminResponse;
  await review.save();

  new ApiResponse(200, review, 'Response added').send(res);
});

// @desc    Delete a review
// @route   DELETE /api/v1/reviews/:id
// @access  Private/Admin
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findByIdAndDelete(req.params.id);
  if (!review) throw ApiError.notFound('Review not found');

  if (review.menuItem) await Review.recalculateMenuItemRatings(review.menuItem);

  new ApiResponse(200, null, 'Review deleted').send(res);
});

module.exports = {
  getApprovedReviews,
  createReview,
  getAllReviewsForAdmin,
  moderateReview,
  respondToReview,
  deleteReview,
};
