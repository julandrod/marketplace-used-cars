const { StatusCodes } = require("http-status-codes");
const { catchAsync, endPointResponse } = require("../../helpers");
const roleServices = require("./role.services");

const registerRole = catchAsync(async (req, res, next) => {
  const newRole = await roleServices.createRole(req.body);

  endPointResponse({
    res,
    code: StatusCodes.CREATED,
    message: "Rol creado de manera exitosa",
    body: newRole,
  });
});

const getAllRoles = catchAsync(async (req, res, next) => {
  const allRoles = await roleServices.findAllRoles();

  endPointResponse({
    res,
    message: "Roles listados de manera exitosa",
    body: allRoles,
  });
});

const getRoleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await roleServices.findRole(id);

  endPointResponse({
    res,
    message: "Rol encontrado de manera exitosa",
    body: role,
  });
});

const updateRoleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await roleServices.findRole(id);
  const roleUpdated = await roleServices.updateRole(role, req.body);

  endPointResponse({
    res,
    message: "Rol actualizado de manera exitosa",
    body: roleUpdated,
  });
});

const deleteRoleById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const role = await roleServices.findRole(id);
  const response = await roleServices.deleteRole(id, role);

  endPointResponse({
    res,
    message: response,
  });
});

module.exports = {
  registerRole,
  getAllRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
