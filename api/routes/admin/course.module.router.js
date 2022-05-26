const express = require("express");
const router = express.Router();

const courseModuleController = require("../../controllers/admin/course.module.controller");

router.post("/create", courseModuleController.createCourseModule);

router.get("/getAll", courseModuleController.getAllModules);

router.get("/get/:pageNo/:limit", courseModuleController.getCourseModule);

router.delete("/delete/:id", courseModuleController.deleteCourseModule);

router.put("/edit/:id", courseModuleController.editCouseModule);

router.get(
  "/search/:pageNo/:limit/:text",
  courseModuleController.searchCourseModule
);
router.get("/getModuleById/:id", courseModuleController.getModuleById);

router.get("/swap/:id/:idd", courseModuleController.swapCourseModule);
router.get("/modulebytitle/:title", courseModuleController.ModuleGetByTitle);

module.exports = router;
