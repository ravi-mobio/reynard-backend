const jwt = require("jsonwebtoken");

const constants = require("../utils/constants.utils");

// Services
const projectServices = require("../services/project.service");
const siteServices = require("../services/site.service");
const locationServices = require("../services/location.service");
const savingRulesServices = require("../services/saving-rule.service");
const userService = require("../services/auth.service");
const formBuilderService = require("../services/form-builder.service");

// Json fromat
const {
  config,
  screen,
  properties,
  option,
  buttons,
} = require("../utils/json-format.utils");

// Response
const { successResponse, errorResponse } = require("../utils/response.utils");

// Environment varibles
// const {IMAGE_URL} = process.env
const IMAGE_URL = process.env.IMAGE_URL;

exports.createCongifFile = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Please send authentication token.",
      });
    }
    const decode = await jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET
    );
    if (decode) {
      const user = await userService.getUserById(decode.id);
      if (user) {
        const projectList = await projectServices.getAllProjects();
        const siteList = await siteServices.getAllSites();
        const locationsList = await locationServices.getAllLocation();
        const savingRuleList = await savingRulesServices.getAllSavingsRule();

        // Project properties
        let projectProperties = { ...properties };
        projectProperties.title = "Project";
        projectList.length > 0
          ? (projectProperties.type = "options")
          : (projectProperties.type = "text");
        projectProperties.id = "project";
        projectProperties.iconUrl = IMAGE_URL + "/settings-sharp.png";
        projectProperties.options = projectList.map((item) => {
          let projectOption = { ...option };
          projectOption.title = item.title;
          projectOption.id = item._id;
          return projectOption;
        });
        projectProperties.IsRequired = true;
        projectProperties.hint = "Required";

        // Site properties
        let siteProperties = { ...properties };
        siteProperties.title = "Site";
        siteProperties.iconUrl = IMAGE_URL + "/caret-forward-circle-sharp.png";
        siteList.length > 0
          ? (siteProperties.type = "options")
          : (siteProperties.type = "text");
        siteProperties.id = "site";
        siteProperties.IsRequired = true;
        siteProperties.hint = "Required";

        siteProperties.options = siteList.map((item) => {
          let tempOption = { ...option };
          tempOption.title = item.title;
          tempOption.id = item._id;
          return tempOption;
        });

        // Location properties
        let locationProperties = { ...properties };
        locationProperties.title = "Location";
        locationsList.length > 0
          ? (locationProperties.type = "options")
          : (locationProperties.type = "text");
        locationProperties.id = "location";
        locationProperties.iconUrl =
          IMAGE_URL + "/caret-forward-circle-sharp.png";
        locationProperties.options = locationsList.map((item) => {
          let tempOption = { ...option };
          tempOption.title = item.title;
          tempOption.id = item._id;
          return tempOption;
        });
        locationProperties.IsRequired = true;
        locationProperties.hint = "Required";

        // Saving Rule properties
        let savingRuleProperties = { ...properties };
        savingRuleProperties.title = "Saving Rule";
        savingRuleList.length > 0
          ? (savingRuleProperties.type = "options")
          : (savingRuleProperties.type = "text");
        savingRuleProperties.id = "savingRule";
        savingRuleProperties.iconUrl =
          IMAGE_URL + "/caret-forward-circle-sharp.png";
        savingRuleProperties.options = savingRuleList.map((item) => {
          let tempOption = { ...option };
          tempOption.title = item.title;
          tempOption.id = item._id;
          return tempOption;
        });
        savingRuleProperties.IsRequired = true;
        savingRuleProperties.hint = "Required";

        // Description field
        let descriptionProperties = { ...properties };
        descriptionProperties.title = "Description";
        descriptionProperties.type = "textarea";
        descriptionProperties.id = "description";
        descriptionProperties.iconUrl = IMAGE_URL + "/pencil-sharp.png";

        const dynamicQuestions = await formBuilderService.getAllQuestion();
        let dynamicQuestionArray = dynamicQuestions.map((field) => {
          let fieldProperties = { ...properties };
          fieldProperties.title = field.questionHeader;
          fieldProperties.type = field.questionType;
          fieldProperties.id = field.questionHeader;
          fieldProperties.questionId = field._id;
          fieldProperties.iconUrl = IMAGE_URL + "/pencil-sharp.png";
          if (
            field.questionType === "options" ||
            field.questionType === "checkbox"
          ) {
            fieldProperties.options = field.optionValue.map((item, i) => {
              let tempOption = { ...option };
              tempOption.title = item.optionText;
              tempOption.id = (i + 1).toString();
              return tempOption;
            });
          }
          return fieldProperties;
        });

        // 1st Screen for Safe card
        let safeScreen = { ...screen };
        safeScreen.title = "Safe";
        safeScreen.screenId = safeScreen.title + "_01";
        safeScreen.iconUrl = IMAGE_URL + "/ic_safe.png";
        safeScreen.properties = [
          projectProperties,
          siteProperties,
          locationProperties,
          savingRuleProperties,
          descriptionProperties,
          ...dynamicQuestionArray,
        ];
        safeScreen.buttons[0] = buttons;

        // 2st Screen for Unafe card
        let unsafeScreen = { ...screen };
        unsafeScreen.title = "Unsafe";
        unsafeScreen.iconUrl = IMAGE_URL + "/ic_unsafe.png";
        unsafeScreen.screenId = unsafeScreen.title + "_02";

        // 3st Screen for Defect Report
        let NCRScreen = { ...screen };
        NCRScreen.title = "NCR";
        NCRScreen.screenId = NCRScreen.title + "_03";
        NCRScreen.iconUrl = IMAGE_URL + "/ic_ncr.png";

        // 4st Screen for Report Incident
        let ReportIncidentScreen = { ...screen };
        ReportIncidentScreen.title = "Report Incident";
        ReportIncidentScreen.iconUrl = IMAGE_URL + "/ic_incident.png";
        ReportIncidentScreen.screenId = ReportIncidentScreen.title + "_04";

        // 5st Screen for Submit Feedback
        let submitFeedbackScreen = { ...screen };
        submitFeedbackScreen.title = "Submit Feedback";
        submitFeedbackScreen.iconUrl = IMAGE_URL + "/ic_feedback_reports.png";
        submitFeedbackScreen.screenId = submitFeedbackScreen.title + "_05";

        // 6st Screen for Log Activity
        let openShiftScreen = { ...screen };
        openShiftScreen.title = "Open Shift";
        openShiftScreen.iconUrl = IMAGE_URL + "/ic_shift.png";
        openShiftScreen.screenId = openShiftScreen.title + "_06";

        // 7st Screen for Expense Report
        let reportScreen = { ...screen };
        reportScreen.title = "Report";
        reportScreen.iconUrl = IMAGE_URL + "/ic_feedback_reports.png";
        reportScreen.screenId = reportScreen.title + "_07";

        // 8st Screen for Setting
        let settingScreen = { ...screen };
        settingScreen.title = "Setting";
        settingScreen.iconUrl = IMAGE_URL + "/ic_settings.png";
        settingScreen.screenId = settingScreen.title + "_08";

        let ConfigFile = { ...config };
        ConfigFile.username = user.fullName;
        ConfigFile.id = user._id;
        ConfigFile.screens = [
          safeScreen,
          unsafeScreen,
          NCRScreen,
          ReportIncidentScreen,
          submitFeedbackScreen,
          openShiftScreen,
          reportScreen,
          settingScreen,
        ];

        res.status(200).json(successResponse(ConfigFile, projectList));
      } else {
        return res.status(400).json({
          status: false,
          message: "User cannot access or no user exits",
        });
      }
    }
  } catch (error) {
    res.status(500).json(errorResponse(error.message));
  }
};
