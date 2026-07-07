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

const syncDatabaseDirectly = async (req, res) => {
  try {
    const Category = require('../models/Category');
    const MenuItem = require('../models/MenuItem');
    const { categoriesToSeed, menuItemsToSeed } = require('../seed_menu');
    
    // 1. Fetch existing categories
    const existingCats = await Category.find({});
    const categoryMap = {};
    existingCats.forEach(cat => {
      categoryMap[cat.slug] = cat._id;
    });
    
    const categoriesToInsert = [];
    categoriesToSeed.forEach(cat => {
      if (!categoryMap[cat.slug]) {
        categoriesToInsert.push(cat);
      }
    });
    
    if (categoriesToInsert.length > 0) {
      const seededCategories = await Category.insertMany(categoriesToInsert);
      seededCategories.forEach(cat => {
        categoryMap[cat.slug] = cat._id;
      });
    }
    
    // 2. Fetch existing menu items
    const existingItems = await MenuItem.find({});
    const existingNamesSet = new Set(existingItems.map(item => item.name.toLowerCase().trim()));
    
    const itemsToInsert = [];
    menuItemsToSeed.forEach(item => {
      if (!existingNamesSet.has(item.name.toLowerCase().trim())) {
        const categoryId = categoryMap[item.categorySlug];
        if (categoryId) {
          itemsToInsert.push({
            name: item.name,
            description: item.description,
            price: item.price,
            category: categoryId,
            image: { url: item.image, publicId: "" },
            isVeg: item.isVeg,
            isAvailable: true,
            isFeatured: false,
            prepTimeMinutes: 12
          });
        }
      }
    });
    
    let seededCount = 0;
    if (itemsToInsert.length > 0) {
      const seeded = await MenuItem.insertMany(itemsToInsert);
      seededCount = seeded.length;
    }
    
    res.json({
      success: true,
      message: `Database synced successfully! Added ${categoriesToInsert.length} categories and ${seededCount} items.`
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

router.get('/sync-db', syncDatabaseDirectly);
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
