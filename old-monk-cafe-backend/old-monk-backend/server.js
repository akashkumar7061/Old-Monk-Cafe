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

  // Auto-sync seed data on startup if count is different
  try {
    const MenuItem = require('./models/MenuItem');
    const Category = require('./models/Category');
    const { categoriesToSeed, menuItemsToSeed } = require('./seed_menu');
    const dbItemsCount = await MenuItem.countDocuments();
    if (dbItemsCount !== menuItemsToSeed.length) {
      logger.info(`Database count (${dbItemsCount}) differs from seed count (${menuItemsToSeed.length}). Re-seeding database...`);
      await MenuItem.deleteMany({});
      await Category.deleteMany({});
      const seededCategories = await Category.insertMany(categoriesToSeed);
      const categoryMap = {};
      seededCategories.forEach((cat) => {
        categoryMap[cat.slug] = cat._id;
      });
      const preparedMenuItems = menuItemsToSeed.map((item) => {
        return {
          name: item.name,
          description: item.description,
          price: item.price,
          category: categoryMap[item.categorySlug],
          image: { url: item.image, publicId: "" },
          isVeg: item.isVeg,
          isAvailable: true,
          isFeatured: false,
          prepTimeMinutes: 12
        };
      });
      await MenuItem.insertMany(preparedMenuItems);
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
