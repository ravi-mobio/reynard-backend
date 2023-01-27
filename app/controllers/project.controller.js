// Responses
const { successResponse, errorResponse } = require("../utils/response.utils");

// constants
const constants = require("../utils/constants.utils");

// Services
const projectServices = require("../services/project.service");

exports.createProject = async (req, res) => {
  try {
    const { title } = req.body;
    let reqData = {};
    reqData.title = title;
    const createdProject = await projectServices.createProject(reqData);
    return res
      .status(200)
      .json(successResponse(constants.CREATE_PROJECT, createdProject));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projectList = await projectServices.getAllProjects();
    res.status(200).json(successResponse(constants.PROJECT, projectList));
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};
