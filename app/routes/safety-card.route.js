const express = require("express");
const routes = express.Router();
const validator = require("../validators/safety-card.validator");
const safetyCard = require("../controllers/safety-card.controller");
// middleware
const { verifyToken } = require("../middlewares/auth.middleware");
const { validate } = require("../middlewares/validate.middleware");

routes.post("/create", verifyToken, validate, validator.safetyCardValidationRule(), safetyCard.createSafetyCard);
routes.put("/update/:id", verifyToken, validate, safetyCard.updateSafetyCard);
routes.get("/cardlist", verifyToken, validate, safetyCard.getAllSafetyCard);
routes.get("/card/:id", safetyCard.getSafetyCardById);
routes.delete("/delete/:id", safetyCard.deleteSafetyCard);

module.exports = routes;