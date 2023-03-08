const ErrorObject = require("./error");
const { StatusCodes } = require("http-status-codes");

const checkPermissions = (reqUser, resourceUserId) => {
  if (reqUser.roleId === 1) return;
  if (reqUser.id === resourceUserId) return;

  throw new ErrorObject(
    "No esta autorizado para acceder a esta ruta",
    StatusCodes.UNAUTHORIZED
  );
};

module.exports = checkPermissions
