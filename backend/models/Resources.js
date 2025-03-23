const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  quantity: { type: Number, required: true },
  supplier: { type: String, required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
});

ResourceSchema.statics.createResource = async function (data) {
  try {
    const resource = new this(data);
    await resource.save();
    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
};

ResourceSchema.statics.getResourcesByTask = async function (taskId) {
  try {
    return await this.find({ taskId });
  } catch (error) {
    throw new Error(error.message);
  }
};

ResourceSchema.statics.getResourceById = async function (id) {
  try {
    const resource = await this.findById(id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
};

ResourceSchema.statics.updateResource = async function (id, data) {
  try {
    const resource = await this.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
};

ResourceSchema.statics.deleteResource = async function (id) {
  try {
    const resource = await this.findByIdAndDelete(id);
    if (!resource) {
      throw new Error('Resource not found');
    }
    return resource;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = mongoose.model('Resource', ResourceSchema);
