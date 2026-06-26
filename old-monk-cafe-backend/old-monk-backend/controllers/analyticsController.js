const asyncHandler = require('../middleware/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const analyticsService = require('../services/analyticsService');

// @desc    Dashboard summary cards (today's orders, revenue, customers, pending reservations)
// @route   GET /api/v1/analytics/summary
// @access  Private/Admin
const getSummary = asyncHandler(async (req, res) => {
  const summary = await analyticsService.getDashboardSummary();
  new ApiResponse(200, summary).send(res);
});

// @desc    Revenue trend for the last N days (line chart)
// @route   GET /api/v1/analytics/revenue-trend?days=14
// @access  Private/Admin
const getRevenueTrend = asyncHandler(async (req, res) => {
  const trend = await analyticsService.getRevenueTrend(Number(req.query.days) || 14);
  new ApiResponse(200, trend).send(res);
});

// @desc    Most popular menu items by quantity ordered
// @route   GET /api/v1/analytics/popular-items?limit=10
// @access  Private/Admin
const getPopularItems = asyncHandler(async (req, res) => {
  const items = await analyticsService.getPopularItems(Number(req.query.limit) || 10);
  new ApiResponse(200, items).send(res);
});

// @desc    Reservation status breakdown
// @route   GET /api/v1/analytics/reservations
// @access  Private/Admin
const getReservationStats = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getReservationStats();
  new ApiResponse(200, stats).send(res);
});

// @desc    Order status breakdown
// @route   GET /api/v1/analytics/orders-breakdown
// @access  Private/Admin
const getOrderStatusBreakdown = asyncHandler(async (req, res) => {
  const stats = await analyticsService.getOrderStatusBreakdown();
  new ApiResponse(200, stats).send(res);
});

module.exports = { getSummary, getRevenueTrend, getPopularItems, getReservationStats, getOrderStatusBreakdown };
