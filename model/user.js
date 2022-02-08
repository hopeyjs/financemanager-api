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
  incomes: [{
      date: {
        type: Date,
      },
      amount: {
        type: Number,
      },
      source: [
        {
          type: String,
        }
      ],
    }],
  expenses: [{
      date: {
        type: String,
      },
      amount: {
        type: Number,
      },
      purpose: [{
          type: String,
        }],
    }]
});

module.exports = mongoose.model("User", userSchema);
