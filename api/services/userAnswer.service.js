const userAnswerCollection = require("../models/userAnswer");
const post = (payload) => userAnswerCollection.create(payload);
const findOne = (condition) => userAnswerCollection.findOne(condition);

// const getAll = () => userUnitCollection.find({});
// const getByUnitId = (id) => userUnitCollection.find({ userId: id });

module.exports = {
  post,
  findOne,
  // getAll,
  // getByUnitId,
};
