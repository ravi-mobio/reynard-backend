// library
const express = require("express");
const routes = express.Router();

// middleware
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// controller
const projectController = require("../controllers/project.controller")

// create projects
routes.post("/create", verifyToken, validate, projectController.createProject);

// get all projects
routes.get("/list", verifyToken, validate, projectController.getAllProjects);

module.exports = routes