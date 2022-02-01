const mongoose = require("mongoose");

let financeSchema = new mongoose.Schema({
    finance: [
    {
      income: [
        {
          date: {
            type: Date,
          },
          amount: {
            type: Number,
          },
          category: [
            {
              type: String,
            },
          ],
        },
      ],
      expenses: [
        {
          date: {
            type: Date,
          },
          amount: {
            type: Number,
          },
          category: [
            {
              type: String,
            },
          ],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Finance", financeSchema);
