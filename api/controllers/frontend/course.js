const courseService = require("../../services/course.service");
const Courses = require("../../models/Courses");

const getAllCourse = async (req, res) => {
  try {
    // console.log(req.body, "console of get course::");
    const response = await courseService.getAllByState();
    //   const result = response.map((item) => ({
    //     id: item._id,
    //     title: item.title,
    //   }));
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

const getCourseTitleByState = async (req, res) => {
  try {
    const { state } = req.params;
    const response = await courseService.getTitle(state);

    // console.log(result, ":::::");
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Title of This state is...",
        data: response,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "No Title Found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getCourse = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await courseService.getAllCourse(
      Number(pageNo),
      Number(limit)
    );
    const count = await Courses.count({ isDeleted: false });
    if (!response) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        data: response,
        totalCount: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "idss");
    const response = await courseService.getcourseById(id);

    console.log(response, ":::::");
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

const getCourseWithoutPagination = async (req, res) => {
  try {
    const response = await courseService.getAllCourseWithoutPage();
    console.log(response, "ssss");
    // const count = await Courses.count({ isDeleted: false });
    if (!response) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        data: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const CourseSearch = async (req, res) => {
  try {
    let { text } = req.params;

    const response = await courseService.getCourseBySearchWithoutPagination(
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
  getAllCourse,
  getCourseTitleByState,
  getCourse,
  getCourseById,
  getCourseWithoutPagination,
  CourseSearch,
};
