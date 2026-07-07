require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

// Catch programmer errors that escape async handlers (synchronous throws, etc.)
process.on('uncaughtException', (err) => {
  logger.error(`UNCAUGHT EXCEPTION: ${err.message}`, { stack: err.stack });
  process.exit(1);
});

const startServer = async () => {
  await connectDB();

  // Auto-sync seed data on startup (non-destructive)
  try {
    const MenuItem = require('./models/MenuItem');
    const Category = require('./models/Category');
    const { categoriesToSeed, menuItemsToSeed } = require('./seed_menu');
    
    // Delete the four unwanted categories and their items
    const unwantedSlugs = ["coffee", "mocktails", "chinese", "combos"];
    const unwantedCats = await Category.find({ slug: { $in: unwantedSlugs } });
    const unwantedIds = unwantedCats.map(cat => cat._id);
    if (unwantedIds.length > 0) {
      await MenuItem.deleteMany({ category: { $in: unwantedIds } });
      await Category.deleteMany({ _id: { $in: unwantedIds } });
    }

    // 1. Sync Categories
    const existingCats = await Category.find({});
    const categoryMap = {};
    existingCats.forEach(cat => {
      categoryMap[cat.name.toLowerCase().trim()] = cat;
    });
    
    const categorySlugMap = {};
    existingCats.forEach(cat => {
      categorySlugMap[cat.slug] = cat._id;
    });
    
    const categoriesToInsert = [];
    categoriesToSeed.forEach(cat => {
      const existingCat = categoryMap[cat.name.toLowerCase().trim()];
      if (!existingCat) {
        categoriesToInsert.push(cat);
      } else {
        categorySlugMap[cat.slug] = existingCat._id;
      }
    });
    
    if (categoriesToInsert.length > 0) {
      logger.info(`Inserting ${categoriesToInsert.length} missing categories...`);
      const seededCategories = await Category.insertMany(categoriesToInsert);
      seededCategories.forEach(cat => {
        const originalSeedCat = categoriesToSeed.find(c => c.name.toLowerCase().trim() === cat.name.toLowerCase().trim());
        if (originalSeedCat) {
          categorySlugMap[originalSeedCat.slug] = cat._id;
        }
      });
    }
    
    // 2. Sync Menu Items
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
    
    if (itemsToInsert.length > 0) {
      logger.info(`Auto-seeding ${itemsToInsert.length} missing items on startup...`);
      await MenuItem.insertMany(itemsToInsert);
      logger.info("Database auto-seeded successfully on startup.");
    }
  } catch (seedErr) {
    logger.error("Database startup auto-seed failed: " + seedErr.message);
  }

  const server = app.listen(PORT, () => {
    logger.info(`OLD MONK CAFE API running on port ${PORT} [${process.env.NODE_ENV}]`);
  });

  // Catch unhandled promise rejections (e.g. a missed .catch on a DB call)
  process.on('unhandledRejection', (err) => {
    logger.error(`UNHANDLED REJECTION: ${err.message}`, { stack: err.stack });
    server.close(() => process.exit(1));
  });

  // Graceful shutdown on container stop / deploy restart
  ['SIGTERM', 'SIGINT'].forEach((signal) => {
    process.on(signal, () => {
      logger.info(`${signal} received, shutting down gracefully`);
      server.close(() => {
        logger.info('Process terminated');
        process.exit(0);
      });
    });
  });
};

startServer();
