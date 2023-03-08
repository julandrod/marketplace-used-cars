const registerUser = {
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
  email: {
    exists: { bail: true, errorMessage: "Debe ingresar un email" },
    trim: true,
    isEmail: {
      errorMessage: "Debe ingresar un email valido",
    },
  },
  phone: {
    exists: { bail: true, errorMessage: "Debe ingresar un telefono" },
    trim: true,
    isLength: {
      errorMessage: "Debe ingresar un telefono valido",
      options: { min: 10, max: 20 },
    },
  },
  password: {
    exists: { bail: true, errorMessage: "Debe ingresar un password" },
    trim: true,
    isLength: {
      errorMessage: "Password debe tener entre 4 y 15 caracteres",
      options: { min: 4, max: 15 },
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

const login = {
  email: {
    exists: { bail: true, errorMessage: "Debe ingresar un email" },
    trim: true,
    isEmail: {
      errorMessage: "Debe ingresar un email valido",
    },
  },
  password: {
    exists: { bail: true, errorMessage: "Debe ingresar un password" },
    trim: true,
    isLength: {
      errorMessage: "Password debe tener entre 4 y 15 caracteres",
      options: { min: 4, max: 15 },
    },
  },
};

module.exports = { registerUser, login };
