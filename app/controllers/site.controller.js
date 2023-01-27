// Responses
const { successResponse, errorResponse } = require("../utils/response.utils");

// constants
const constants = require("../utils/constants.utils");

// Services
const siteServices = require("../services/site.service");

exports.createSite = async (req, res) => {
  try {
    const { title } = req.body;
    let reqData = {};
    reqData.title = title;
    const createdSite = await siteServices.createSite(reqData);
    return res
      .status(200)
      .json(successResponse(constants.CREATE_SITE, createdSite));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

exports.getAllSites = async (req, res) => {
  try {
    const siteList = await siteServices.getAllSites();
    res.status(200).json(successResponse(constants.SITE, siteList));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};
