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
