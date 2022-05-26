// const courseUnitService = require("../../services/courseUnit.service");
// const CourseUnits = require("../../models/CourseUnits");
// const { pick } = require("lodash");
// const bcrypt = require("bcrypt");

// const createCourseUnit = async (req, res) => {
//   try {
//     // debugger;
//     const {
//       state,
//       courseId,
//       module,
//       content,
//       youTubeLink,
//       title,
//       orderNo,
//       status,
//     } = req.body;
//     const course = await courseUnitService.findOne({ orderNo });
//     if (course) {
//       return res.status(400).json({
//         message: "Order No Already Exists",
//       });
//     }
//     const courseUnit = {
//       state,
//       courseId,
//       module,
//       content,
//       youTubeLink,
//       title,
//       orderNo,
//       status,
//     };
//     const response = await courseUnitService.post(courseUnit);
//     return res.status(201).json({
//       success: true,
//       message: "Course Unit added Succesfully",
//       data: response,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const getCourseUnitById = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const response = await courseUnitService.getOne(id);
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         data: response,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No Data Found",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const getAllCourseUnit = async (req, res) => {
//   try {
//     const response = await courseUnitService.getAll();
//     if (!response) {
//       return res.status(200).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         data: response,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const getCourseUnit = async (req, res) => {
//   try {
//     let { pageNo, limit } = req.params;
//     const response = await courseUnitService
//       .getAllCourseUnit(Number(pageNo), Number(limit))
//       .populate("courseId")
//       .populate("module");

//     const count = await CourseUnits.count({ isDeleted: false });
//     if (!response) {
//       return res.status(200).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         data: response,
//         totalCount: count,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const courseUnitSearch = async (req, res) => {
//   try {
//     let { text, pageNo, limit } = req.params;
//     const response = await courseUnitService
//       .getCourseUnitBySearch(Number(pageNo), Number(limit), text)
//       .populate("courseId")
//       .populate("module");
//     // console.log(response, "Response of Search api:::");
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         data: response,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No Course Found",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const courseUnitDelete = async (req, res) => {
//   // const id = req.params.id;
//   try {
//     // const response = await courseUnitService.remove(id);
//     const response = await CourseUnits.updateOne(
//       { _id: req.params.id },
//       {
//         isDeleted: true,
//       }
//     );
//     // console.log(response, "response of delete api");
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         message: "Course Unit Deleted Successfully",
//         data: response,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No Course Found",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const courseUnitEdit = async (req, res, next) => {
//   try {
//     const courseUnitId = req.params.id;
//     if (!courseUnitId)
//       return res.status(200).json({
//         status: 401,
//         success: false,
//         message: "courseUnitId is required ",
//       });
//     let data = pick(req.body, [
//       "state",
//       "isDeleted",
//       "courseId",
//       "title",
//       "content",
//       "youTubeLink",
//       "orderNo",
//       "module",
//     ]);
//     if (data.isDeleted) {
//       message = "Course Unit Deleted Successfully";
//     }

//     let result = await courseUnitService.update(
//       {
//         _id: courseUnitId,
//       },
//       { $set: data },
//       { fields: { _id: 1 }, new: true }
//     );
//     if (!result)
//       return res.status(200).json({
//         status: 401,
//         success: false,
//         message: "Only admin can delete or modify project",
//       });
//     return res.status(200).json({
//       status: 200,
//       success: true,
//       result,
//       message: "Course Unit updated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     return res
//       .status(200)
//       .json({ status: 401, success: false, message: error.message });
//   }
// };

// const swapCourseUnit = async (req, res) => {
//   try {
//     const firstId = req.params.fromId;
//     const secondId = req.params.toId;
//     // console.log(firstId, "++++++++");

//     const firstData1 = await courseUnitService.getSwap(firstId);

//     // console.log(firstData1[0]._id, "ss");
//     const secondData2 = await courseUnitService.getSwap(secondId);
//     // console.log(secondData2[0]._id, "secondData");

//     const findid = firstData1[0]._id;
//     const findidd = secondData2[0]._id;

//     const firstData = await courseUnitService.getOne(findid);
//     // console.log(firstData.orderNo, "______________");

//     const secondData = await courseUnitService.getOne(findidd);
//     // console.log(secondData.orderNo, "+))))))))))))))))");
//     let firstUnit = {
//       orderNo: secondData.orderNo,
//     };
//     // console.log(firstUnit, "&&&&&&&&&&&&&&&&");
//     let secondUnit = {
//       orderNo: firstData.orderNo,
//     };

//     let FirstResult = await courseUnitService.update(
//       {
//         _id: findid,
//       },
//       {
//         ...firstUnit,
//         orderNo: secondData.orderNo,
//       }
//     );

//     let SecondResult = await courseUnitService.update(
//       {
//         _id: findidd,
//       },
//       {
//         ...secondUnit,
//         orderNo: firstData.orderNo,
//       }
//     );

//     let result = await courseUnitService.updates();
//     res.status(200).send({
//       statusCode: 200,
//       data: result,
//       message: "data swap succesfully",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const TitleGetByModule = async (req, res) => {
//   const moduleId = req.params.moduleId;
//   try {
//     const response = await courseUnitService.getTitle(moduleId);
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         message: " Title of This CourseUnit is...",
//         data: response,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No Data Found",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// module.exports = {
//   createCourseUnit,
//   getCourseUnitById,
//   getCourseUnit,
//   getAllCourseUnit,
//   courseUnitSearch,
//   courseUnitDelete,
//   courseUnitEdit,
//   swapCourseUnit,
//   TitleGetByModule,
// };

