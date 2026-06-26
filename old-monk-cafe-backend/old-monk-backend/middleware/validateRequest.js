const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');

/**
 * Runs after express-validator chains. Collects all field errors into
 * a single ApiError(400) instead of letting each route handle it manually.
 */
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();

  const formatted = errors.array().map((e) => `${e.path}: ${e.msg}`);
  throw ApiError.badRequest('Validation failed', formatted);
};

module.exports = validateRequest;
