const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const authMiddleware = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    // Accept either username or email for login (frontend may send email)
    const { username, email, password } = req.body;

    if (!password || (!username && !email)) {
      return res.status(400).json({
        success: false,
        error: { message: 'Username/email and password are required' }
      });
    }

    // Find user by username or email
    let user = null;
    if (username) user = await AdminUser.findOne({ username });
    if (!user && email) user = await AdminUser.findOne({ email });

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        error: { message: 'Invalid credentials' }
      });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ 
        success: false, 
        error: { message: 'Invalid credentials' }
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

// Get current user
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await AdminUser.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        error: { message: 'User not found' }
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

module.exports = router;
