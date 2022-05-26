const courseModule = require("../../models/CourseModule");
const courseModuleService = require("../../services/course.module.services");

const getModuleById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await courseModuleService.getModuleById(id);
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

const getAll = async (req, res) => {
  try {
    // const id = req.params._id;
    // const title = req.params.title
    // console.log(req.body, "console of get courseModule::");
    const result = await courseModuleService.getAll().populate("courseId");
    //
    // const result = response.map(item=>({id:item._id, title:item.title}))
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
const getModuleByModuleId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "idss");
    const response = await courseModuleService.getModuleByModuleId(id);

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

module.exports = {
  getAll,
  getModuleById,
  getModuleByModuleId,
};
