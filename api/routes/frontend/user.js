// const express = require("express");
// // controllers
// const userController = require("../../controllers/frontend/user");
// const validator = require("./../../utilities/validator");
// const { check, query } = require("express-validator");

// const router = express.Router();

// router.put(
//   "/profileUpdate/:id",
//   [
//     check("firstName")
//       .not()
//       .isEmpty()
//       .withMessage("first_name field is required"),
//     check("lastName")
//       .not()
//       .isEmpty()
//       .withMessage("last_name field is required"),
//     check("email").not().isEmpty().withMessage("email field is required"),
//     check("phone").not().isEmpty().withMessage("phone field is required"),
//   ],
//   validator,
//   userController.editprofile
// );
// router.get("/getUserById/:id", userController.getUserById);

// module.exports = router;
