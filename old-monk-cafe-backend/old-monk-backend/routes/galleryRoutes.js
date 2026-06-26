const express = require('express');
const router = express.Router();

const {
  getGalleryImages,
  uploadGalleryImages,
  updateGalleryImage,
  deleteGalleryImage,
} = require('../controllers/galleryController');
const { protect, authorize } = require('../middleware/auth');
const { uploadMultiple } = require('../middleware/upload');
const { ROLES } = require('../utils/constants');

router.get('/', getGalleryImages);
router.post('/', protect, authorize(ROLES.ADMIN, ROLES.STAFF), uploadMultiple('images', 10), uploadGalleryImages);
router.patch('/:id', protect, authorize(ROLES.ADMIN, ROLES.STAFF), updateGalleryImage);
router.delete('/:id', protect, authorize(ROLES.ADMIN), deleteGalleryImage);

module.exports = router;
