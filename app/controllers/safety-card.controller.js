const safetyCardService = require("../services/safety-card.service");
const responseUtils = require("../utils/response.utils");
const constantUtils = require("../utils/constants.utils");

/**
 * Create a New Safety Card
 *
 * @param {*} req
 * @param {*} res
 */
exports.createSafetyCard = async (req, res) => {
  try {
    let reqData = req.body;
    reqData.severity = "";
    reqData.likelihood = "";
    reqData.actionsTaken = "";
    reqData.stage = "Open";
    reqData.type = "Safe";
    await safetyCardService.create(req.body);
    res
      .status(200)
      .json(responseUtils.successResponse(constantUtils.CREATE_SAFETY_CARD));
  } catch (error) {
    res.status(500).json(responseUtils.errorResponse(error.message));
  }
};

/**
 * Update Safety Card
 *
 * @param {*} req
 * @param {*} res
 */
exports.updateSafetyCard = async (req, res) => {
  try {
    const id = req.params.id;
    const safetyCard = await safetyCardService.getSafetyCardById(id);
    if (!safetyCard) {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.NO_SAFETY_CARD));
    }
    const data = await safetyCardService.update(id, req.body);
    res
      .status(200)
      .json(
        responseUtils.successResponse(constantUtils.SAFETY_CARD_UPDATE, data)
      );
  } catch (error) {
    res.status(500).json(responseUtils.errorResponse(error.message));
  }
};

/**
 * Get Safety Card by id
 *
 * @param {*} req
 * @param {*} res
 */
exports.getSafetyCardById = async (req, res) => {
  try {
    const id = req.params.id;
    const safetyCard = await safetyCardService.getSafetyCardById(id);
    if (!safetyCard) {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.NO_SAFETY_CARD));
    }
    res
      .status(200)
      .json(
        responseUtils.successResponse(
          constantUtils.SAFETY_CARD_BY_ID,
          safetyCard
        )
      );
  } catch (error) {
    res.status(500).json(responseUtils.errorResponse(error.message));
  }
};

/**
 * Get all Safety Card
 *
 * @param {*} req
 * @param {*} res
 */
exports.getAllSafetyCard = async (req, res) => {
  try {
    const data = await safetyCardService.getAllSafetyCard();
    res
      .status(200)
      .json(
        responseUtils.successResponse(constantUtils.ALL_SAFETY_CARD_LIST, data)
      );
  } catch (error) {
    res.status(500).json(responseUtils.errorResponse(error.message));
  }
};

/**
 * Delete Safety Card
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteSafetyCard = async (req, res) => {
  try {
    const id = req.params.id;
    const safetyCard = await safetyCardService.getSafetyCardById(id);

    if (!safetyCard) {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.NO_SAFETY_CARD));
    }
    const data = await safetyCardService.deleteSafetyCard(id);

    res
      .status(200)
      .json(
        responseUtils.successResponse(constantUtils.DELETED_SAFETY_CARD, data)
      );
  } catch (error) {
    res.status(500).json(responseUtils.errorResponse(error.message));
  }
};
