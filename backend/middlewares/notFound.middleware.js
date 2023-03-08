const { StatusCodes } = require("http-status-codes");
const { ErrorObject } = require("../helpers");

const notFound = (req, res, next) => {
  throw new ErrorObject("No se encontro la ruta", StatusCodes.NOT_FOUND);
};

module.exports = notFound;
