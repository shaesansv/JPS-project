const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Upload images (Admin only)
router.post('/images', authMiddleware, upload.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: { message: 'No files uploaded' }
      });
    }

    const fileUrls = req.files.map(file => `/uploads/${file.filename}`);

    // TODO: Upload to Cloudinary if configured
    // const cloudinaryUrls = await uploadToCloudinary(req.files);

    res.json({
      success: true,
      data: {
        urls: fileUrls
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: { message: error.message }
    });
  }
});

module.exports = router;
