const {
  ErrorObject,
  checkPermissions,
  createJwt,
  comparePassword,
  encryptPassword,
} = require("../../helpers");
const { User, Role } = require("../../database/models");
const { StatusCodes } = require("http-status-codes");

const findActiveUser = async (id) => {
  try {
    const userInfo = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        attributes: ["id", "name"],
      },
    });

    return userInfo;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const findAllUsers = async () => {
  try {
    const users = await User.findAndCountAll({
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        attributes: ["id", "name"],
      },
    });

    return users;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const findUser = async (id) => {
  try {
    const user = await User.findOne({
      where: { id },
      attributes: { exclude: ["password"] },
      include: {
        model: Role,
        attributes: ["id", "name"],
      },
    });

    if (!user) {
      throw new ErrorObject("No se encontro ningun usuario con ese Id", 404);
    }

    return user;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const updateUser = async (user, newInfo, reqUser) => {
  // TODO: add logic for update email and phone having in mind the model unique property
  try {
    const { firstName, lastName, profileImage } = newInfo;
    checkPermissions(reqUser, user.id);
    await user.update({
      firstName,
      lastName,
      profileImage,
      attributes: { exclude: ["password"] },
    });
    const token = createJwt({ payload: user.dataValues });

    return token;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const deleteUser = async (id, user, reqUser) => {
  try {
    checkPermissions(reqUser, user.dataValues.id);
    await user.destroy();

    return `Usuario ${id} eliminado de manera exitosa`;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const resetPasswordUser = async (reqUser, id, oldPassword, newPassword) => {
  try {
    checkPermissions(reqUser, id);

    const user = await User.findOne({ where: { id } });
    const passwordMatch = await comparePassword(oldPassword, user.password);
    if (!passwordMatch) {
      throw new ErrorObject("Password incorrecto", StatusCodes.UNAUTHORIZED);
    }

    user.password = await encryptPassword(newPassword);
    await user.save();

    return "Password actualizado de manera exitosa";
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

module.exports = {
  findActiveUser,
  findAllUsers,
  findUser,
  updateUser,
  deleteUser,
  resetPasswordUser
};
