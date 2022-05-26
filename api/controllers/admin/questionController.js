const questionService = require("../../services/questionService");
const Question = require("../../models/question");
const { pick } = require("lodash");
const bcrypt = require("bcrypt");

const QuestionAdd = async (req, res) => {
  try {
    const { courseId, module, questions, isUnitQuiz, coursUnitId } = req.body;
    const quest = JSON.parse(questions);
    const course1 = {
      courseId: courseId,
      module: module,
      coursUnit: coursUnitId,
      questions: quest,
      isUnitQuiz: isUnitQuiz,
    };
    const createdCourse = await questionService.post(course1);
    return res.status(201).json({
      success: true,
      message: "Question added succesfully",
      data: createdCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
const getAllquestion = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await questionService
      .getAllquestions(Number(pageNo), Number(limit))
      .populate("courseId")
      .populate("module");

    const count = await Question.count({ isDeleted: false });

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

const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await questionService
      .getAll(id)
      .populate("courseId")
      .populate("module");
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

const getAllData = async (req, res) => {
  try {
    // let { pageNo, limit } = req.params;
    const response = await questionService.getAlll();

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

const QuestionGetById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await questionService.getOne(id);
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

const questionEdit = async (req, res, next) => {
  try {
    const questionId = req.params.id;
    if (!questionId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "questionId is required ",
      });
    let data = pick(req.body, [
      "courseId",
      "question",
      "answer",
      "marks",
      "module",
      "questions",
      "coursUnit",
      "isUnitQuiz",
    ]);

    let result = await questionService.update(
      {
        _id: questionId,
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
      data: result,
      message: "Question updated successfully",
    });
  } catch (error) {
    // console.log(error);
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const questionDelete = async (req, res) => {
  const id = req.params.id;

  try {
    // const response = await courseService.remove(
    //   {
    //     _id: id,
    //   },
    //   { $set: { isDeleted: true } }
    // );

    const response = await Question.updateOne(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Course Deleted Successfully",
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
  QuestionAdd,
  getAllquestion,
  QuestionGetById,
  questionEdit,
  questionDelete,
  getAllData,
  getQuestionById,
};
