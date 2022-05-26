var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema(
  {
    name: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { collection: "category", timestamps: { createdAt: true, updatedAt: true } }
);
var Category = mongoose.model("Category", categorySchema);

module.exports = Category;
