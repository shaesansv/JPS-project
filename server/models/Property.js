const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  area: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  photos: [{
    type: String
  }],
  youtubeUrl: String,
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available'
  },
  featured: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
