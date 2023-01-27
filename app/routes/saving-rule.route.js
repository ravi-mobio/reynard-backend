// library
const express = require("express");
const routes = express.Router();

// middleware
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// controller
const savingRulesController = require("../controllers/saving-rule.controller");

// create projects
routes.post(
  "/create",
  verifyToken,
  validate,
  savingRulesController.createSavingRules
);

// get all saving rules
routes.get("/list", verifyToken, validate, savingRulesController.getAllSavingRules);
module.exports = routes;
