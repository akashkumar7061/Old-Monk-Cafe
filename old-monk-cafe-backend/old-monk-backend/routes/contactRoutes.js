const express = require('express');
const router = express.Router();

const {
  createContact,
  getAllContacts,
  respondToContact,
  updateContactStatus,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');
const validateRequest = require('../middleware/validateRequest');
const { createContactValidator } = require('../validators/contactValidator');
const { ROLES } = require('../utils/constants');

router.post('/', createContactValidator, validateRequest, createContact);

// ---- Admin ----
router.get('/', protect, authorize(ROLES.ADMIN, ROLES.STAFF), getAllContacts);
router.patch('/:id/respond', protect, authorize(ROLES.ADMIN, ROLES.STAFF), respondToContact);
router.patch('/:id/status', protect, authorize(ROLES.ADMIN, ROLES.STAFF), updateContactStatus);

module.exports = router;
