const safetyCardModel = require("../models/safety-card.model");
const mongoose = require("mongoose");

/**
 * Create New Safety Card
 *
 * @param {*} data
 * @returns
 */
exports.create = async (data) => {
  return await safetyCardModel.create(data);
};

/**
 * Update Safety Card
 *
 * @param {*} id
 * @param {*} data
 * @returns
 */
exports.update = async (id, data) => {
  return await safetyCardModel.findByIdAndUpdate(
    { _id: mongoose.Types.ObjectId(id) },
    { $set: data },
    { new: true }
  );
};

/**
 * Get Safety Card By Id
 *
 * @param {*} name
 * @returns
 */
exports.getSafetyCardById = async (id) => {
  return await safetyCardModel.findById(mongoose.Types.ObjectId(id));
};

/**
 * Get All Safety Cards
 *
 * @returns
 */
exports.getAllSafetyCard = async () => {
  return await safetyCardModel.find({}, { __v: 0 }).populate([
    {
      path: "project",
      select: { title: 1, _id: 1 },
      strictPopulate: false,
    },
    {
      path: "user createdBy",
      select: { fullName: 1, _id: 1 },
      strictPopulate: false,
    },
    {
      path: "site",
      select: { title: 1, _id: 1 },
      strictPopulate: false,
    },
    {
      path: "savingRule",
      select: { title: 1, _id: 1 },
      strictPopulate: false,
    },
  ]);
};

/**
 * Delete Safety card
 *
 * @param {*} id
 * @returns
 */
exports.deleteSafetyCard = async (id) => {
  return await safetyCardModel.deleteOne({ _id: mongoose.Types.ObjectId(id) });
};
