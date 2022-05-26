const userCollection = require("../models/User");
const find = (condition) => userCollection.find(condition);
const findOne = (condition) => userCollection.findOne(condition);
const post = (payload) => userCollection.create(payload);
const get = (condition) => userCollection.find(condition);
const update = (condition, payload) =>
  userCollection.findByIdAndUpdate(condition, payload);

module.exports = {
  findOne,
  post,
  get,
  update,
  find,
};
