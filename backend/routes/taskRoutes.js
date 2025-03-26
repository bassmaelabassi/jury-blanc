const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const requiredFields = ['name', 'description', 'startDate', 'endDate', 'resources', 'projectId'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.projectId)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const task = await Task.createTask({
      ...req.body,
      projectId: new mongoose.Types.ObjectId(req.body.projectId)
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ 
      message: error.message,
      errors: error.errors 
    });
  }
});

router.get('/project/:projectId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.projectId)) {
      return res.status(400).json({ message: 'Invalid project ID format' });
    }

    const tasks = await Task.getTasksByProject(req.params.projectId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ 
      message: 'Failed to update task' , error
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.deleteTask(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;