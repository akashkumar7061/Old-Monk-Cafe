const Order = require('../models/Order');
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const { ORDER_STATUS } = require('../utils/constants');

const startOfDay = (d = new Date()) => new Date(d.setHours(0, 0, 0, 0));
const daysAgo = (n) => new Date(Date.now() - n * 24 * 60 * 60 * 1000);

/** High-level dashboard summary cards. */
const getDashboardSummary = async () => {
  const today = startOfDay(new Date());

  const [todayOrders, todayRevenueAgg, totalCustomers, pendingReservations, totalOrders] =
    await Promise.all([
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.aggregate([
        { $match: { createdAt: { $gte: today }, status: { $ne: ORDER_STATUS.CANCELLED } } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } },
      ]),
      User.countDocuments({ role: 'customer' }),
      Reservation.countDocuments({ status: 'pending' }),
      Order.countDocuments(),
    ]);

  return {
    todayOrders,
    todayRevenue: todayRevenueAgg[0]?.total || 0,
    totalCustomers,
    pendingReservations,
    totalOrders,
  };
};

/** Revenue grouped by day for the last N days — feeds a line chart on the dashboard. */
const getRevenueTrend = async (days = 14) => {
  const since = startOfDay(daysAgo(days));
  return Order.aggregate([
    { $match: { createdAt: { $gte: since }, status: { $ne: ORDER_STATUS.CANCELLED } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        revenue: { $sum: '$totalAmount' },
        orders: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);
};

/** Most ordered menu items (by quantity) — feeds "Popular Items" widget. */
const getPopularItems = async (limit = 10) => {
  return Order.aggregate([
    { $match: { status: { $ne: ORDER_STATUS.CANCELLED } } },
    { $unwind: '$items' },
    {
      $group: {
        _id: '$items.menuItem',
        name: { $first: '$items.name' },
        totalQuantity: { $sum: '$items.quantity' },
        totalRevenue: { $sum: '$items.subtotal' },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: limit },
  ]);
};

/** Reservation breakdown by status for the analytics page. */
const getReservationStats = async () => {
  const stats = await Reservation.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  return stats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
};

/** Order status breakdown. */
const getOrderStatusBreakdown = async () => {
  const stats = await Order.aggregate([{ $group: { _id: '$status', count: { $sum: 1 } } }]);
  return stats.reduce((acc, s) => ({ ...acc, [s._id]: s.count }), {});
};

module.exports = {
  getDashboardSummary,
  getRevenueTrend,
  getPopularItems,
  getReservationStats,
  getOrderStatusBreakdown,
};
