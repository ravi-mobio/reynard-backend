const mongoose = require("mongoose");

const Project = new mongoose.Schema({
  title: {
    type: String,
  }
},
{ timestamps: true }
);

module.exports = mongoose.model("project", Project);