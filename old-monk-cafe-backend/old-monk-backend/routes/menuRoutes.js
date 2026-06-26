const express = require('express');
const router = express.Router();

const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleFeatured,
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const validateRequest = require('../middleware/validateRequest');
const { menuItemValidator } = require('../validators/menuValidator');
const { ROLES } = require('../utils/constants');

router.get('/', getMenuItems);
router.get('/:idOrSlug', getMenuItemById);

router.post(
  '/',
  protect,
  authorize(ROLES.ADMIN, ROLES.STAFF),
  uploadSingle('image'),
  menuItemValidator,
  validateRequest,
  createMenuItem
);
router.patch('/:id', protect, authorize(ROLES.ADMIN, ROLES.STAFF), uploadSingle('image'), updateMenuItem);
router.patch('/:id/toggle-featured', protect, authorize(ROLES.ADMIN, ROLES.STAFF), toggleFeatured);
router.delete('/:id', protect, authorize(ROLES.ADMIN), deleteMenuItem);

module.exports = router;
