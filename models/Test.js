var mongoose = require("mongoose");

var testSchema = new mongoose.Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

var test = mongoose.model("tests", testSchema);
module.exports = test;
