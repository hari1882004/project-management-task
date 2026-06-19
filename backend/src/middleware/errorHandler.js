export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  if (err.status) {
    return res.status(err.status).json({
      success: false,
      message: err.message,
      ...(process.env.NODE_ENV === 'development' && { error: err.details })
    });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry error'
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
}
