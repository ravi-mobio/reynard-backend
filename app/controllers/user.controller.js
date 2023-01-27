/* packages */
const bcrypt = require("bcryptjs");
const randomId = require("rand-token").uid;

// services
const userService = require("../services/user.service");
const { sendMailer } = require("../utils/mailer.utils");
const { successResponse, errorResponse } = require("../utils/response.utils");
const constants = require("../utils/constants.utils");
const logService = require("../services/log.service");

/* create new user */
exports.create = async (req, res) => {
  let reqData = req.body;
  reqData.fullName = reqData.firstName + " " + reqData.lastName;
  // const userId = req.userData._id;
  const userId = "63c79ea5a16a220af8347d14";
  try {
    reqData.createdBy = userId;

    const isAlreadyExist = await userService.getByEmail(reqData.email);

    if (isAlreadyExist) {
      return res.status(401).json(errorResponse(constants.EMAIL_ALREADY_EXIST));
    }

    /* 10 min expire time */
    reqData.resetExpiresIn = new Date(Date.now() + parseInt(24 * 3600 * 1000));
    /* generate random token */
    reqData.resetToken = randomId(16);

    //passwing password as null
    reqData.password = bcrypt.hashSync(reqData.password);

    const createdUser = await userService.createUser(reqData);

    // const email = reqData.email;
    // /* subject of the create new password */
    // const subject = "Create New Password";
    // /* set password front end url */
    // const urlLink = `${process.env.FRONT_URL}/authentication/reset-password/${createdUser._id}/${reqData.resetToken}`;
    // /* new password template */
    // const template = require("../../email_template/new-password-create");
    // /* it will send new password generate link mail */
    // await sendMailer(email, subject, template, urlLink);

    if (createdUser) {
      /* Log success data */
      let logData = {
        module: "user",
        userId: createdUser._id,
        actionType: "create",
        responseMsg: constants.USER_CREATE,
        requestData: reqData,
        responseData: successResponse(constants.USER_CREATE, createdUser),
        statusCode: 200,
        createdBy: userId,
      };

      await logService.createLog(logData);

      return res
        .status(200)
        .json(successResponse(constants.USER_CREATE, createdUser));
    }
  } catch (err) {
    if (err.message) {
      /* log error data */
      let logData = {
        module: "user",
        actionType: "create",
        responseMsg: err.message,
        errorMsg: constants.SOMETHING_WENT_WRONG,
        responseData: errorResponse(constants.SOMETHING_WENT_WRONG, {
          message: err.message,
        }),
        requestData: reqData,
        statusCode: 500,
        createdBy: userId,
      };

      await logService.createLog(logData);
    }
    return res.status(500).json(
      errorResponse(constants.SOMETHING_WENT_WRONG, {
        message: err.message,
      })
    );
  }
};
