/* models */
const Project = require("../models/project.model");

/* create project */
exports.createProject = async (project) => {
  return await Project.create(project);
};

/* get all projects */
exports.getAllProjects = async () => {
  return await Project.find();
};
