const express = require("express");
const router = express.Router();

const courseController = require("../../controllers/frontend/course");

router.get("/getAll", courseController.getAllCourse);
router.get("/get/:pageNo/:limit", courseController.getCourse);
router.get("/get", courseController.getCourseWithoutPagination);
router.get("/search/:pageNo/:limit/:text", courseController.CourseSearch);

router.get("/titlebystate/:state", courseController.getCourseTitleByState);
router.get("/courseById/:id", courseController.getCourseById);

module.exports = router;
