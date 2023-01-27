// Responses
const { successResponse, errorResponse } = require("../utils/response.utils");

// constants
const constants = require("../utils/constants.utils");

// Services
const savingRulesServices = require("../services/saving-rule.service");

exports.createSavingRules = async (req, res) => {
  try {
    const { title } = req.body;
    let reqData = {};
    reqData.title = title;
    const createdSavingRule = await savingRulesServices.createSavingRule(
      reqData
    );
    return res
      .status(200)
      .json(successResponse(constants.CREATE_SAVING_RULE, createdSavingRule));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

exports.getAllSavingRules = async (req, res) => {
  try {
    const savingRuleList = await savingRulesServices.getAllSavingsRule();
    res.status(200).json(successResponse(constants.SAVING_RULE, savingRuleList));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};
