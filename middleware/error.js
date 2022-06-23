const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  // Log to console for dev
  console.log(err);
  error.message = err.message;

  // Mongoose bad ObjectID
  if (err.name === 'CastError') {
    const message = `Error: Bootcamp of id ${error.value} not found.`;
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key error

  if (err.code === 11000) {
    const message = 'Error: Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((mess) => mess.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
  });
};

module.exports = errorHandler;
