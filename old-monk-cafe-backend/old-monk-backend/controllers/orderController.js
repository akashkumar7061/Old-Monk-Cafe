const asyncHandler = require('../middleware/asyncHandler');
const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { createRazorpayOrder, verifyPaymentSignature } = require('../services/paymentService');
const { generateInvoice } = require('../services/invoiceService');
const { sendOrderConfirmation, sendOrderStatusUpdate } = require('../services/emailService');
const { notifyAdminNewOrder } = require('../services/whatsappService');
const { ORDER_STATUS, PAYMENT_STATUS, PAYMENT_METHOD } = require('../utils/constants');

const TAX_RATE = 0.05; // 5% — adjust to actual applicable GST slab
const DELIVERY_FEE = 30;

/**
 * Recomputes order pricing server-side from live MenuItem prices.
 * Never trust prices sent from the client — this is the #1 security
 * requirement for any checkout flow.
 */
const buildOrderItems = async (requestedItems) => {
  const menuItemIds = requestedItems.map((i) => i.menuItem);
  const menuItems = await MenuItem.find({ _id: { $in: menuItemIds }, isAvailable: true });

  if (menuItems.length !== new Set(menuItemIds).size) {
    throw ApiError.badRequest('One or more menu items are unavailable or do not exist');
  }

  const menuItemMap = new Map(menuItems.map((m) => [m._id.toString(), m]));

  let itemsTotal = 0;
  const items = requestedItems.map(({ menuItem, quantity }) => {
    const dbItem = menuItemMap.get(menuItem);
    const price = dbItem.discountPrice ?? dbItem.price;
    const subtotal = price * quantity;
    itemsTotal += subtotal;
    return { menuItem: dbItem._id, name: dbItem.name, price, quantity, subtotal };
  });

  return { items, itemsTotal };
};

// @desc    Create a new order (COD instant-confirm, or Razorpay pending-payment)
// @route   POST /api/v1/orders
// @access  Public (guest checkout allowed) / Private (logged-in gets order history)
const createOrder = asyncHandler(async (req, res) => {
  const { items: requestedItems, orderType, paymentMethod, deliveryAddress, tableNumber, guestDetails } =
    req.body;

  if (!req.user && (!guestDetails?.name || !guestDetails?.phone)) {
    throw ApiError.badRequest('guestDetails (name, phone) is required for guest checkout');
  }

  const { items, itemsTotal } = await buildOrderItems(requestedItems);

  const taxAmount = Math.round(itemsTotal * TAX_RATE);
  const deliveryFee = orderType === 'delivery' ? DELIVERY_FEE : 0;
  const totalAmount = itemsTotal + taxAmount + deliveryFee;

  const order = await Order.create({
    user: req.user?._id || null,
    guestDetails: req.user ? undefined : guestDetails,
    items,
    itemsTotal,
    taxAmount,
    deliveryFee,
    totalAmount,
    orderType,
    deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
    tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
    paymentMethod,
    paymentStatus: paymentMethod === PAYMENT_METHOD.COD ? PAYMENT_STATUS.PENDING : PAYMENT_STATUS.PENDING,
    status: ORDER_STATUS.PENDING,
  });

  // Bump popularity counters for analytics (fire-and-forget)
  Promise.all(
    items.map((i) => MenuItem.findByIdAndUpdate(i.menuItem, { $inc: { orderCount: i.quantity } }))
  ).catch(() => {});

  let razorpayOrder = null;
  if (paymentMethod === PAYMENT_METHOD.RAZORPAY) {
    razorpayOrder = await createRazorpayOrder(totalAmount, order.orderNumber);
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();
  } else {
    // COD orders are confirmed immediately; Razorpay orders confirm after payment verification
    order.status = ORDER_STATUS.CONFIRMED;
    await order.save();
    sendOrderConfirmation(order).catch(() => {});
    notifyAdminNewOrder(order).catch(() => {});
  }

  new ApiResponse(
    201,
    { order, razorpayOrder, razorpayKeyId: process.env.RAZORPAY_KEY_ID },
    'Order created successfully'
  ).send(res, 201);
});

// @desc    Verify Razorpay payment signature after checkout and confirm the order
// @route   POST /api/v1/orders/verify-payment
// @access  Public
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = req.body;

  const isValid = verifyPaymentSignature({ razorpayOrderId, razorpayPaymentId, razorpaySignature });
  if (!isValid) throw ApiError.badRequest('Payment verification failed — signature mismatch');

  const order = await Order.findById(orderId);
  if (!order) throw ApiError.notFound('Order not found');

  order.paymentStatus = PAYMENT_STATUS.PAID;
  order.status = ORDER_STATUS.CONFIRMED;
  order.razorpayPaymentId = razorpayPaymentId;
  order.razorpaySignature = razorpaySignature;
  await order.save();

  sendOrderConfirmation(order).catch(() => {});
  notifyAdminNewOrder(order).catch(() => {});

  new ApiResponse(200, order, 'Payment verified, order confirmed').send(res);
});

// @desc    Get logged-in user's order history
// @route   GET /api/v1/orders/my
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  new ApiResponse(200, orders, 'Order history fetched').send(res);
});

// @desc    Track / view a single order (owner or admin)
// @route   GET /api/v1/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email phone');
  if (!order) throw ApiError.notFound('Order not found');

  const isOwner = order.user && order.user._id.equals(req.user._id);
  if (!isOwner && req.user.role === 'customer') throw ApiError.forbidden('Access denied');

  new ApiResponse(200, order).send(res);
});

// @desc    Generate (or fetch cached) PDF invoice for an order
// @route   GET /api/v1/orders/:id/invoice
// @access  Private
const getInvoice = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email phone');
  if (!order) throw ApiError.notFound('Order not found');

  const isOwner = order.user && order.user._id.equals(req.user._id);
  if (!isOwner && req.user.role === 'customer') throw ApiError.forbidden('Access denied');

  if (!order.invoiceUrl) {
    const { url } = await generateInvoice(order);
    order.invoiceUrl = url;
    await order.save();
  }

  new ApiResponse(200, { invoiceUrl: order.invoiceUrl }).send(res);
});

// ============ ADMIN ============

// @desc    Get all orders with filtering (status, orderType, date range) + pagination
// @route   GET /api/v1/orders?status=&orderType=&from=&to=&page=&limit=
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const { status, orderType, from, to, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (orderType) filter.orderType = orderType;
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [orders, total] = await Promise.all([
    Order.find(filter).populate('user', 'name email phone').sort('-createdAt').skip(skip).limit(Number(limit)),
    Order.countDocuments(filter),
  ]);

  new ApiResponse(200, orders, 'Orders fetched', {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  }).send(res);
});

// @desc    Update order status (confirm, prepare, out-for-delivery, delivered, cancel)
// @route   PATCH /api/v1/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status, note, paymentStatus, paymentMethod } = req.body;

  const order = await Order.findById(req.params.id).populate('user', 'name email phone');
  if (!order) throw ApiError.notFound('Order not found');

  if (status) order.status = status;
  if (paymentStatus) order.paymentStatus = paymentStatus;
  if (paymentMethod) order.paymentMethod = paymentMethod;

  if (note) order.statusHistory.push({ status: status || order.status, note });
  await order.save();

  sendOrderStatusUpdate(order).catch(() => {});

  new ApiResponse(200, order, 'Order status updated').send(res);
});

module.exports = {
  createOrder,
  verifyPayment,
  getMyOrders,
  getOrderById,
  getInvoice,
  getAllOrders,
  updateOrderStatus,
};
