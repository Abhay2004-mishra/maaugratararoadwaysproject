const express = require('express');
const router = express.Router();
const Truck = require('../models/Truck');
const { protect } = require('../middleware/auth');

// @route   GET api/trucks
// @desc    Retrieve all trucks in fleet
// @access  Public
router.get('/', async (req, res) => {
  try {
    const trucks = await Truck.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(trucks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving fleet' });
  }
});

// @route   POST api/trucks
// @desc    Add a new truck to fleet
// @access  Private
router.post('/', protect, async (req, res) => {
  const { name, capacity, type, routes, imageUrl, isActive } = req.body;

  if (!name || !capacity || !type || !imageUrl) {
    return res.status(400).json({ message: 'Please provide Name, Capacity, Type, and Image URL' });
  }

  try {
    const newTruck = await Truck.create({
      name,
      capacity,
      type,
      routes: Array.isArray(routes) ? routes : routes ? routes.split(',').map(r => r.trim()) : [],
      imageUrl,
      isActive: isActive !== undefined ? isActive : true
    });
    res.status(201).json(newTruck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding truck to fleet' });
  }
});

// @route   PUT api/trucks/:id
// @desc    Update truck details
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { name, capacity, type, routes, imageUrl, isActive } = req.body;

  try {
    const truck = await Truck.findById(req.params.id);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }

    if (name) truck.name = name;
    if (capacity) truck.capacity = capacity;
    if (type) truck.type = type;
    if (imageUrl) truck.imageUrl = imageUrl;
    if (isActive !== undefined) truck.isActive = isActive;
    if (routes) {
      truck.routes = Array.isArray(routes) ? routes : routes.split(',').map(r => r.trim());
    }

    const updatedTruck = await truck.save();
    res.json(updatedTruck);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating truck' });
  }
});

// @route   DELETE api/trucks/:id
// @desc    Delete a truck
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const truck = await Truck.findByIdAndDelete(req.params.id);
    if (!truck) {
      return res.status(404).json({ message: 'Truck not found' });
    }
    res.json({ message: 'Truck removed from fleet successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting truck' });
  }
});

module.exports = router;
