const responseUtils = require("../utils/response.utils");
const constantUtils = require("../utils/constants.utils");

// Service
const projectServices = require("../services/project.service");
const siteServices = require("../services/site.service");
const locationServices = require("../services/location.service");
const savingRulesServices = require("../services/saving-rule.service");
const formbuilderService = require("../services/form-builder.service");

/**
 * Create Question
 *
 * @param {*} req
 * @param {*} res
 */
exports.create = async (req, res) => {
    try {
        await formbuilderService.create(req.body);
        res
            .status(200)
            .json(responseUtils.successResponse(constantUtils.CREATED_FIELDS));
    } catch (error) {
        res.status(500).json(responseUtils.errorResponse(error.message));
    }
};

exports.list = async (req, res) => {
  try {
    const projectList = await projectServices.getAllProjects();
    const siteList = await siteServices.getAllSites();
    const locationsList = await locationServices.getAllLocation();
    const savingRuleList = await savingRulesServices.getAllSavingsRule();

    const temp = {
      Project: projectList,
      Site: siteList,
      Location: locationsList,
      "Saving Rule": savingRuleList,
    };

    // {
    //   optionText: "option 2",
    // },

    let staticFieldJsonformat = {
      _id: "",
      questionHeader: "",
      questionType: "",
      optionValue: [],
      createdBy: {},
    };

    let staticField = [];

    Object.entries(temp).forEach(([key, value]) => {
      let fields = { ...staticFieldJsonformat };
      (fields.questionHeader = key),
        (fields.questionType = value.length > 0 ? "Options" : "Text");
      fields.optionValue = value.map((item) => {
        return { optionText: item.title };
      });
      staticField.push(fields);
    });

    let descriptionfield = { ...staticFieldJsonformat };
    descriptionfield.questionHeader = "Description";
    descriptionfield.questionType = "Text";
    staticField.push(descriptionfield);

    const data = await formbuilderService.getAllQuestion();
    let safetyCArdQuestion = {
      dyamicField: data,
      staticField,
    };
    res
      .status(200)
      .json(
        responseUtils.successResponse(
          constantUtils.DYNAMIC_FIELDS,
          safetyCArdQuestion
        )
      );
  } catch (error) {
    res.status(500).json(responseUtils.errorResponse(error.message));
  }
};

/**
 * Delete Question
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
exports.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const exist = await formbuilderService.getQuestionById(id);

    if (!exist) {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.NO_FIELDS));
    }
    const data = await formbuilderService.deleteQuestion(id);

    return res
      .status(200)
      .json(
        responseUtils.successResponse(constantUtils.DELETED_FIELDS, data)
      );
  } catch (error) {
    res.status(500).json(responseUtils.errorResponse(error.message));
  }
};
