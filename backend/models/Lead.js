const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  source: {
    type: String,
    required: [true, 'Source city is required'],
    trim: true
  },
  destination: {
    type: String,
    required: [true, 'Destination city is required'],
    trim: true
  },
  materialType: {
    type: String,
    required: [true, 'Material type is required'],
    trim: true
  },
  weight: {
    type: String,
    trim: true
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Completed', 'Cancelled'],
    default: 'New'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Lead', leadSchema);
