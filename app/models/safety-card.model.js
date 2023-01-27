const mongoose = require("mongoose");

const safetyCard = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      ref: "project",
    },
    site: {
      type: mongoose.Types.ObjectId,
      ref: "site",
    },
    location: {
      type: String,
      required: true,
    },
    savingRule: {
      type: mongoose.Types.ObjectId,
      ref: "saving-rule",
    },
    description: {
      type: String,
      required: false,
    },
    dynamicFields: [
      {
        title: {
          type: String,
          required: false,
        },
        value: {
          type: String,
          required: false,
        },
        fieldId: {
          type: mongoose.Types.ObjectId,
          ref: "form-builder",
        },
      },
    ],
    type: {
      type: String,
      required: false,
    },
    severity: {
      type: String,
      required: false,
    },
    likelihood: {
      type: String,
      required: false,
    },
    actionsTaken: {
      type: String,
      required: false,
    },
    stage: {
      type: String,
      enum: ["Open", "Closed", "Investigation", "Ongoing"],
    },
    images: [
      {
        url: {
          type: String,
          required: false,
        },
      },
    ],
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("safetycard", safetyCard);
