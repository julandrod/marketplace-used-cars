const updateUser = {
  firstName: {
    exists: { bail: true, errorMessage: "Debe ingresar un nombre" },
    trim: true,
    isLength: {
      errorMessage: "Nombre debe tener entre 3 y 10 caracteres",
      options: { min: 3, max: 10 },
    },
  },
  lastName: {
    exists: { bail: true, errorMessage: "Debe ingresar un apellido" },
    trim: true,
    isLength: {
      errorMessage: "Apellido debe tener entre 3 y 10 caracteres",
      options: { min: 3, max: 10 },
    },
  },
  profileImage: {
    optional: {
      nulleable: true,
    },
    isURL: {
      errorMessage: "URL no valida",
    },
  },
};

const resetPassword = {
  oldPassword: {
    exists: { bail: true, errorMessage: "Debe ingresar el password anterior" },
    trim: true,
    isLength: {
      errorMessage: "Password debe tener entre 4 y 15 caracteres",
      options: { min: 4, max: 15 },
    },
  },
  newPassword: {
    exists: { bail: true, errorMessage: "Debe ingresar un nuevo password" },
    trim: true,
    isLength: {
      errorMessage: "Password debe tener entre 4 y 15 caracteres",
      options: { min: 4, max: 15 },
    },
  },
};

module.exports = {updateUser, resetPassword}