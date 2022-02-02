const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
    unique: false,
  },
  securityquestion: {
    type: String,
    required: true
  },
  securityanswer: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    },
  finance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'finance',
        maxlength: 1
  }
});

module.exports = mongoose.model("User", userSchema);
