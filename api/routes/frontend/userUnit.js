const express = require("express");
const router = express.Router();

const userUnitController = require("../../controllers/frontend/userUnit");

router.post("/create", userUnitController.userUnitAdd);
router.get("/getAll", userUnitController.getAll);
router.get("/getuserUnitById/:id", userUnitController.getUserUnitById);

module.exports = router;
