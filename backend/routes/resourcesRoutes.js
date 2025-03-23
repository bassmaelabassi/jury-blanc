const express = require('express');
const Resource = require('../models/Resource');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const resource = await Resource.createResource(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/task/:taskId', async (req, res) => {
  try {
    const resources = await Resource.getResourcesByTask(req.params.taskId);
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.getResourceById(req.params.id);
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const resource = await Resource.updateResource(req.params.id, req.body);
    res.status(200).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Resource.deleteResource(req.params.id);
    res.status(200).json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
