// library
const express = require("express");
const routes = express.Router();

// middleware
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");
const validator = require("../validators/form-builder.validator");

// controller
const formbuilderController = require("../controllers/form-builder.controller");

routes.post(
  "/create",
  verifyToken,
  validate,
  validator.formbuilderValidationRule(),
  formbuilderController.create
);
routes.get("/list", verifyToken, validate, formbuilderController.list);
routes.delete(
  "/delete/:id",
  verifyToken,
  validate,
  formbuilderController.deleteQuestion
);

module.exports = routes;
