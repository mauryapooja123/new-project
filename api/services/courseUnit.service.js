const courseUnitCollection = require("../models/CourseUnits");
const courseCollection = require("../models/Courses");
var mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

const findOne = (condition) => courseUnitCollection.findOne(condition);
const post = (payload) => courseUnitCollection.create(payload);
// const getAll = (condition) =>
//   courseCollection.aggregate([
//     {
//       $match: { isDeleted: false, state: "Hawaii" },
//     },

//     {
//       $lookup: {
//         from: "courseModule",
//         localField: "_id",
//         foreignField: "courseId",
//         as: "courseModuleData",
//       },
//     },
//     {
//       $unwind: {
//         path: "$courseModuleData",
//         // preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $lookup: {
//         from: "courseUnit",
//         localField: "courseModuleData._id",
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $eq: ["$isDeleted", false],
//               },
//             },
//           },
//         ],
//         foreignField: "module",
//         as: "courseModuleData.courseUnitData",
//       },
//     },
//     {
//       $unwind: {
//         path: "$courseUnitData",
//         preserveNullAndEmptyArrays: true,
//       },
//     },
//     {
//       $lookup: {
//         from: "Question",
//         localField: "courseModuleData.courseUnitData._id",
//         let: {
//           coursUnit: "$coursUnit",
//           isDeleted: "$isDeleted",
//         },
//         pipeline: [
//           {
//             $match: {
//               $expr: {
//                 $and: [
//                   //{ $eq: ["$isUnitQuiz", true] },
//                   { $eq: ["$isDeleted", false] },
//                   { $ne: ["$coursUnit", null] },
//                   // {
//                   //   $eq: [
//                   //     "$courseModuleData.courseUnitData._id",
//                   //     "$$coursUnit",
//                   //   ],
//                   // },
//                 ],
//               },
//             },
//           },
//         ],
//         foreignField: "coursUnit",
//         as: "courseModuleData.unitQuestionData",
//       },
//     },
//     // {
//     //   $unwind: {
//     //     path: "$courseUnitData.unitQuestionData",
//     //     preserveNullAndEmptyArrays: true,
//     //   },
//     // },
//     {
//       $group: {
//         _id: {
//           _id: "$_id",
//           state: "$state",
//           title: "$title",
//         },

//         courseModuleData: { $push: "$courseModuleData" },
//       },
//     },

//     {
//       $project: {
//         _id: 1,
//         state: 1,
//         title: 1,
//         courseModuleData: 1,
//         //courseUnitData: 1,
//         //unitQuestionData: 1,
//       },
//     },
//   ]);
const getUnitById = (id) => courseUnitCollection.find({ module: id });
const getSwap = (condition) =>
  courseUnitCollection.find({ orderNo: condition });
// const get = (condition) => courseCollection.find({ isDeleted: false });
// const getAll = () => courseUnitCollection.find({ isDeleted: false });

const getOne = (condition) => courseUnitCollection.findById(condition);
const getAllCourseUnit = (pageNo, limit) => {
  return courseUnitCollection
    .find({ isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};
const remove = (id) =>
  courseUnitCollection.findByIdAndUpdate(id, { isDeleted: true });
const update = (condition, payload) =>
  courseUnitCollection.updateOne(condition, payload);
const updates = (payload) => courseUnitCollection.updateMany({}, payload);
const swap = (condition) => courseUnitCollection.updateOne(condition);
const getAll = (condition) => courseUnitCollection.find({ isDeleted: false });
const getCourseUnitBySearch = (pageNo, limit, text) => {
  return courseUnitCollection
    .find({
      $or: [
        // { courseId: { $regex: String(text), $options: "i" } },
        // { module: { $regex: String(text), $options: "i" } },
        { content: { $regex: String(text), $options: "i" } },
        { title: { $regex: String(text), $options: "i" } },
      ],
    })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit);
};
const getUnitContentById = (condition) =>
  courseUnitCollection.findById(condition);
const getCourseUnitSearchCount = (text) => {
  return courseUnitCollection
    .find({
      $or: [
        { content: { $regex: String(text), $options: "i" } },
        { title: { $regex: String(text), $options: "i" } },
      ],
    })
    .count();
};

const getTitle = (id) => courseUnitCollection.find({ module: id });

module.exports = {
  findOne,
  post,
  getUnitById,
  getAll,
  updates,
  update,
  getOne,
  getSwap,
  getAllCourseUnit,
  remove,
  getUnitContentById,
  getCourseUnitBySearch,
  getCourseUnitSearchCount,
  swap,
  getTitle,
};
