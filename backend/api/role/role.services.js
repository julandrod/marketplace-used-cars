const { ErrorObject } = require("../../helpers");
const { Role } = require("../../database/models");
const { StatusCodes } = require("http-status-codes");

const createRole = async (roleInfo) => {
  try {
    const { name, description } = roleInfo;
    const [response, created] = await Role.findOrCreate({
      where: { name },
      defaults: {
        name,
        description,
      },
    });

    if (!created) {
      throw new ErrorObject("Este rol ya existe", StatusCodes.BAD_REQUEST);
    }

    return response;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const findAllRoles = async () => {
  try {
    const roles = await Role.findAndCountAll();

    return roles;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const findRole = async (id) => {
  try {
    const role = await Role.findOne({ where: { id } });
    if (!role) {
      throw new ErrorObject("No se encontro ningun rol con ese id", 404);
    }

    return role;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const updateRole = async (role, newInfo) => {
  try {
    const { name, description } = newInfo;
    return await role.update({ name, description });
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const deleteRole = async (id, role) => {
  try {
    await role.destroy();

    return `Rol ${id} eliminado de manera exitosa`;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createRole, findAllRoles, findRole, updateRole, deleteRole };
