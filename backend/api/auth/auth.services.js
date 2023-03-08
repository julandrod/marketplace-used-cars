const {
  ErrorObject,
  encryptPassword,
  comparePassword,
  createJwt,
} = require("../../helpers");
const { User } = require("../../database/models");
const { StatusCodes } = require("http-status-codes");

const createUser = async (infoUser) => {
  try {
    const { firstName, lastName, email, phone, password, profileImage } =
      infoUser;
    const hashPassword = await encryptPassword(password);

    const [_, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        phone,
        password: hashPassword,
        profileImage,
        roleId: 2,
      },
    });

    if (!created) {
      throw new ErrorObject(
        "Este email ya esta registrado",
        StatusCodes.BAD_REQUEST
      );
    }

    return "Usuario registrado de manera exitosa";
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

const findAndLogin = async (email, password) => {
  try {
    const userFound = await User.findOne({ where: { email } });
    if (!userFound) {
      throw new ErrorObject(
        "No se encontro ningun usuario con este email",
        StatusCodes.NOT_FOUND
      );
    }

    const passwordMatch = await comparePassword(password, userFound.password);
    if (!passwordMatch) {
      throw new ErrorObject(
        "Datos de acceso invalidos",
        StatusCodes.UNAUTHORIZED
      );
    }

    const { password: pass, ...userInfo } = userFound.dataValues;
    const token = createJwt({ payload: userInfo });

    return token;
  } catch (error) {
    throw new ErrorObject(error.message, error.statusCode, error.errors);
  }
};

module.exports = { createUser, findAndLogin };
