const express = require("express");
const router = express.Router();

const courseModuleController = require("../../controllers/frontend/courseModule");

router.get("/getAll", courseModuleController.getAll);
router.get("/getModuleById/:id", courseModuleController.getModuleById);
router.get(
  "/getModuleByModuleId/:id",
  courseModuleController.getModuleByModuleId
);

module.exports = router;
