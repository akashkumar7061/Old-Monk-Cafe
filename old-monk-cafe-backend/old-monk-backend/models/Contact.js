const mongoose = require('mongoose');
const { CONTACT_STATUS } = require('../utils/constants');

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },
    subject: { type: String, trim: true, default: 'General Inquiry' },
    message: { type: String, required: true, trim: true, maxlength: 1000 },
    status: { type: String, enum: Object.values(CONTACT_STATUS), default: CONTACT_STATUS.NEW },
    adminResponse: { type: String, trim: true },
    respondedAt: Date,
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

contactSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Contact', contactSchema);
