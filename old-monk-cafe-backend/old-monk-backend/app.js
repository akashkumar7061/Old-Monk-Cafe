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

// Trust proxy for rate limiting (Render is behind a load balancer/reverse proxy)
app.set('trust proxy', 1);

// ---- Security headers ----
app.use(helmet());

// ---- CORS: allow local development and Vercel subdomains dynamically ----
const allowedOrigins = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://old-monk-cafe-frontend.vercel.app',
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Allow curl and postman
      
      const isAllowed = allowedOrigins.includes(origin) ||
        origin.endsWith('.vercel.app') ||
        /^http:\/\/localhost:\d+$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:\d+$/.test(origin);
        
      if (isAllowed) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
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
