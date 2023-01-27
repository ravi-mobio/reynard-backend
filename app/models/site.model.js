const mongoose = require("mongoose");

const Site = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("site", Site);
