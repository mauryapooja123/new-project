const express = require("express");
const router = express.Router();

const courseCategory = require("../../controllers/admin/category.controller");
router.post("/create", courseCategory.createCourseCategory);
router.get("/get/:pageNo/:limit", courseCategory.getAllCategory);

router.get("/getById/:id", courseCategory.getCourseCategoryById);
router.delete("/delete/:id", courseCategory.deleteCourseCategory);
router.put("/edit/:id", courseCategory.editCouseCategory);
router.get("/getAll", courseCategory.getAll);
router.get("/search/:pageNo/:limit/:text", courseCategory.CourseCategorySearch);
module.exports = router;
