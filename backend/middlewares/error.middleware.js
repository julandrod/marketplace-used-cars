const errorHandler = (err, req, res, next) => {
  let customError = {
    code: err.statusCode || 500,
    message: err.message || err,
  };

  if (err.errors && err.errors.length > 0) {
    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.code = 400;
  }

  res.status(customError.code).json({ error: customError.message });
};

module.exports = errorHandler;
