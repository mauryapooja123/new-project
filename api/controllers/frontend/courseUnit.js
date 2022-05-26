const courseUnitService = require("../../services/courseUnit.service");

const getAllCourseUnit = async (req, res) => {
  try {
    const response = await courseUnitService.getAll();

    // console.log(response, "::::response of unit course");
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

const getUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await courseUnitService.getUnitById(id);
    const result = response.map((item) => ({
      id: item._id,
      title: item.title,
      courseId: item.courseId,
    }));
    // console.log(result,":::::")
    if (!result) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
const getContentByUnitId = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await courseUnitService.getUnitContentById(id);
    // const result = response.map((item) => ({
    //   id: item._id,
    //   title: item.title,
    //   courseId: item.courseId,
    // }));
    // console.log(result,":::::")
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
  getAllCourseUnit,
  getUnitById,
  getContentByUnitId,
};

// const getAllCourseUnit = async (req, res) => {
//   try {
//     const response = await courseUnitService
//       .getAll()
//       .populate("courseId")
//       .populate("module");
//     console.log(response, "::::response of unit course");
//     // if (!response) {
//     //   return res.status(200).json({
//     //     message: "Data not found",
//     //     status: 404,
//     //   });
//     // } else {
//     //   return res.status(200).json({
//     //     data: response,
//     //   });
//     // }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };
