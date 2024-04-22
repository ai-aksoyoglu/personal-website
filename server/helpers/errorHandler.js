export const errorHandler = (err, req, res, next) => {
  // Enhanced logging
  console.error(`Error occurred on route ${req.originalUrl}: ${err.message}`);
  console.error(err.stack);

  // Handle 404 errors
  if (err.status === 404 || err.message.includes('Failed to lookup view')) {
    return res.status(404).send('Sorry, we couldn’t find that page.');
  }

  // Handle 500 internal errors with more generic messaging
  else if (!res.headersSent) {
    return res
      .status(500)
      .send('Internal Server Error. We are looking into it.');
  } else {
    // If headers are already sent, delegate to the default Express error handler
    next(err);
  }
};
