const express = require("express");
const router = express.Router();
// const { check, query } = require("express-validator");
// const validator = require("./../../utilities/validator");

const courseUnitController = require("../../controllers/admin/courseUnit.controller");

router.post(
  "/create",

  courseUnitController.createCourseUnit
);

router.get("/getAll", courseUnitController.getAllCourseUnit);

router.get("/getById/:id", courseUnitController.getCourseUnitById);

router.get("/get/:pageNo/:limit", courseUnitController.getCourseUnit);

router.delete("/delete/:id", courseUnitController.courseUnitDelete);

router.put("/edit/:id", courseUnitController.courseUnitEdit);

router.get("/swap/:fromId/:toId", courseUnitController.swapCourseUnit);

router.get(
  "/search/:pageNo/:limit/:text",
  courseUnitController.courseUnitSearch
);
router.get(
  "/getCourseTitleByModuleId/:moduleId",
  courseUnitController.TitleGetByModule
);

module.exports = router;
