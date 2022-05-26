var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var questionSchema = new Schema(
  {
    courseId: { type: Schema.Types.ObjectId, ref: "Courses" },
    module: { type: Schema.Types.ObjectId, ref: "CourseModule" },
    coursUnit: { type: Schema.Types.ObjectId, ref: "CourseUnit" },
    isUnitQuiz: { type: Boolean, default: false },
    // questions: [{ option: { type: String }, isAnswer: { type: Boolean } }],
    // answer: { type: String, required: true },
    // marks: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
    questions: [
      {
        question: { type: String },
        answer: { type: String },
        marks: { type: Number },
        questions: [{ option: { type: String }, isAnswer: { type: Boolean } }],
      },
    ],
  },
  { collection: "Question", timestamps: { createdAt: true, updatedAt: true } }
);

var question = mongoose.model("Question", questionSchema);

module.exports = question;
