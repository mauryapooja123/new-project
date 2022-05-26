const courseModuleCollection = require("../models/CourseModule");
const findOne = (condition) => courseModuleCollection.findById(condition);
const finds = (condition) =>
  courseModuleCollection.find({ orderNo: condition });
const post = (payload) => courseModuleCollection.create(payload);
const getAll = (condition) => courseModuleCollection.find({ isDeleted: false });
const getModuleById = (id) => courseModuleCollection.find({ courseId: id });
const remove = (condition) =>
  courseModuleCollection.findByIdAndDelete(condition);
const update = (condition, payload) =>
  courseModuleCollection.updateOne(condition, payload);
const updates = (payload) => courseModuleCollection.updateMany(payload);
const getModule = (title) => courseModuleCollection.find({ title: title });

const getAllCourseModule = (pageNo, limit) => {
  return courseModuleCollection
    .find({ isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};

const getCourseBySearch = (pageNo, limit, text) => {
  return courseModuleCollection
    .find({
      $or: [{ title: { $regex: String(text), $options: "i" } }],
    })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .populate("courseId");
};

const getModuleByModuleId = (condition) => {
  console.log(condition, "as");
  return courseModuleCollection.findById(condition);
};
module.exports = {
  findOne,
  finds,
  post,
  getAll,
  update,
  remove,
  getModule,
  getAllCourseModule,
  getCourseBySearch,
  updates,
  getModuleById,
  getModuleByModuleId,
};
