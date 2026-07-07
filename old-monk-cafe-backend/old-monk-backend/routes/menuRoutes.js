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
    
    // Delete the four unwanted categories and their items
    const unwantedSlugs = ["coffee", "mocktails", "chinese", "combos", "coffee-beverages", "signature-mocktails", "chinese-mains", "value-combos"];
    const unwantedNames = ["Coffee & Beverages", "Signature Mocktails", "Chinese Mains", "Value Combos"];
    const unwantedCats = await Category.find({
      $or: [
        { slug: { $in: unwantedSlugs } },
        { name: { $in: unwantedNames } }
      ]
    });
    const unwantedIds = unwantedCats.map(cat => cat._id);
    if (unwantedIds.length > 0) {
      await MenuItem.deleteMany({ category: { $in: unwantedIds } });
      await Category.deleteMany({ _id: { $in: unwantedIds } });
    }

    // 1. Fetch existing categories and sync slugs
    const existingCats = await Category.find({});
    const categoryMap = {};
    existingCats.forEach(cat => {
      categoryMap[cat.name.toLowerCase().trim()] = cat;
    });
    
    const categorySlugMap = {};
    
    for (const cat of categoriesToSeed) {
      const existingCat = categoryMap[cat.name.toLowerCase().trim()];
      if (!existingCat) {
        // Create Category dynamically with explicit slug preserved
        const newCat = await Category.create(cat);
        categorySlugMap[cat.slug] = newCat._id;
      } else {
        // Correct slug in database if it was overwritten to something else
        if (existingCat.slug !== cat.slug) {
          existingCat.slug = cat.slug;
          await existingCat.save();
        }
        categorySlugMap[cat.slug] = existingCat._id;
      }
    }
    
    // 2. Fetch existing menu items
    const existingItems = await MenuItem.find({});
    const existingNamesSet = new Set(existingItems.map(item => item.name.toLowerCase().trim()));
    
    const itemsToInsert = [];
    menuItemsToSeed.forEach(item => {
      if (!existingNamesSet.has(item.name.toLowerCase().trim())) {
        const categoryId = categorySlugMap[item.categorySlug];
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
