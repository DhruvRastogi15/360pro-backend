var mongoose = require('mongoose');

var AdminSchema = new mongoose.Schema({
  adminName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String
  }

}, {
  timestamps: true
});

var admin = mongoose.model('admin', AdminSchema);
module.exports = admin;
