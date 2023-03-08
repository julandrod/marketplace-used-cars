const router = require("express").Router();

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const roleRoutes = require("./api/role/role.routes");

const routerApi = (app) => {
  app.use(router);

  router.use("/api/v1/auth", authRoutes);
  router.use("/api/v1/user", userRoutes);
  router.use("/api/v1/role", roleRoutes);
};

module.exports = routerApi;
