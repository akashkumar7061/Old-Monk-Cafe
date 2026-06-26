const mongoose = require('mongoose');
const { ORDER_STATUS, ORDER_TYPE, PAYMENT_STATUS, PAYMENT_METHOD } = require('../utils/constants');

const orderItemSchema = new mongoose.Schema(
  {
    menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    name: { type: String, required: true }, // snapshot at order time, survives menu edits
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    guestDetails: {
      name: String,
      email: String,
      phone: String,
    },
    items: { type: [orderItemSchema], validate: (v) => v.length > 0 },
    itemsTotal: { type: Number, required: true },
    taxAmount: { type: Number, default: 0 },
    deliveryFee: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    orderType: { type: String, enum: Object.values(ORDER_TYPE), required: true },
    deliveryAddress: {
      line1: String,
      line2: String,
      city: String,
      pincode: String,
    },
    tableNumber: String, // for dine-in
    status: { type: String, enum: Object.values(ORDER_STATUS), default: ORDER_STATUS.PENDING },
    paymentMethod: { type: String, enum: Object.values(PAYMENT_METHOD), required: true },
    paymentStatus: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    invoiceUrl: String,
    statusHistory: [
      {
        status: String,
        changedAt: { type: Date, default: Date.now },
        note: String,
      },
    ],
  },
  { timestamps: true }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

// Human-friendly order number: OMC-241024-XXXXX
orderSchema.pre('save', function (next) {
  if (this.isNew && !this.orderNumber) {
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, '');
    const randomPart = Math.floor(10000 + Math.random() * 90000);
    this.orderNumber = `OMC-${datePart}-${randomPart}`;
  }
  if (this.isModified('status')) {
    this.statusHistory.push({ status: this.status });
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
