const asyncHandler = require('../middleware/asyncHandler');
const Reservation = require('../models/Reservation');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { sendReservationConfirmation } = require('../services/emailService');
const { notifyAdminNewReservation } = require('../services/whatsappService');
const { RESERVATION_STATUS } = require('../utils/constants');

// Simple capacity rule: cafe accepts up to MAX_PER_SLOT reservations per time slot.
// Tune this per actual seating capacity, or replace with a table-map model later.
const MAX_PER_SLOT = 8;

// @desc    Check table availability for a given date & time slot
// @route   GET /api/v1/reservations/availability?date=&timeSlot=
// @access  Public
const checkAvailability = asyncHandler(async (req, res) => {
  const { date, timeSlot } = req.query;
  if (!date || !timeSlot) throw ApiError.badRequest('date and timeSlot query params are required');

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const count = await Reservation.countDocuments({
    date: { $gte: dayStart, $lt: dayEnd },
    timeSlot,
    status: { $in: [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED] },
  });

  const available = count < MAX_PER_SLOT;
  new ApiResponse(200, { available, slotsRemaining: Math.max(MAX_PER_SLOT - count, 0) }).send(res);
});

// @desc    Create a table reservation (guest or logged-in user)
// @route   POST /api/v1/reservations
// @access  Public
const createReservation = asyncHandler(async (req, res) => {
  const { name, email, phone, date, timeSlot, guests, occasion, specialRequest } = req.body;

  const dayStart = new Date(date);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(dayStart);
  dayEnd.setDate(dayEnd.getDate() + 1);

  const existingCount = await Reservation.countDocuments({
    date: { $gte: dayStart, $lt: dayEnd },
    timeSlot,
    status: { $in: [RESERVATION_STATUS.PENDING, RESERVATION_STATUS.CONFIRMED] },
  });
  if (existingCount >= MAX_PER_SLOT) {
    throw ApiError.conflict('This time slot is fully booked. Please choose another time.');
  }

  const reservation = await Reservation.create({
    user: req.user?._id || null,
    name,
    email,
    phone,
    date,
    timeSlot,
    guests,
    occasion,
    specialRequest,
  });

  sendReservationConfirmation(reservation).catch(() => {});
  notifyAdminNewReservation(reservation).catch(() => {});

  new ApiResponse(201, reservation, 'Reservation request submitted successfully').send(res, 201);
});

// @desc    Get logged-in user's own reservation history
// @route   GET /api/v1/reservations/my
// @access  Private
const getMyReservations = asyncHandler(async (req, res) => {
  const reservations = await Reservation.find({ user: req.user._id }).sort('-date');
  new ApiResponse(200, reservations, 'Your reservations fetched').send(res);
});

// @desc    Get a single reservation (owner or admin)
// @route   GET /api/v1/reservations/:id
// @access  Private
const getReservationById = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) throw ApiError.notFound('Reservation not found');

  const isOwner = reservation.user && reservation.user.equals(req.user._id);
  if (!isOwner && req.user.role === 'customer') throw ApiError.forbidden('Access denied');

  new ApiResponse(200, reservation).send(res);
});

// @desc    Cancel own pending reservation
// @route   PATCH /api/v1/reservations/:id/cancel
// @access  Private
const cancelMyReservation = asyncHandler(async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) throw ApiError.notFound('Reservation not found');
  if (!reservation.user?.equals(req.user._id)) throw ApiError.forbidden('Access denied');

  reservation.status = RESERVATION_STATUS.CANCELLED;
  await reservation.save();

  new ApiResponse(200, reservation, 'Reservation cancelled').send(res);
});

// ============ ADMIN ============

// @desc    Get all reservations (filter by status/date)
// @route   GET /api/v1/reservations?status=&date=&page=&limit=
// @access  Private/Admin
const getAllReservations = asyncHandler(async (req, res) => {
  const { status, date, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (date) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    filter.date = { $gte: dayStart, $lt: dayEnd };
  }

  const skip = (Number(page) - 1) * Number(limit);
  const [reservations, total] = await Promise.all([
    Reservation.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
    Reservation.countDocuments(filter),
  ]);

  new ApiResponse(200, reservations, 'Reservations fetched', {
    total,
    page: Number(page),
    pages: Math.ceil(total / limit),
  }).send(res);
});

// @desc    Approve / reject / update reservation status, optionally assign a table
// @route   PATCH /api/v1/reservations/:id/status
// @access  Private/Admin
const updateReservationStatus = asyncHandler(async (req, res) => {
  const { status, adminNote, tableNumber } = req.body;

  const reservation = await Reservation.findById(req.params.id);
  if (!reservation) throw ApiError.notFound('Reservation not found');

  reservation.status = status;
  if (adminNote !== undefined) reservation.adminNote = adminNote;
  if (tableNumber !== undefined) reservation.tableNumber = tableNumber;
  await reservation.save();

  if ([RESERVATION_STATUS.CONFIRMED, RESERVATION_STATUS.REJECTED].includes(status)) {
    sendReservationConfirmation(reservation).catch(() => {});
  }

  new ApiResponse(200, reservation, 'Reservation status updated').send(res);
});

module.exports = {
  checkAvailability,
  createReservation,
  getMyReservations,
  getReservationById,
  cancelMyReservation,
  getAllReservations,
  updateReservationStatus,
};
