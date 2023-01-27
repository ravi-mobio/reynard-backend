/* models */
const SavingRule = require("../models/saving-rules.model");

/* create saving rule */
exports.createSavingRule = async (savingRule) => {
  return await SavingRule.create(savingRule);
};

/* get all saving rules */
exports.getAllSavingsRule = async () => {
  return await SavingRule.find();
};
