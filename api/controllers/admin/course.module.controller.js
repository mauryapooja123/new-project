// const courseModule = require("../../models/CourseModule");
// const courseModuleService = require("../../services/course.module.services");
// const { pick } = require("lodash");

// const createCourseModule = async (req, res) => {
//   try {
//     const { state, title, orderNo, courseId } = req.body;
//     const module = {
//       state,
//       orderNo,
//       title,
//       courseId,
//     };
//     const exist = await courseModule.findOne({ orderNo: req.body.orderNo });
//     if (exist) {
//       return res.status(400).json({
//         message: "OrderNo already exist",
//       });
//     } else {
//       const createdModule = await courseModuleService.post(module);
//       return res.status(201).json({
//         success: true,
//         message: "Course module added succesfully",
//         data: createdModule,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getModuleById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const response = await courseModuleService.getModuleById(id);
//     const result = response.map((item) => ({
//       id: item._id,
//       title: item.title,
//       courseId: item.courseId,
//     }));
//     // console.log(result,":::::")
//     if (!result) {
//       return res.status(200).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         data: result,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const getAll = async (req, res) => {
//   try {
//     // const id = req.params._id;
//     // const title = req.params.title
//     const result = await courseModuleService.getAll().populate("courseId");
//     // const result = response.map(item=>({id:item._id, title:item.title}))
//     if (!result) {
//       return res.status(200).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         data: result,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const getCourseModule = async (req, res) => {
//   try {
//     let { pageNo, limit } = req.params;
//     const response = await courseModuleService
//       .getAllCourseModule(Number(pageNo), Number(limit))
//       .populate("courseId");

//     const count = await courseModule.count({ isDeleted: false });
//     if (!response) {
//       return res.status(200).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         message: "Data get successfully",
//         data: response,
//         totalCount: count,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getModule = async (req, res) => {
//   try {
//     const response = await courseModuleService.getAll();

//     if (!response) {
//       return res.status(200).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         message: "Data get successfully",
//         data: response,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// const deleteCourseModule = async (req, res) => {
//   const id = req.params.id;
//   try {
//     // const response = await courseModuleService.remove(id);

//     const response = await courseModule.updateOne(
//       { _id: req.params.id },
//       {
//         isDeleted: true,
//       }
//     );

//     if (response) {
//       return res.status(200).json({
//         success: true,
//         message: "Course Module Deleted Successfully",
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

// const editCouseModule = async (req, res, next) => {
//   try {
//     const courseId = req.params.id;
//     if (!courseId)
//       return res.status(200).json({
//         status: 401,
//         success: false,
//         message: "courseId is required ",
//       });
//     let data = pick(req.body, [
//       "isDeleted",
//       "orderNo",
//       "title",
//       "courseId",
//       "state",
//     ]);

//     let message = "Course Module updated successfully";
//     if (data.isDeleted) {
//       message = "Course Module Deleted successfully";
//     }

//     let result = await courseModuleService.update(
//       {
//         _id: courseId,
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
//       message: "Course updated successfully",
//     });
//   } catch (error) {
//     return res
//       .status(200)
//       .json({ status: 401, success: false, message: error.message });
//   }
// };

// const searchCourseModule = async (req, res) => {
//   try {
//     let { text, pageNo, limit } = req.params;
//     const response = await courseModuleService.getCourseBySearch(
//       Number(pageNo),
//       Number(limit),
//       text
//     );
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         data: response,
//         count: response.length,
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

// // const getModuleById = async (req, res) => {
// //   // debugger;
// //   try {
// //     const { id } = req.params;
// //     const response = await courseModuleService.getModuleById(id);
// //     const result = response.map((item) => ({
// //       id: item._id,
// //       title: item.title,
// //       courseId: item.courseId,
// //     }));
// //     // console.log(result,":::::")
// //     if (!result) {
// //       return res.status(200).json({
// //         message: "Data not found",
// //         status: 404,
// //       });
// //     } else {
// //       return res.status(200).json({
// //         data: result,
// //       });
// //     }
// //   } catch (error) {
// //     return res.status(500).json({
// //       message: error.message,
// //       success: false,
// //     });
// //   }
// // };

// const swapCourseModule = async (req, res) => {
//   try {
//     const firstId = req.params.id;
//     const secondId = req.params.idd;

//     const firstData1 = await courseModuleService.finds(firstId);

//     const secondData2 = await courseModuleService.finds(secondId);

//     const findid = firstData1[0]._id;
//     const findidd = secondData2[0]._id;

//     const firstData = await courseModuleService.findOne(findid);

//     const secondData = await courseModuleService.findOne(findidd);
//     let firstModule = {
//       orderNo: secondData.orderNo,
//     };
//     let secondModule = {
//       orderNo: firstData.orderNo,
//     };

//     let FirstResult = await courseModuleService.update(
//       {
//         _id: findid,
//       },
//       {
//         ...firstModule,
//         orderNo: secondData.orderNo,
//       }
//     );

//     let SecondResult = await courseModuleService.update(
//       {
//         _id: findidd,
//       },
//       {
//         ...secondModule,
//         orderNo: firstData.orderNo,
//       }
//     );

