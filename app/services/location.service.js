/* models */
const Location = require("../models/location.model");

/* create user */
exports.createLocation = async (location) => {
  return await Location.create(location);
};

/* get all projects */
exports.getAllLocation = async () => {
  return await Location.find();
};
