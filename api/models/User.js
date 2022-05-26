var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    email: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String },
    phone: { type: String },
    resetLink: {
      type: String,
      default: "",
    },
    userBlog: { type: Schema.Types.ObjectId, ref: "blog" },
    role: { type: Number, enum: [1, 2, 3], default: 3 },
    status: { type: Number, default: 0 },
    token: { type: String },
  },
  { collection: "users", timestamps: { createdAt: true, updatedAt: true } }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