//     const payload = {
//       FirstResult,
//       SecondResult,
//     };
//     let result = await courseModuleService.updates(payload);
//     res.status(200).send({
//       statusCode: 200,
//       data: result,
//       message: "data swap succesfully",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// const ModuleGetByTitle = async (req, res) => {
//   const title = req.params.title;
//   try {
//     const response = await courseModuleService.getModule(title);
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         message: "Module of This title is...",
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
//   createCourseModule,
//   getAll,
//   getModuleById,
//   getCourseModule,
//   getModule,
//   deleteCourseModule,
//   editCouseModule,
//   searchCourseModule,
//   swapCourseModule,
//   ModuleGetByTitle,
// };

const courseModule = require("../../models/CourseModule");
const courseModuleService = require("../../services/course.module.services");
const { pick } = require("lodash");
const courseCollection = require("../../models/Courses");
const courseUnitCollection = require("../../models/CourseUnits");
const questionCollection = require("../../models/question");

const createCourseModule = async (req, res) => {
  try {
    const { state, title, orderNo, courseId } = req.body;
    const module = {
      state,
      orderNo,
      title,
      courseId,
    };
    const exist = await courseModule.findOne({ orderNo: req.body.orderNo });
    if (exist) {
      return res.status(400).json({
        message: "OrderNo already exist",
      });
    } else {
      const createdModule = await courseModuleService.post(module);
      return res.status(201).json({
        success: true,
        message: "Course module added succesfully",
        data: createdModule,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

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

const getAllModules = async (req, res) => {
  try {
    // const id = req.params._id;
    // const title = req.params.title
    const result = await courseModuleService.getAll().populate("courseId");
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

const getCourseModule = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
    const response = await courseModuleService
      .getAllCourseModule(Number(pageNo), Number(limit))
      .populate("courseId");

    const count = await courseModule.count({ isDeleted: false });
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

const getModule = async (req, res) => {
  try {
    const response = await courseModuleService.getAll();

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

const deleteCourseModule = async (req, res) => {
  const moduleId = req.params.id;
  try {
    // const response = await courseModuleService.remove(id);

    const response = await courseModule.updateOne(
      { _id: moduleId },
      {
        isDeleted: true,
      }
    );

    // if (Courseresponse) {
    //   const response = await courseCollection.updateOne(
    //     { _id: Courseresponse._id },
    //     {
    //       isDeleted: true,
    //     }
    //   );
    //   console.log(response, "ohk");
    // }

    let unitres = await courseUnitCollection.updateMany(
      { module: moduleId },
      {
        isDeleted: true,
      }
    );
    console.log(unitres, "ohk");

    let questionresponse = await questionCollection.updateOne(
      { module: moduleId },
      {
        isDeleted: true,
      }
    );
    console.log(questionresponse, "ohk");

    if (response) {
      return res.status(200).json({
        success: true,
        message: "Course Module Deleted Successfully",
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

const editCouseModule = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    if (!courseId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "courseId is required ",
      });
    let data = pick(req.body, [
      "isDeleted",
      "orderNo",
      "title",
      "courseId",
      "state",
    ]);

    let message = "Course Module updated successfully";
    if (data.isDeleted) {
      message = "Course Module Deleted successfully";
    }

    let result = await courseModuleService.update(
      {
        _id: courseId,
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
      message: "Course updated successfully",
    });
  } catch (error) {
    return res
      .status(200)
      .json({ status: 401, success: false, message: error.message });
  }
};

const searchCourseModule = async (req, res) => {
  try {
    let { text, pageNo, limit } = req.params;
    const response = await courseModuleService.getCourseBySearch(
      Number(pageNo),
      Number(limit),
      text
    );
    if (response) {
      return res.status(200).json({
        success: true,
        data: response,
        count: response.length,
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

// const getModuleById = async (req, res) => {
//   // debugger;
//   try {
//     const { id } = req.params;
//     const response = await courseModuleService.getModuleById(id);
//     const result = response.map((item) => ({
//       id: item._id,
//       title: item.title,
//       courseId: item.courseId,
//     }));
//     // console.log(result,":::::")
//     if (!result) {
//       return res.status(200).json({
//         message: "Data not found",
//         status: 404,
//       });
//     } else {
//       return res.status(200).json({
//         data: result,
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

const swapCourseModule = async (req, res) => {
  try {
    const firstId = req.params.id;
    const secondId = req.params.idd;

    const firstData1 = await courseModuleService.finds(firstId);

    const secondData2 = await courseModuleService.finds(secondId);

    const findid = firstData1[0]._id;
    const findidd = secondData2[0]._id;

    const firstData = await courseModuleService.findOne(findid);

    const secondData = await courseModuleService.findOne(findidd);
    let firstModule = {
      orderNo: secondData.orderNo,
    };
    let secondModule = {
      orderNo: firstData.orderNo,
    };

    let FirstResult = await courseModuleService.update(
      {
        _id: findid,
      },
      {
        ...firstModule,
        orderNo: secondData.orderNo,
      }
    );

    let SecondResult = await courseModuleService.update(
      {
        _id: findidd,
      },
      {
        ...secondModule,
        orderNo: firstData.orderNo,
      }
    );

    const payload = {
      FirstResult,
      SecondResult,
    };
    let result = await courseModuleService.updates(payload);
    res.status(200).send({
      statusCode: 200,
      data: result,
      message: "data swap succesfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const ModuleGetByTitle = async (req, res) => {
  const title = req.params.title;
  try {
    const response = await courseModuleService.getModule(title);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Module of This title is...",
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
module.exports = {
  createCourseModule,
  getAllModules,
  getModuleById,
  getCourseModule,
  getModule,
  deleteCourseModule,
  editCouseModule,
  searchCourseModule,
  swapCourseModule,
  ModuleGetByTitle,
};
