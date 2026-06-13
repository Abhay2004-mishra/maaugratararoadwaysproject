const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Truck name/identifier is required'],
    trim: true
  },
  capacity: {
    type: String,
    required: [true, 'Load capacity is required (e.g., 25 Tons)'],
    trim: true
  },
  type: {
    type: String,
    required: [true, 'Truck type is required (e.g., 10-Wheeler Open, Container)'],
    trim: true
  },
  routes: {
    type: [String],
    default: []
  },
  imageUrl: {
    type: String,
    required: [true, 'Truck image URL or path is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Truck', truckSchema);
