var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userUnitsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    unitId: { type: Schema.Types.ObjectId, ref: "CourseUnit" },
  },
  { collection: "userUnit", timestamps: { createdAt: true, updatedAt: true } }
);

var UserUnit = mongoose.model("userUnit", userUnitsSchema);

module.exports = UserUnit;
