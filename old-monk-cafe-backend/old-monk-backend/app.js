const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const xssClean = require('xss-clean');

const apiRoutes = require('./routes/index');
const { errorHandler, notFound } = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');
const logger = require('./utils/logger');

const app = express();

// ---- Security headers ----
app.use(helmet());

// ---- CORS: only allow the configured frontend origin, with credentials for cookies ----
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// ---- Body & cookie parsing ----
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ---- Sanitization against NoSQL injection, XSS, and parameter pollution ----
app.use(mongoSanitize());
app.use(xssClean());
app.use(hpp());

// ---- Performance ----
app.use(compression());

// ---- Logging ----
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined', { stream: { write: (msg) => logger.info(msg.trim()) } }));
}

// ---- Global rate limiting ----
app.use('/api', apiLimiter);

// ---- API routes ----
app.use('/api/v1', apiRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'OLD MONK CAFE API is running 🍵' });
});

// ---- 404 + error handling (must be last) ----
app.use(notFound);
app.use(errorHandler);

module.exports = app;
