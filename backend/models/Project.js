const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
});

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;
