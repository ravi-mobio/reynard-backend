require("dotenv").config();
const bcrypt = require("bcryptjs");
const randomId = require("rand-token").uid;

// services
const userService = require("../services/auth.service");

// Utils
const constantUtils = require("../utils/constants.utils");
const responseUtils = require("../utils/response.utils");

// Middleware
const authMiddleware = require("../middlewares/auth.middleware");

// Users Login
// Post Request ==> api/auth/login
exports.login = async (req, res) => {
  try {
    let { email, password, requestedRole } = req.body;
    let isExists = await userService.getUserByEmail(email.toLowerCase());
    if (!isExists) {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.USER_NOT_REGISTERED));
    }
    let payload = {};

    // checking if the requestedrole is exist in the requested credentials
    if (!isExists.role.includes(requestedRole)) {
      return res
        .status(400)
        .json(
          responseUtils.errorResponse(constantUtils.UNAUTHORIZED_ROLE_REQUESTED)
        );
    }

    // Checking if password field is not exist in DB
    if (!isExists.password) {
      return res
        .status(400)
        .json(
          responseUtils.errorResponse(constantUtils.NO_PASSWORD_FIELD_EXISTS)
        );
    }

    // Using bcrypt library to compare hashPassword with incoming password
    let isMatch = bcrypt.compareSync(password, isExists.password);
    if (!isMatch) {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.PASSWORD_INCORRECT));
    }

    // Passing payload as userId to generate token.
    let token = await authMiddleware.assignToken(isExists);
    // Get user detail By Id
    let user = await userService.getUserById(isExists._id);
    payload.token = token;
    payload.user = user;
    res
      .status(200)
      .json(
        responseUtils.successResponse(constantUtils.USER_LOGIN, { payload })
      );
  } catch (err) {
    res.status(500).json(responseUtils.errorResponse(err.message));
  }
};

// Reset Password
// Patch Request ==> api/auth/resetPassword/:id
exports.resetPassword = async (req, res) => {
  try {
    let id = req.params.id;
    let { newPassword, conformPassword } = req.body;
    let user = await userService.getUserById(id);
    if (user.resetToken === "") {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.PASSWORD_LINK_EXPIRED));
    }
    let expiryTime = new Date(user.resetExpiresIn).getTime();
    // Checking compare currentTime with resetExpiry.
    if (Date.now() > expiryTime) {
      return res
        .status(400)
        .json(responseUtils.errorResponse(constantUtils.PASSWORD_LINK_EXPIRED));
    }
    if (newPassword !== conformPassword) {
      return res
        .status(400)
        .json(
          responseUtils.errorResponse(constantUtils.PASWORD_DOES_NOT_MATCH)
        );
    }
    // Using bcrypt library to hashing conformPassword.
    let hashPass = bcrypt.hashSync(conformPassword);
    await userService.updatePasswordById(id, hashPass);
    res
      .status(201)
      .json(
        responseUtils.successResponse(constantUtils.PASSWORD_RESET_SUCCESSFULLY)
      );
  } catch (err) {
    res.status(500).json(responseUtils.errorResponse(err.message));
  }
};

// Logout
// Get Request ==> /api/auth/logout
exports.logout = async (req, res) => {
  try {
    req.userData = null;
    res
      .status(200)
      .json(responseUtils.successResponse(constantUtils.LOGOUT_SUCCESS));
  } catch (err) {
    res.status(500).json(responseUtils.errorResponse(err.message));
  }
};
