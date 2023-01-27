/* models */
const Site = require("../models/site.model");

/* create user */
exports.createSite = async (site) => {
  return await Site.create(site);
};

/* get all sites */
exports.getAllSites = async () => {
  return await Site.find();
};
