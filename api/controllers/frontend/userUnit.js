const userUnitService = require("../../services/userUnit");

const userUnitAdd = async (req, res) => {
  try {
    const { userId, unitId } = req.body;

    const userUnit = {
      userId,
      unitId,
    };
    const createduserUnit = await userUnitService.post(userUnit);
    return res.status(201).json({
      success: true,
      message: "UserUnit Added Succesfully",
      data: createduserUnit,
    });
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
    const response = await userUnitService
      .getAll()
      .populate("userId")
      .populate("unitId");

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

const getUserUnitById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await userUnitService.getByUnitId(id).populate("unitId");
    // .populate("courseId");
    //   .populate("module");
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

module.exports = {
  userUnitAdd,
  getAll,
  getUserUnitById,
};