const courseUnitService = require("../../services/courseUnit.service");
const CourseUnits = require("../../models/CourseUnits");
const { pick } = require("lodash");
const bcrypt = require("bcrypt");
const questionCollection = require("../../models/question");

const createCourseUnit = async (req, res) => {
  try {
    // debugger;
    const {
      state,
      courseId,
      module,
      content,
      youTubeLink,
      title,
      orderNo,
      status,
    } = req.body;
    const course = await courseUnitService.findOne({ orderNo });
    if (course) {
      return res.status(400).json({
        message: "Order No Already Exists",
      });
    }
    const courseUnit = {
      state,
      courseId,
      module,
      content,
      youTubeLink,
      title,
      orderNo,
      status,
    };
    const response = await courseUnitService.post(courseUnit);
    return res.status(201).json({
      success: true,
      message: "Course Unit added Succesfully",
      data: response,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getCourseUnitById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await courseUnitService.getOne(id);
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

const getAllCourseUnit = async (req, res) => {
  try {
    const response = await courseUnitService.getAll();
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

const getCourseUnit = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await courseUnitService
      .getAllCourseUnit(Number(pageNo), Number(limit))
      .populate("courseId")
      .populate("module");

    const count = await CourseUnits.count({ isDeleted: false });
    if (!response) {
      return res.status(200).json({
        message: "Data not found",
        status: 404,
      });
    } else {
      return res.status(200).json({
        data: response,
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

const courseUnitSearch = async (req, res) => {
  try {
    let { text, pageNo, limit } = req.params;
    const response = await courseUnitService
      .getCourseUnitBySearch(Number(pageNo), Number(limit), text)
      .populate("courseId")
      .populate("module");
    // console.log(response, "Response of Search api:::");
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

const courseUnitDelete = async (req, res) => {
  const unitId = req.params.id;
  try {
    // const response = await courseUnitService.remove(id);
    const response = await CourseUnits.updateOne(
      { _id: unitId },
      {
        isDeleted: true,
      }
    );
    // console.log(response, "response of delete api");

    let question = await questionCollection.updateOne(
      { coursUnit: unitId },
      {
        isDeleted: true,
      }
    );
    console.log(question, "ohk");

    if (response) {
      return res.status(200).json({
        success: true,
        message: "Course Unit Deleted Successfully",
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

const courseUnitEdit = async (req, res, next) => {
  try {
    const courseUnitId = req.params.id;
    if (!courseUnitId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "courseUnitId is required ",
      });
    let data = pick(req.body, [
      "state",
      "isDeleted",
      "courseId",
      "title",
      "content",
      "youTubeLink",
      "orderNo",
      "module",
    ]);
    if (data.isDeleted) {
      message = "Course Unit Deleted Successfully";
    }

    let result = await courseUnitService.update(
      {
        _id: courseUnitId,
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
      message: "Course Unit updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const swapCourseUnit = async (req, res) => {
  try {
    const firstId = req.params.fromId;
    const secondId = req.params.toId;
    // console.log(firstId, "++++++++");

    const firstData1 = await courseUnitService.getSwap(firstId);

    // console.log(firstData1[0]._id, "ss");
    const secondData2 = await courseUnitService.getSwap(secondId);
    // console.log(secondData2[0]._id, "secondData");

    const findid = firstData1[0]._id;
    const findidd = secondData2[0]._id;

    const firstData = await courseUnitService.getOne(findid);
    // console.log(firstData.orderNo, "______________");

    const secondData = await courseUnitService.getOne(findidd);
    // console.log(secondData.orderNo, "+))))))))))))))))");
    let firstUnit = {
      orderNo: secondData.orderNo,
    };
    // console.log(firstUnit, "&&&&&&&&&&&&&&&&");
    let secondUnit = {
      orderNo: firstData.orderNo,
    };

    let FirstResult = await courseUnitService.update(
      {
        _id: findid,
      },
      {
        ...firstUnit,
        orderNo: secondData.orderNo,
      }
    );

    let SecondResult = await courseUnitService.update(
      {
        _id: findidd,
      },
      {
        ...secondUnit,
        orderNo: firstData.orderNo,
      }
    );

    let result = await courseUnitService.updates();
    res.status(200).send({
      statusCode: 200,
      data: result,
      message: "data swap succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const TitleGetByModule = async (req, res) => {
  const moduleId = req.params.moduleId;
  try {
    const response = await courseUnitService.getTitle(moduleId);
    if (response) {
      return res.status(200).json({
        success: true,
        message: " Title of This CourseUnit is...",
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

const getAll = async (req, res) => {
  try {
    const response = await courseUnitService
      .getAllCourseUnit()
      .populate("courseId")
      .populate("module");

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
  createCourseUnit,
  getCourseUnitById,
  getCourseUnit,
  getAllCourseUnit,
  courseUnitSearch,
  courseUnitDelete,
  courseUnitEdit,
  swapCourseUnit,
  TitleGetByModule,
  getAll,
};
