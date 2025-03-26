const express = require('express');
const Resource = require('../models/Resource');
const router = express.Router();
const mongoose = require('mongoose')

router.post('/', async (req, res) => {
  try {
    const requiredFields = ['title', 'type', 'quantity', 'description', 'supplier', 'taskId'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    if (!mongoose.Types.ObjectId.isValid(req.body.taskId)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const resource = await Resource.createResource({
      ...req.body,
      taskId: new mongoose.Types.ObjectId(req.body.taskId)
    });

    res.status(201).json(resource);
  } catch (error) {
    console.error('Error creating resource:', error);
    res.status(400).json({ 
      message: error.message,
      errors: error.errors 
    });
  }
});

router.get('/task/:taskId', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.taskId)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    const resources = await Resource.getResourcesByTask(req.params.taskId);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.getResourceById(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, 
        runValidators: true 
      }
    );
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    res.status(200).json(resource);
  } catch (error) {
    res.status(400).json({ 
      message: 'Failed to update resource' , error
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const resource = await Resource.deleteResource(req.params.id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
