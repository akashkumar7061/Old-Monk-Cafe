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

const seedDatabaseDirectly = async (req, res) => {
  try {
    const Category = require('../models/Category');
    const MenuItem = require('../models/MenuItem');
    const { categoriesToSeed, menuItemsToSeed } = require('../seed_menu');
    
    // Clear existing
    await MenuItem.deleteMany({});
    await Category.deleteMany({});
    
    // Seed categories
    const seededCategories = await Category.insertMany(categoriesToSeed);
    
    // Create mapping of categorySlug -> categoryObjectId
    const categoryMap = {};
    seededCategories.forEach((cat) => {
      categoryMap[cat.slug] = cat._id;
    });
    
    // Prepare Menu Items with category object references
    const preparedMenuItems = menuItemsToSeed.map((item) => {
      const categoryId = categoryMap[item.categorySlug];
      if (!categoryId) {
        throw new Error("Category slug not found: " + item.categorySlug);
      }
      return {
        name: item.name,
        description: item.description,
        price: item.price,
        category: categoryId,
        image: { url: item.image, publicId: "" },
        isVeg: item.isVeg,
        isAvailable: true,
        isFeatured: false,
        prepTimeMinutes: 12
      };
    });
    
    const seededMenuItems = await MenuItem.insertMany(preparedMenuItems);
    res.json({
      success: true,
      message: `Database seeded successfully! Categories: ${seededCategories.length}, Items: ${seededMenuItems.length}`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

router.get('/seed-db', seedDatabaseDirectly);
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
