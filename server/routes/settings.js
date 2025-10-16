const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const authMiddleware = require('../middleware/auth');

// Get all settings
router.get('/', async (req, res) => {
  try {
    const settings = await Setting.find();
    const settingsObject = {};
    settings.forEach(setting => {
      settingsObject[setting.key] = setting.value;
    });

    res.json({
      success: true,
      data: settingsObject
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Update settings (Admin only)
router.put('/', authMiddleware, async (req, res) => {
  try {
    const settingsData = req.body;

    for (const [key, value] of Object.entries(settingsData)) {
      await Setting.findOneAndUpdate(
        { key },
        { key, value, type: typeof value },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      data: settingsData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

module.exports = router;
