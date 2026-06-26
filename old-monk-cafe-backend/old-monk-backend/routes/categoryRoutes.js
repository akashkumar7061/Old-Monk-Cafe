const express = require('express');
const router = express.Router();

const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSingle } = require('../middleware/upload');
const validateRequest = require('../middleware/validateRequest');
const { categoryValidator } = require('../validators/menuValidator');
const { ROLES } = require('../utils/constants');

router.get('/', getCategories);
router.post(
  '/',
  protect,
  authorize(ROLES.ADMIN, ROLES.STAFF),
  uploadSingle('image'),
  categoryValidator,
  validateRequest,
  createCategory
);
router.patch('/:id', protect, authorize(ROLES.ADMIN, ROLES.STAFF), uploadSingle('image'), updateCategory);
router.delete('/:id', protect, authorize(ROLES.ADMIN), deleteCategory);

module.exports = router;
