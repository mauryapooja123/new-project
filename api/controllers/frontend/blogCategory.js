const blogCategoryService = require("../../services/category.service");
const blogCategory = require("../../models/Category");

const getAllBlogCategory = async (req, res) => {
  try {
    const result = await blogCategoryService.getAll();
    if (!result) {
      return res.status(200).json({
        message: "Category not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Category get successfully",
        data: result,
        // totalCount: count,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllBlog = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await blogCategoryService
      .getAllCourseCategory(Number(pageNo), Number(limit))
      .populate("categoryId");
    const count = await blogCategory.count({});
    if (!response) {
      return res.status(200).json({
        message: "Blog not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Blogs get successfully",
        data: response,
        totalCount: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getBlogCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await blogCategoryService.getCategoryById(id);

    if (!response) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        data: response,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

module.exports = {
  getAllBlogCategory,
  getAllBlog,
  getBlogCategoryById,
};
