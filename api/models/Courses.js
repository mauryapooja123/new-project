var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var coursesSchema = new Schema(
  {
    state: { type: String, required: true },
    title: { type: String, required: true },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, enum: [0, 1], default: 0 },
  },
  { collection: "courses", timestamps: { createdAt: true, updatedAt: true } }
);
var Course = mongoose.model("Courses", coursesSchema);

module.exports = Course;
