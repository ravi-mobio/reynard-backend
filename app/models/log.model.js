const mongoose = require("mongoose");

const Log = new mongoose.Schema(
  {
    module: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    actionType: {
      type: String,
      required: true,
    },
    requestData: {
      type: Object,
      default: {},
    },
    responseData: {
      type: Object,
      default: {},
    },
    responseMsg: {
      type: String,
    },
    errorMsg: {
      type: String,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    status: Boolean,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("logs", Log);
