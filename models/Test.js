var mongoose = require("mongoose");

var testSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    }
  }
);

var test = mongoose.model("test", testSchema);
module.exports = test;
