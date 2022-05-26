const express = require("express");
const router = express.Router();

const blogCategoryController = require("../../controllers/frontend/blogCategory");

router.get("/getAll", blogCategoryController.getAllBlogCategory);
router.get("/get/:pageNo/:limit", blogCategoryController.getAllBlog);
router.get("/getById/:id", blogCategoryController.getBlogCategoryById);

module.exports = router;
