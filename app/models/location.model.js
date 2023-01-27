const mongoose = require("mongoose");

const Location = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("location", Location);
