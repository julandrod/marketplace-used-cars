const { StatusCodes } = require("http-status-codes");
const { catchAsync, endPointResponse } = require("../../helpers");
const authServices = require("./auth.services");

const registerUser = catchAsync(async (req, res, next) => {
  const response = await authServices.createUser(req.body);

  endPointResponse({
    res,
    code: StatusCodes.CREATED,
    message: response,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const tokenUser = await authServices.findAndLogin(email, password);

  endPointResponse({
    res,
    message: "Usuario logueado de manera exitosa",
    body: tokenUser,
  });
});

module.exports = { registerUser, loginUser };
