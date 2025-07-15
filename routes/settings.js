const express = require('express');
const router = express.Router();
const Settings = require('../db/models/Settings');

// GET current settings
router.get('/', async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST update settings
router.post('/', async (req, res) => {
  const updatedData = req.body;
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(updatedData);
    } else {
      Object.assign(settings, updatedData);
    }
    await settings.save();
    res.json({ message: 'Settings updated', settings });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
