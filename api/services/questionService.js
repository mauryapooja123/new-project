const courseCollection = require("../models/question");
const findOne = (condition) => courseCollection.findOne(condition);
const post = (payload) => courseCollection.create(payload);
const getAlll = (condition) => courseCollection.find(condition);
const getAll = (id) => courseCollection.find({ module: id });
const getOne = (condition) => courseCollection.findById(condition);

const getAllquestions = (pageNo, limit) => {
  return courseCollection
    .find({ isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};

const update = (condition, payload, obj) =>
  courseCollection.findByIdAndUpdate(condition, payload, obj);
const getquestionWithModuleIdAndUnitId = (ModuleId, unitId) =>
  courseCollection.find({
    module: ModuleId,
    coursUnit: unitId,
    isUnitQuiz: true,
  });
const getquestionWithUnitId = (unitId) =>
  courseCollection.find({
    coursUnit: unitId,
    isUnitQuiz: true,
  });
module.exports = {
  findOne,
  post,
  update,
  getOne,
  getAll,
  getAlll,
  getAllquestions,
  getquestionWithModuleIdAndUnitId,
  getquestionWithUnitId,
};
