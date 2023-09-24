export const errorHandler = (err, req, res, next) => {
  // If err.status exists, it's likely a 404 error sent from a "next" function
  if (err.status === 404) {
    return res.status(404).send('Page not found!');
  }

  // Log the error stack trace for debugging
  console.error(err.stack);

  // Check if response headers have already been sent
  if (res.headersSent) {
    // If headers are already sent, delegate to the default Express error handler
    return next(err);
  }

  // For all other errors, send a 500 Internal Server Error response
  res.status(500).send('Something broke!');
};
