const express = require("express");
const routes = express.Router();
const { verifyToken } = require("../middlewares/auth.middleware");
const validator = require("../validators/auth.validator");
const authController = require("../controllers/auth.controller");

routes.post(
  "/login",
  validator.loginValidationRule(),
  validator.validate,
  authController.login
);

routes.patch(
  "/resetPassword/:id",
  validator.resetPassValidateRule(),
  validator.validate,
  authController.resetPassword
);

routes.get("/logout", verifyToken, authController.logout);

module.exports = routes;
