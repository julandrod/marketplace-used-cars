const { catchAsync, endPointResponse } = require("../../helpers");
const userServices = require("./user.services");

const getActiveUser = catchAsync(async (req, res, next) => {
  const user = await userServices.findActiveUser(req.user.id);

  endPointResponse({
    res,
    message: "Informacion del usuario activo",
    body: user,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const allUsers = await userServices.findAllUsers();

  endPointResponse({
    res,
    message: "Usuarios listados de manera exitosa",
    body: allUsers,
  });
});

const getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.findUser(id);

  endPointResponse({
    res,
    message: "Usuario encontrado de manera exitosa",
    body: user,
  });
});

const updateUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.findUser(id);
  const userUpdated = await userServices.updateUser(user, req.body, req.user);

  endPointResponse({
    res,
    message: "Usuario actualizado de manera exitosa",
    body: userUpdated,
  });
});

const deleteUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await userServices.findUser(id);
  const response = await userServices.deleteUser(id, user, req.user);

  endPointResponse({
    res,
    message: response,
  });
});

const changePasswordUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const response = await userServices.resetPasswordUser(
    req.user,
    id,
    oldPassword,
    newPassword
  );

  endPointResponse({
    res,
    message: response,
  });
});

module.exports = {
  getActiveUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  changePasswordUser
};
