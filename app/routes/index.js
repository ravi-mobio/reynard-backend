const baseRoute = "/api";

module.exports = (app) => {
  app.use(`${baseRoute}/auth`, require("./auth.route"));
  app.use(`${baseRoute}/users`, require("./user.route"));
  app.use(`${baseRoute}/project`, require("./project.route"));
  app.use(`${baseRoute}/site`, require("./site.route"));
  app.use(`${baseRoute}/location`, require("./location.route"));
  app.use(`${baseRoute}/saving-rule`, require("./saving-rule.route"));
  app.use(`${baseRoute}/config`, require("./config.route"));
  app.use(`${baseRoute}/safety-card`, require("./safety-card.route"));
  app.use(`${baseRoute}/form-builder`, require("./form-builder.route"));
};
