const courseCollection = require("../models/Courses");
const findOne = (condition) => courseCollection.findOne(condition);
const post = (payload) => courseCollection.create(payload);
const getAllByState = (condition) =>
  courseCollection.find({ isDeleted: false });
const getAll = (condition) => courseCollection.find({ isDeleted: false });
const getOne = (condition) => courseCollection.findById(condition);
const getTitle = (state) => courseCollection.find({ state: state });
const remove = (id) =>
  courseCollection.findByIdAndUpdate(id, { isDeleted: true });
const update = (condition, payload, obj) =>
  courseCollection.findByIdAndUpdate(condition, payload, obj);
const getAllCourse = (pageNo, limit) => {
  return courseCollection
    .find({ isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};
// getAllCourseWithoutPage = () => {
//   return courseCollection.find({ isDeleted: false });
// };
const getAllCourseWithoutPage = (condition) => {
  return courseCollection.aggregate([
    {
      $match: { isDeleted: false },
    },

    {
      $lookup: {
        from: "courseModule",
        localField: "_id",
        foreignField: "courseId",
        as: "courseModuleData",
      },
    },
    {
      $unwind: {
        path: "$courseModuleData",
        // preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "courseUnit",
        localField: "courseModuleData._id",
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$isDeleted", false],
              },
            },
          },
        ],
        foreignField: "module",
        as: "courseModuleData.courseUnitData",
      },
    },
    {
      $unwind: {
        path: "$courseUnitData",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "Question",
        localField: "courseModuleData.courseUnitData._id",
        let: {
          coursUnit: "$coursUnit",
          isDeleted: "$isDeleted",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  //{ $eq: ["$isUnitQuiz", true] },
                  { $eq: ["$isDeleted", false] },
                  { $ne: ["$coursUnit", null] },
                  // {
                  //   $eq: [
                  //     "$courseModuleData.courseUnitData._id",
                  //     "$$coursUnit",
                  //   ],
                  // },
                ],
              },
            },
          },
        ],
        foreignField: "coursUnit",
        as: "courseModuleData.unitQuestionData",
      },
    },
    // {
    //   $unwind: {
    //     path: "$courseUnitData.unitQuestionData",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $group: {
        _id: {
          _id: "$_id",
          state: "$state",
          title: "$title",
          createdAt: "$createdAt",
        },

        courseModuleData: { $push: "$courseModuleData" },
      },
    },

    {
      $project: {
        _id: 1,
        state: 1,
        title: 1,
        courseModuleData: 1,
        //courseUnitData: 1,
        //unitQuestionData: 1,
      },
    },
  ]);
};
const getCourseBySearch = (pageNo, limit, text) => {
  return courseCollection
    .find({
      $or: [
        { state: { $regex: String(text), $options: "i" } },
        { title: { $regex: String(text), $options: "i" } },
      ],
    })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit);
};
const getCourseBySearchWithoutPagination = (text) => {
  return courseCollection.find({
    $or: [
      { state: { $regex: String(text), $options: "i" } },
      { title: { $regex: String(text), $options: "i" } },
    ],
  });
};

const getCourseSearchCount = (text) => {
  return courseCollection
    .find({
      $or: [{ name: { $regex: String(text), $options: "i" } }],
    })
    .count();
};

const getCourseBystate = (state) => courseCollection.find({ state: state });
const getcourseById = (condition) => {
  console.log(condition, "as");
  return courseCollection.findById(condition);
};
module.exports = {
  findOne,
  post,
  // get,
  getTitle,
  update,
  getAllByState,
  getAll,
  getAllCourse,
  getOne,
  remove,
  getCourseBySearch,
  getCourseSearchCount,
  getCourseBystate,
  getcourseById,
  getAllCourseWithoutPage,
  getCourseBySearchWithoutPagination,
};
