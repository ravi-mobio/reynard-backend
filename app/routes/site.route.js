// library
const express = require("express");
const routes = express.Router();

// middleware
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// controller
const siteController = require("../controllers/site.controller");

// create projects
routes.post("/create", verifyToken, validate, siteController.createSite);

// get all sites
routes.get("/list", verifyToken, validate, siteController.getAllSites);

module.exports = routes;
