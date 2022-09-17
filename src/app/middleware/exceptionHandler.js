const { HttpException } = require('../shared/httpException');

const exceptionHandler = (error, req, res, _next) => {
  if (error instanceof HttpException) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
};
module.exports = { exceptionHandler };
