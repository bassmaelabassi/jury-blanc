const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
});

TaskSchema.statics.createTask = async function (data) {
  try {
    const task = new this(data);
    await task.save();
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};

TaskSchema.statics.getTasksByProject = async function (projectId) {
  try {
    return await this.find({ projectId });
  } catch (error) {
    throw new Error(error.message);
  }
};

TaskSchema.statics.getTaskById = async function (id) {
  try {
    const task = await this.findById(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};

TaskSchema.statics.updateTask = async function (id, data) {
  try {
    const task = await this.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};

TaskSchema.statics.deleteTask = async function (id) {
  try {
    const task = await this.findByIdAndDelete(id);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model('Task', TaskSchema);
