const express = require('express');
const router = express.Router();
const Property = require('../models/Property');
const authMiddleware = require('../middleware/auth');

// Get all properties (with filters)
router.get('/', async (req, res) => {
  try {
    const { category, search, available, limit, skip } = req.query;
    
    let query = {};
    
    if (category) {
      const Category = require('../models/Category');
      const cat = await Category.findOne({ slug: category });
      if (cat) query.category = cat._id;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (available !== undefined) {
      query.status = available === 'true' ? 'available' : { $ne: 'available' };
    }

    const properties = await Property.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit) || 0)
      .skip(parseInt(skip) || 0);

    const total = await Property.countDocuments(query);

    res.json({
      success: true,
      data: {
        properties,
        total,
        page: Math.floor((parseInt(skip) || 0) / (parseInt(limit) || 10)) + 1,
        pages: Math.ceil(total / (parseInt(limit) || 10))
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Get single property
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id)
      .populate('category', 'name slug');

    if (!property) {
      return res.status(404).json({ 
        success: false, 
        error: { message: 'Property not found' }
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Create property (Admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    await property.populate('category', 'name slug');
    
    res.status(201).json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Update property (Admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('category', 'name slug');

    if (!property) {
      return res.status(404).json({ 
        success: false, 
        error: { message: 'Property not found' }
      });
    }

    res.json({
      success: true,
      data: property
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Delete property (Admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ 
        success: false, 
        error: { message: 'Property not found' }
      });
    }

    res.json({
      success: true,
      data: { message: 'Property deleted successfully' }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

module.exports = router;
