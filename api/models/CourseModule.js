var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseModuleSchema = new Schema(
  {
    state: { type: String, required: true },
    title: { type: String, required: true },
    orderNo: { type: Number, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, enum: [0, 1], default: 1 },
  },
  {
    collection: "courseModule",
    timestamps: { createdAt: true, updatedAt: true },
  }
);

var CourseModule = mongoose.model("CourseModule", courseModuleSchema);

module.exports = CourseModule;
