const mongoose = require("mongoose");

const SavingRule = new mongoose.Schema(
  {
    title: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("saving-rule", SavingRule);
