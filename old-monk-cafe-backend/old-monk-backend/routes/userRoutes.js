const express = require('express');
const router = express.Router();

const {
  updateMe,
  updateAvatar,
  getAllUsers,
  getUserById,
  updateUserByAdmin,
  deleteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const { ROLES } = require('../utils/constants');

// ---- Logged-in user's own profile ----
router.patch('/me', protect, updateMe);
router.patch('/me/avatar', protect, uploadSingle('avatar'), updateAvatar);

// ---- Admin-only user management ----
router.get('/', protect, authorize(ROLES.ADMIN), getAllUsers);
router.get('/:id', protect, authorize(ROLES.ADMIN), getUserById);
router.patch('/:id', protect, authorize(ROLES.ADMIN), updateUserByAdmin);
router.delete('/:id', protect, authorize(ROLES.ADMIN), deleteUser);

module.exports = router;
