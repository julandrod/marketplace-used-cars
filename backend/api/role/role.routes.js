const router = require("express").Router();

const {
  authenticateUser,
  authorizeByRole,
  dataValidator,
} = require("../../middlewares");
const roleCtrls = require("./role.controllers");
const { role } = require("./role.schemas");

router
  .route("/")
  .post(
    [authenticateUser, authorizeByRole(1), dataValidator(role)],
    roleCtrls.registerRole
  )
  .get([authenticateUser, authorizeByRole(1)], roleCtrls.getAllRoles);

router
  .route("/:id")
  .get([authenticateUser, authorizeByRole(1)], roleCtrls.getRoleById)
  .put(
    [authenticateUser, authorizeByRole(1), dataValidator(role)],
    roleCtrls.updateRoleById
  )
  .delete([authenticateUser, authorizeByRole(1)], roleCtrls.deleteRoleById);

module.exports = router;
