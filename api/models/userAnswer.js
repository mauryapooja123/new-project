var mongoose = require("mongoose");
// var autoIncrement = require("mongoose-auto-increment");
var Schema = mongoose.Schema;

var userAnswerSchema = new Schema(
  {
    answer: { type: String, required: true },
    isCorrect: { type: Boolean, default: false },
    correctAnswer: { type: Schema.Types.ObjectId, ref: "Question" },
    moduleId: { type: Schema.Types.ObjectId, ref: "CourseModule" },
    userId: { type: Schema.Types.ObjectId, ref: "userUnit" },
    attempt: { type: Number, required: true },
  },
  { collection: "userAnswer", timestamps: { createdAt: true, updatedAt: true } }
);
// userAnswerSchema.plugin(autoIncrement.plugin, "userAnswer");
var userAnswer = mongoose.model("userAnswer", userAnswerSchema);

module.exports = userAnswer;
