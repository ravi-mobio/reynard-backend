// library
const express = require("express");
const routes = express.Router();

// middleware
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// controller
const configController = require("../controllers/config.controller");

// config file
routes.get(
  "/file",
  verifyToken,
  validate,
  configController.createCongifFile
);

module.exports = routes;
