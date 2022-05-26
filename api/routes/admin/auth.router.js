const express = require("express");
const router = express.Router();
const { check, query } = require("express-validator");
const validator = require("./../../utilities/validator");
const authController = require("../../controllers/admin/auth.contoller");
const { authMiddleware } = require("../../middlewares/frontend/authMiddleware");

router.post(
  "/login",
  [
    check("email").not().isEmpty().withMessage("Email field is required"),
    check("password").not().isEmpty().withMessage("password field is required"),
  ],
  validator,

  authController.signin
);
router.post(
  "/signup",
  [
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("first_name field is required"),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("last_name field is required"),
    check("email").not().isEmpty().withMessage("email field is required"),
    check("phone").not().isEmpty().withMessage("phone field is required"),
  ],
  validator,
  authController.signup
);
router.post("/forgot", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);
router.post("/changePassword", authMiddleware, authController.changePassword);

module.exports = router;
