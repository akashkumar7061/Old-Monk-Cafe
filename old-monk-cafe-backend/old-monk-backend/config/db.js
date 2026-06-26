const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Establish MongoDB connection using Mongoose.
 * Reuses existing connections in serverless environments.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 10000,
    });

    logger.info(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      logger.error(`MongoDB connection error: ${err.message}`);
    });
  } catch (error) {
    logger.error(`MongoDB initial connection failed: ${error.message}`);
    if (process.env.VERCEL) {
      throw error; // Throw error in serverless environment
    } else {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
