const { HttpException } = require('../shared/httpException');

const exceptionHandler = (error, req, res, _next) => {
  console.error(error);

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
