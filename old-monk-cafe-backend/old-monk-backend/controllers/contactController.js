const asyncHandler = require('../middleware/asyncHandler');
const Contact = require('../models/Contact');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const { sendContactAcknowledgement, notifyAdmin } = require('../services/emailService');
const { CONTACT_STATUS } = require('../utils/constants');

// @desc    Submit a contact / inquiry form
// @route   POST /api/v1/contact
// @access  Public
const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);

  sendContactAcknowledgement(contact).catch(() => {});
  notifyAdmin('New Contact Inquiry', `${contact.name} (${contact.email}): ${contact.message}`).catch(
    () => {}
  );

  new ApiResponse(201, contact, 'Message sent! We will get back to you shortly.').send(res, 201);
});

// ============ ADMIN ============

// @desc    Get all inquiries (filter by status)
// @route   GET /api/v1/contact?status=&page=&limit=
// @access  Private/Admin
const getAllContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const skip = (Number(page) - 1) * Number(limit);
  const [contacts, total] = await Promise.all([
    Contact.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)),
    Contact.countDocuments(filter),
  ]);

  new ApiResponse(200, contacts, 'Inquiries fetched', { total }).send(res);
});

// @desc    Respond to an inquiry from the admin panel
// @route   PATCH /api/v1/contact/:id/respond
// @access  Private/Admin
const respondToContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) throw ApiError.notFound('Inquiry not found');

  contact.adminResponse = req.body.adminResponse;
  contact.status = CONTACT_STATUS.RESOLVED;
  contact.respondedAt = new Date();
  contact.respondedBy = req.user._id;
  await contact.save();

  new ApiResponse(200, contact, 'Response sent').send(res);
});

// @desc    Update inquiry status (e.g. mark in-progress)
// @route   PATCH /api/v1/contact/:id/status
// @access  Private/Admin
const updateContactStatus = asyncHandler(async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true, runValidators: true }
  );
  if (!contact) throw ApiError.notFound('Inquiry not found');

  new ApiResponse(200, contact, 'Status updated').send(res);
});

module.exports = { createContact, getAllContacts, respondToContact, updateContactStatus };
