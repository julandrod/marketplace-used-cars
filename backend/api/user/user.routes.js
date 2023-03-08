const { authenticateUser, dataValidator } = require("../../middlewares");
const userCtrls = require("./user.controllers");
const userSchemas = require("./user.schemas");

const router = require("express").Router();

router.get("/showMe", authenticateUser, userCtrls.getActiveUser);

router.get("/", authenticateUser, userCtrls.getAllUsers);

router
  .route("/:id")
  .get(authenticateUser, userCtrls.getUserById)
  .put(
    [authenticateUser, dataValidator(userSchemas.updateUser)],
    userCtrls.updateUserById
  )
  .delete(authenticateUser, userCtrls.deleteUserById);

router.patch(
  "/resetPassword/:id",
  [authenticateUser, dataValidator(userSchemas.resetPassword)],
  userCtrls.changePasswordUser
);

module.exports = router;
