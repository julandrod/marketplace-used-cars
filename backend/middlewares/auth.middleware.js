const { StatusCodes } = require("http-status-codes");
const { catchAsync, ErrorObject, isTokenValid } = require("../helpers");

const authenticateUser = catchAsync(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ErrorObject("No hay un token presente", StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(" ")[1];
  try {
    const payloadDecoded = isTokenValid(token);
    req.user = { ...payloadDecoded };
    next();
  } catch (error) {
    throw new ErrorObject("El token no es valido", StatusCodes.UNAUTHORIZED);
  }
});

const authorizeByRole = (role) => {
  return catchAsync(async (req, res, next) => {
    if (req.user.roleId !== role) {
      throw new ErrorObject(
        "No esta autorizado para acceder a esta ruta".StatusCodes.UNAUTHORIZED
      );
    }
    next();
  });
};

module.exports = {authenticateUser, authorizeByRole}