const express = require("express");
const routes = express.Router();

const { createUserValidationRule } = require("../validators/user.validator");
const { validate } = require("../middlewares/validate.middleware");
const userController = require("../controllers/user.controller");

routes.post(
  "/create-user",
  createUserValidationRule(),
  validate,
  userController.create
);


module.exports = routes;