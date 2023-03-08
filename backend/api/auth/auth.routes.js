const router = require("express").Router();

const { dataValidator } = require("../../middlewares");
const authControllers = require("./auth.controllers");
const authSchemas = require("./auth.schemas");

router.post(
  "/register",
  dataValidator(authSchemas.registerUser),
  authControllers.registerUser
);

router.post(
  "/login",
  dataValidator(authSchemas.login),
  authControllers.loginUser
);

module.exports = router;
