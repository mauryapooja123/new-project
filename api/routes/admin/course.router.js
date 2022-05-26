const express = require("express");
const router = express.Router();
// const { check, query } = require("express-validator");
// const validator = require("./../../utilities/validator");
const courseController = require("../../controllers/admin/course.controller");

router.post("/create", courseController.Course);
router.get("/getAll", courseController.getAllCourse);
router.get("/get/:pageNo/:limit", courseController.getCourse);
router.get("/getById/:id", courseController.CourseGetById);
router.delete("/removeById/:id", courseController.CourseDelete);
router.put("/edit/:id", courseController.CourseEdit);
router.get("/titlebystate/:state", courseController.TitleGetByState);
router.get("/search/:pageNo/:limit/:text", courseController.CourseSearch);
module.exports = router;
