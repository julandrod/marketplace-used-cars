const { authenticateUser, authorizeByRole } = require("./auth.middleware");
const errorHandler = require("./error.middleware");
const notFound = require("./notFound.middleware");
const dataValidator = require("./validator.middleware");

module.exports = {
  authenticateUser,
  authorizeByRole,
  errorHandler,
  notFound,
  dataValidator,
};
