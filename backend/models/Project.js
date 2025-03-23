const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  budget: { type: Number, required: true },
});

ProjectSchema.statics.createProject = async function (data) {
  try {
    const project = new this(data);
    await project.save();
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

ProjectSchema.statics.getAllProjects = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

ProjectSchema.statics.getProjectById = async function (id) {
  try {
    const project = await this.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};


ProjectSchema.statics.updateProject = async function (id, data) {
  try {
    const project = await this.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

ProjectSchema.statics.deleteProject = async function (id) {
  try {
    const project = await this.findByIdAndDelete(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model('Project', ProjectSchema);
