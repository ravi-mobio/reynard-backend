const mongoose = require("mongoose");

const formBuilder = new mongoose.Schema(
    {
        questionHeader: {
            type: String,
        },
        questionType: {
            type: String,
        },
        optionValue: {
            type: Object,
            default: {},
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'user',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("form-builder", formBuilder);