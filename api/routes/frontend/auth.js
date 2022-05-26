const express = require("express");
// controllers
const authController = require("../../controllers/frontend/auth");
const { authMiddleware } = require("../../middlewares/frontend/authMiddleware");
const validator = require("./../../utilities/validator");
const { check, query } = require("express-validator");

const router = express.Router();

router
  .post(
    "/register",
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
  )
  .post("/login", authController.signin);

router.post("/forget", authController.forgotPassword);
router.post("/resetPassword", authController.resetPassword);
router.post("/changePassword", authMiddleware, authController.changePassword);

module.exports = router;
