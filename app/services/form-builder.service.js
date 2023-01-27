const formbuilderModel = require("../models/form-builder.model");
const mongoose = require("mongoose");

/**
 * Create Question
 *
 * @param {*} data
 * @returns
 */
exports.create = async (data) => {
  return await formbuilderModel.create(data);
};

/**
 * Get Question By Id
 *
 * @param {*} id
 * @returns
 */
exports.getQuestionById = async (id) => {
  return await formbuilderModel.findById(mongoose.Types.ObjectId(id));
};

exports.getAllQuestion = async () => {
  return await formbuilderModel.find().populate([
    {
      path: "user createdBy",
      select: { fullName: 1, _id: 1 },
      strictPopulate: false,
    },
  ]);
};

/**
 * Delete Question
 *
 * @param {*} id
 * @returns
 */
exports.deleteQuestion = async (id) => {
  return await formbuilderModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
};
