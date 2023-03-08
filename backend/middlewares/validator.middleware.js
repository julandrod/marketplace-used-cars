const { checkSchema, validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const dataValidator = (schema) => {
  const validations = checkSchema(schema);

  return async (req, res, next) => {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);

    if (errors.isEmpty()) return next();

    return res.status(StatusCodes.BAD_REQUEST).json({ erros: errors.array() });
  };
};

module.exports = dataValidator