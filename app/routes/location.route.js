// library
const express = require("express");
const routes = express.Router();

// middleware
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

// controller
const locationController = require("../controllers/location.controller")

// create projects
routes.post("/create", verifyToken, validate, locationController.createLocation);

// get all locations
routes.get("/list", verifyToken, validate, locationController.getAllLocations);

module.exports = routes