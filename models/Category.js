var mongoose = require("mongoose");
var categorySchema = new mongoose.Schema({
  categoryName: {
    type: String
  }
},
  {
    timestamps: true
  });

var category = mongoose.model("category", categorySchema);
module.exports = category;
