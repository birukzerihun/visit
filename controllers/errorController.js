const sendErrorDev = (err, res) => {
  res.statusCode(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

const sendErrorProd = (err, res) => {
  res.statusCode(err.statusCode).json({
    status: err.status,
    message: err.message
  });
};
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV !== 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV !== 'production') {
    if (err.isOperational) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    } else {
      console.log(`ERROR 🔥`);
      res.status(err.statusCode).json({
        status: 'fail',
        message: 'Something went very wrong'
      });
    }
    sendErrorProd(err, res);
  }
};
