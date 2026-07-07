require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const logger = require('../utils/logger');

const updateAdminEmail = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Update existing admin email
  const result = await User.updateOne(
    { email: "admin@oldmonkcafe.com" },
    { $set: { email: "Swastikpurefoods25@gmail.com" } }
  );

  if (result.matchedCount > 0) {
    logger.info(`Successfully updated admin email in database to Swastikpurefoods25@gmail.com`);
  } else {
    logger.info(`No admin found with email admin@oldmonkcafe.com. Checking if Swastikpurefoods25@gmail.com already exists...`);
    const exists = await User.findOne({ email: "Swastikpurefoods25@gmail.com" });
    if (exists) {
      logger.info(`Admin Swastikpurefoods25@gmail.com already exists in the database.`);
    } else {
      logger.info(`Creating a new admin account since it doesn't exist...`);
      const { ROLES } = require('../utils/constants');
      await User.create({
        name: process.env.ADMIN_NAME || 'Admin',
        email: 'Swastikpurefoods25@gmail.com',
        phone: process.env.ADMIN_PHONE,
        password: process.env.ADMIN_PASSWORD,
        role: ROLES.ADMIN,
        isEmailVerified: true,
      });
      logger.info(`Admin account Swastikpurefoods25@gmail.com created successfully.`);
    }
  }
  process.exit(0);
};

updateAdminEmail().catch((err) => {
  logger.error(`Database update failed: ${err.message}`);
  process.exit(1);
});
