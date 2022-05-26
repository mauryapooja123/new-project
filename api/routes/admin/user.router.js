const express = require("express");
// controllers
const userController = require("../../controllers/admin/user.controller");
const validator = require("./../../utilities/validator");
const { check, query } = require("express-validator");

const router = express.Router();

router.put(
  "/profileUpdate/:id",
  [
    check("firstName")
      .not()
      .isEmpty()
      .withMessage("first_name field is required"),
    check("lastName")
      .not()
      .isEmpty()
      .withMessage("last_name field is required"),
  ],
  validator,
  userController.editprofile
);
router.get("/getUser/:id", userController.getUser);

module.exports = router;
