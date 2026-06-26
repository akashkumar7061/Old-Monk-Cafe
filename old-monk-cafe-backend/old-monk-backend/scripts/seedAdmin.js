/**
 * Run once to create the first admin account:
 *   npm run seed:admin
 *
 * Reads ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_PHONE from .env
 * There is no public "register as admin" endpoint by design — admins must
 * be created via this script or promoted by an existing admin through
 * PATCH /api/v1/users/:id.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { ROLES } = require('../utils/constants');
const logger = require('../utils/logger');

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (existing) {
    logger.info(`Admin already exists: ${existing.email}`);
    return process.exit(0);
  }

  const admin = await User.create({
    name: process.env.ADMIN_NAME || 'Admin',
    email: process.env.ADMIN_EMAIL,
    phone: process.env.ADMIN_PHONE,
    password: process.env.ADMIN_PASSWORD,
    role: ROLES.ADMIN,
    isEmailVerified: true,
  });

  logger.info(`Admin account created successfully: ${admin.email}`);
  process.exit(0);
};

seedAdmin().catch((err) => {
  logger.error(`Seeding failed: ${err.message}`);
  process.exit(1);
});
