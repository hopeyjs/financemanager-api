const mongoose = require("mongoose");

exports.connectDB = () => {
    mongoose.connect(
        `${process.env.DBURI}/${process.env.DBNAME}`,
        { useUnifiedTopology: true, useNewUrlParser: true },
        console.log("Connected to DB"),
  )}