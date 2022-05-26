var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var blogSchema = new Schema(
  {
    blogImg: { type: String },
    title: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    addedBy: { type: Schema.Types.ObjectId, ref: "User" },
    isDeleted: { type: Boolean, default: false },
    discription: { type: String, required: true },
  },
  { collection: "blog", timestamps: { createdAt: true, updatedAt: true } }
);

var blog = mongoose.model("blog", blogSchema);

module.exports = blog;
