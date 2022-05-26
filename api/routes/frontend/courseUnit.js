const express = require("express");
const router = express.Router();

const courseUnitController = require("../../controllers/frontend/courseUnit");

router.get("/getAll", courseUnitController.getAllCourseUnit);
router.get("/getUnitById/:id", courseUnitController.getUnitById);
router.get("/getContentByUnitId/:id", courseUnitController.getContentByUnitId);

module.exports = router;
