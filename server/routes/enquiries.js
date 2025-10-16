const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const authMiddleware = require('../middleware/auth');

// Get all enquiries (Admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { status, limit, skip } = req.query;
    
    let query = {};
    if (status) query.status = status;

    const enquiries = await Enquiry.find(query)
      .populate('property', 'title slug price location')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) || 0)
      .skip(parseInt(skip) || 0);

    const total = await Enquiry.countDocuments(query);

    res.json({
      success: true,
      data: {
        enquiries,
        total
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Create enquiry (Public)
router.post('/', async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    await enquiry.populate('property', 'title slug price location');

    // TODO: Send WhatsApp notification here
    // TODO: Send email notification here
    
    res.status(201).json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Update enquiry (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('property', 'title slug price location');

    if (!enquiry) {
      return res.status(404).json({ 
        success: false, 
        error: { message: 'Enquiry not found' }
      });
    }

    res.json({
      success: true,
      data: enquiry
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Delete enquiry (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ 
        success: false, 
        error: { message: 'Enquiry not found' }
      });
    }

    res.json({
      success: true,
      data: { message: 'Enquiry deleted successfully' }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

module.exports = router;
