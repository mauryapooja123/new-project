var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseUnitsSchema = new Schema(
  {
    state: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
    isDeleted: { type: Boolean, default: false },
    module: { type: Schema.Types.ObjectId, ref: "CourseModule" },
    courseQuestionId: { type: Schema.Types.ObjectId, ref: "Question" },
    title: { type: String, required: true },
    content: { type: String, required: true },
    youTubeLink: { type: String, required: true },
    orderNo: { type: Number, required: true },
    status: { type: Number, enum: [0, 1], default: 1 },
  },
  { collection: "courseUnit", timestamps: { createdAt: true, updatedAt: true } }
);

var CourseUnit = mongoose.model("CourseUnit", courseUnitsSchema);

module.exports = CourseUnit;
