const questionService = require("../../services/questionService");
const Question = require("../../models/question");

const getAllquestion = async (req, res) => {
  try {
    // let { pageNo, limit } = req.params;
    const response = await questionService
      .getAllquestions()
      .populate("courseId")
      .populate("module");

    // const count = await Question.count({});
    if (!response) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        message: "Data get successfully",
        data: response,
        // totalCount: count,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await questionService.getAll(id);
    // .populate("courseId")
    // .populate("module");
    // console.log(response, "response by module question");
    // const result = response.map((item) => ({
    //   id: item._id,
    //   title: item.title,
    //   moduleId: item.moduleId,
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

const getAll = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await questionService.getAllquestions(
      Number(pageNo),
      Number(limit)
    );

    const count = await Question.count({ isDeleted: false });
    // console.log(count, "(********");
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
const getQuestionByModuleIdAndUnitId = async (req, res) => {
  try {
    const { ModuleId, UnitId } = req.params;
    const response = await questionService
      .getquestionWithModuleIdAndUnitId(ModuleId, UnitId)
      .populate("courseId");
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

const getQuestionByUnitId = async (req, res) => {
  try {
    const { UnitId } = req.params;
    const response = await questionService.getquestionWithUnitId(UnitId);
    // .populate("courseId");
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
  getAllquestion,
  getQuestionById,
  getAll,
  getQuestionByModuleIdAndUnitId,
  getQuestionByUnitId,
};
