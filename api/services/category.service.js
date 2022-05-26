const categoryCollection = require("../models/Category");
const findOne = (condition) => categoryCollection.findOne(condition);
const post = (payload) => categoryCollection.create(payload);
const getAll = () => categoryCollection.find({ isDeleted: false });
const getCategoryById = (condition) => categoryCollection.findById(condition);
const getAllCourseCategory = (pageNo, limit) => {
  return categoryCollection
    .find({ isDeleted: false })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};

const getCourseBySearch = (pageNo, limit, text) => {
  return categoryCollection
    .find({
      $or: [{ name: { $regex: String(text), $options: "i" } }],
    })
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit);
};

const update = (condition, payload, obj) =>
  categoryCollection.findByIdAndUpdate(condition, payload, obj);

module.exports = {
  findOne,
  post,
  update,
  getAll,
  getCourseBySearch,
  getAllCourseCategory,
  getCategoryById,
};
