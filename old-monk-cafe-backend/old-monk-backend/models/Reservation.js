const mongoose = require('mongoose');
const { RESERVATION_STATUS } = require('../utils/constants');

const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // null = guest booking
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, required: true },
    date: { type: Date, required: [true, 'Reservation date is required'] },
    timeSlot: { type: String, required: [true, 'Time slot is required'] }, // e.g. "19:30"
    guests: { type: Number, required: true, min: 1, max: 30 },
    occasion: { type: String, trim: true }, // birthday, anniversary, meetup, corporate, date
    specialRequest: { type: String, trim: true, maxlength: 500 },
    tableNumber: { type: String, default: null },
    status: {
      type: String,
      enum: Object.values(RESERVATION_STATUS),
      default: RESERVATION_STATUS.PENDING,
    },
    adminNote: { type: String, trim: true },
    confirmationSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

reservationSchema.index({ date: 1, timeSlot: 1 });
reservationSchema.index({ status: 1 });
reservationSchema.index({ email: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);
