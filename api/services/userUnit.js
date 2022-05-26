const userUnitCollection = require("../models/UserUnits");
const post = (payload) => userUnitCollection.create(payload);
const getAll = () => userUnitCollection.find({});
const getByUnitId = (id) => userUnitCollection.find({ userId: id });

module.exports = {
  post,
  getAll,
  getByUnitId,
};
