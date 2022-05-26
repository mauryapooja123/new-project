const courseCategory = require("../../models/Category");
const categoryService = require("../../services/category.service");
const { pick } = require("lodash");

const createCourseCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = {
      name,
    };
    const exist = await courseCategory.findOne({ name: req.body.name });
    if (exist) {
      return res.status(400).json({
        message: "This category already exist",
      });
    } else {
      const createdCategory = await categoryService.post(category);
      return res.status(201).json({
        success: true,
        message: "Category Add successfully..",
        data: createdCategory,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllCategory = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const result = await categoryService.getAllCourseCategory(
      Number(pageNo),
      Number(limit)
    );
    const count = await courseCategory.count({ isDeleted: false });
    if (!result) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        data: result,
        totalCount: count,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAll = async (req, res) => {
  try {
    // let { pageNo, limit } = req.params;
    const result = await categoryService.getAll();
    // const count = await courseCategory.count({ isDeleted: false });
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

const getCourseCategoryById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await categoryService.getCategoryById(id);
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Data Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const deleteCourseCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await courseCategory.updateOne(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );

    if (response) {
      return res.status(200).json({
        success: true,
        message: "Category Deleted Successfully",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Course category Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const editCouseCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    if (!categoryId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "categoryId is required ",
      });
    let data = pick(req.body, ["isDeleted", "name"]);

    let message = "Course category updated successfully";
    if (data.isDeleted) {
      message = "Course category Deleted successfully";
    }

    let result = await categoryService.update(
      {
        _id: categoryId,
      },
      { $set: data },
      { fields: { _id: 1 }, new: true }
    );
    if (!result)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "Only admin can delete or modify project",
      });
    return res.status(200).json({
      status: 200,
      success: true,
      result,
      message: "Course category updated successfully",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const CourseCategorySearch = async (req, res) => {
  try {
    let { text, pageNo, limit } = req.params;
    const response = await categoryService.getCourseBySearch(
      Number(pageNo),
      Number(limit),
      text
    );
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Course Found",
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
  createCourseCategory,
  getAllCategory,
  getCourseCategoryById,
  deleteCourseCategory,
  editCouseCategory,
  CourseCategorySearch,
  getAll,
};
