const express = require('express');
const router = express.Router();

router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
router.use('/categories', require('./categoryRoutes'));
router.use('/menu', require('./menuRoutes'));
router.use('/reservations', require('./reservationRoutes'));
router.use('/orders', require('./orderRoutes'));
router.use('/reviews', require('./reviewRoutes'));
router.use('/gallery', require('./galleryRoutes'));
router.use('/contact', require('./contactRoutes'));
router.use('/analytics', require('./analyticsRoutes'));

router.get('/health', (req, res) => res.json({ success: true, message: 'API is healthy' }));

module.exports = router;
