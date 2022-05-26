// const courseService = require("../../services/course.service");
// const Courses = require("../../models/Courses");
// const { pick } = require("lodash");
// const bcrypt = require("bcrypt");
// const courseCollection = require("../../models/Courses");

// const Course = async (req, res) => {
//   try {
//     const { state, title, isDeleted, status } = req.body;

//     const course = {
//       state,
//       title,
//       isDeleted,
//       status,
//     };
//     const createdCourse = await courseService.post(course);
//     return res.status(201).json({
//       success: true,
//       message: "Course added succesfully",
//       data: createdCourse,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };

// const getAllCourse = async (req, res) => {
//   try {
//     // const id = req.params._id;
//     // const title = req.params.title
//     const response = await courseService.getAll();
//     const result = response.map((item) => ({
//       id: item._id,
//       title: item.title,
//       state: item.state,
//     }));
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
// const getCourse = async (req, res) => {
//   try {
//     let { pageNo, limit } = req.params;
//     const response = await courseService.getAllCourse(
//       Number(pageNo),
//       Number(limit)
//     );

//     const count = await Courses.count({ isDeleted: false });
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

// const CourseGetById = async (req, res) => {
//   const id = req.params.id;
//   try {
//     const response = await courseService.getOne(id);
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         message: "Course of This Id is...",
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

// const TitleGetByState = async (req, res) => {
//   const state = req.params.state;
//   try {
//     const response = await courseService.getTitle(state);
//     if (response) {
//       return res.status(200).json({
//         success: true,
//         message: "Title of This state is...",
//         data: response,
//       });
//     } else {
//       return res.status(400).json({
//         success: false,
//         message: "No Title Found",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// };
// // const CourseDelete = async (req, res) => {
// //   // console.log("-------------");
// //   // const id = req.params.id;

// //   try {
// //     // const response = await courseService.remove(
// //     //   {
// //     //     _id: id,
// //     //   },
// //     //   { $set: { isDeleted: true } }
// //     // );

// //     const response = await courseCollection.updateOne(
// //       { _id: req.params.id },
// //       {
// //         isDeleted: true,
// //       }
// //     );
// //     // console.log(response, "p");
// //     if (response) {
// //       return res.status(200).json({
// //         success: true,
// //         message: "Course Deleted Successfully",
// //         data: response,
// //       });
// //     } else {
// //       return res.status(400).json({
// //         success: false,
// //         message: "No Course Found",
// //       });
// //     }
// //   } catch (error) {
// //     return res.status(500).json({
// //       message: error.message,
// //       success: false,
// //     });
// //   }
// // };

// const CourseSearch = async (req, res) => {
//   try {
//     let { text, pageNo, limit } = req.params;
//     // let pageNo = req.params.pageNo;
//     // let limit = req.params.limit;
//     const response = await courseService.getCourseBySearch(
//       Number(pageNo),
//       Number(limit),
//       text
//     );
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

// const CourseEdit = async (req, res, next) => {
//   try {
//     const courseId = req.params.id;
//     if (!courseId)
//       return res.status(200).json({
//         status: 401,
//         success: false,
//         message: "courseId is required ",
//       });
//     let data = pick(req.body, ["isDeleted", "state", "title"]);

//     data.addedBy = req._user._id;
//     let message = "Course updated successfully";
//     if (data.isDeleted) {
//       message = "Course Deleted successfully";
//     }

//     let result = await courseService.update(
//       {
//         _id: courseId,
//       },
//       { $set: { ...data } },
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

// module.exports = {
//   Course,
//   getCourse,
//   TitleGetByState,
//   CourseGetById,
//   getAllCourse,
//   CourseDelete,
//   CourseEdit,
//   CourseSearch,
// };

const courseService = require("../../services/course.service");
const Courses = require("../../models/Courses");
const { pick } = require("lodash");
const bcrypt = require("bcrypt");
const courseCollection = require("../../models/Courses");
const CourseModule = require("../../models/CourseModule");
const courseModuleService = require("../../services/course.module.services");
const courseUnitCollection = require("../../models/CourseUnits");
const questionCollection = require("../../models/question");

const Course = async (req, res) => {
  try {
    const { state, title, isDeleted, status } = req.body;

    const course = {
      state,
      title,
      isDeleted,
      status,
    };
    const createdCourse = await courseService.post(course);
    return res.status(201).json({
      success: true,
      message: "Course added succesfully",
      data: createdCourse,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

const getAllCourse = async (req, res) => {
  try {
    // const id = req.params._id;
    // const title = req.params.title
    const response = await courseService.getAll();
    const result = response.map((item) => ({
      id: item._id,
      title: item.title,
      state: item.state,
    }));
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
const getCourse = async (req, res) => {
  try {
    let { pageNo, limit } = req.params;
  console.log(pageNo,limit)

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

const CourseGetById = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await courseService.getOne(id);
    if (response) {
      return res.status(200).json({
        success: true,
        message: "Course of This Id is...",
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

const TitleGetByState = async (req, res) => {
  const state = req.params.state;
  try {
    const response = await courseService.getTitle(state);
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
const CourseDelete = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await courseCollection.updateOne(
      { _id: req.params.id },
      {
        isDeleted: true,
      }
    );

    const Moduleresponse = await CourseModule.updateMany(
      { courseId: id },
      {
        isDeleted: true,
      }
    );

    console.log(Moduleresponse, "sssssss");

    let unitres = await courseUnitCollection.updateMany(
      { courseId: id },
      {
        isDeleted: true,
      }
    );
    console.log(unitres, "ohk");

    let unitQuestion = await questionCollection.updateOne(
      { courseId: id },
      {
        isDeleted: true,
      }
    );
    console.log(unitQuestion, "ohkiiiiiiiiii");

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

const CourseSearch = async (req, res) => {
  try {
    let { text, pageNo, limit } = req.params;
    // let pageNo = req.params.pageNo;
    // let limit = req.params.limit;
    const response = await courseService.getCourseBySearch(
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

const CourseEdit = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    if (!courseId)
      return res.status(200).json({
        status: 401,
        success: false,
        message: "courseId is required ",
      });
    let data = pick(req.body, ["isDeleted", "state", "title"]);

    data.addedBy = req._user._id;
    let message = "Course updated successfully";
    if (data.isDeleted) {
      message = "Course Deleted successfully";
    }

    let result = await courseService.update(
      {
        _id: courseId,
      },
      { $set: { ...data } },
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

module.exports = {
  Course,
  getCourse,
  TitleGetByState,
  CourseGetById,
  getAllCourse,
  CourseDelete,
  CourseEdit,
  CourseSearch,
};
