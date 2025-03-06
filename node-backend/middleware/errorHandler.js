function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err.name === 'SequelizeValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        details: err.errors.map(e => e.message)
      });
    }
  
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
  
    res.status(500).json({
      error: process.env.NODE_ENV === 'production' 
        ? 'Internal Server Error' 
        : err.message
    });
  }
  
  module.exports = errorHandler;