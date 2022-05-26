const galaryCollection = require("../models/galary");

const post = (payload) => galaryCollection.create(payload);
// const getAll = () => blogCollection.find({ isDeleted: false });
// const getBlogById = (condition) => blogCollection.findById(condition);

// const getOne = (condition) => blogCollection.findById(condition);
const getGalaryWithPagination = (pageNo, limit) => {
  return galaryCollection
    .find({})
    .skip(parseInt(pageNo - 1) * limit)
    .limit(limit)
    .sort({ _id: -1 });
};
// const getByCategoryId = (id, pageNo, limit) =>
//   blogCollection
//     .find({ isDeleted: false, categoryId: id })
//     .skip(parseInt(pageNo - 1) * limit)
//     .limit(limit);

// const getCountByCategoryId = (id) => {
//   blogCollection.count({ isDeleted: false, categoryId: id });
// };

// const update = (condition, obj) =>
//   blogCollection.findOneAndUpdate(condition, obj);

// const updateById = (condition, obj) =>
//   blogCollection.findByIdAndUpdate(condition, obj);

// // const update = (condition, payload, obj) =>
// //   blogCollection.findByIdAndUpdate(condition, payload, obj);

// const getCourseBySearch = (pageNo, limit, searchValue) => {
//   return blogCollection
//     .find({
//       $or: [{ title: { $regex: String(searchValue), $options: "i" } }],
//     })
//     .skip(parseInt(pageNo - 1) * limit)
//     .limit(limit);
// };

// const getCourseSearchCount = (searchValue) => {
//   return blogCollection
//     .find({
//       $or: [{ name: { $regex: String(searchValue), $options: "i" } }],
//     })
//     .count();
// };
// const getAllBlogcategory = (pageNo, limit, _id) => {
//   return blogCollection
//     .find({ isDeleted: false })
//     .skip(parseInt(pageNo - 1) * limit)
//     .limit(limit);
// };
module.exports = {
  post,
  //   getAll,
  getGalaryWithPagination,
  //   getByCategoryId,
  //   update,
  //   getCourseBySearch,
  //   getCourseSearchCount,
  //   getOne,
  //   getAllBlogcategory,
  //   getBlogById,
  //   updateById,
  //   getCountByCategoryId,
};
