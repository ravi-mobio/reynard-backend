// Responses
const { successResponse, errorResponse } = require("../utils/response.utils");

// constants
const constants = require("../utils/constants.utils");

// Services
const locationServices = require("../services/location.service");

exports.createLocation = async (req, res) => {
  try {
    const { title } = req.body;
    let reqData = {};
    reqData.title = title;
    const createdLocation = await locationServices.createLocation(reqData);
    return res
      .status(200)
      .json(successResponse(constants.CREATE_LOCATION, createdLocation));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const locationsList = await locationServices.getAllLocation();
    res.status(200).json(successResponse(locationsList));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};
