export function notFound(req, res) {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    errors: [],
  });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  const status =
    err.status || (err.name === 'ValidationError' ? 400 : err.name === 'CastError' ? 400 : 500);
  res.status(status).json({
    success: false,
    message: status === 500 ? 'Internal server error' : err.message,
    errors: err.errors ? Object.values(err.errors).map((e) => e.message) : [],
  });
}