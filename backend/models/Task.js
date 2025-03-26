const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
  },
  resources: {
    type: String,
    required: true
  },
  projectId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Project", 
    required: true 
  },
});

taskSchema.statics.createTask = async function(taskData) {
  try {
    const task = new this(taskData);
    await task.save();
    return task;
  } catch (error) {
    throw error;
  }
};

taskSchema.statics.getTasksByProject = async function(projectId) {
  try {
    return await this.find({ projectId }).exec();
  } catch (error) {
    throw error;
  }
};

taskSchema.statics.getTaskById = async function(taskId) {
  try {
    return await this.findById(taskId).exec();
  } catch (error) {
    throw error;
  }
};

taskSchema.statics.updateTask = async function(taskId, updateData) {
  try {
    return await this.findByIdAndUpdate(taskId, updateData, { 
      new: true,
      runValidators: true 
    }).exec();
  } catch (error) {
    throw error;
  }
};

taskSchema.statics.deleteTask = async function(taskId) {
  try {
    return await this.findByIdAndDelete(taskId).exec();
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Task", taskSchema);