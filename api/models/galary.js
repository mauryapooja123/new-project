var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var galarySchema = new Schema(
  {
    image: { type: String },
    widthimage: { type: Number },
    heightimage: { type: Number },
  },
  { collection: "galary", timestamps: { createdAt: true, updatedAt: true } }
);

var galary = mongoose.model("galary", galarySchema);

module.exports = galary;
