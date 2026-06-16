const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { protect } = require('../middleware/auth');

// @route   POST api/leads
// @desc    Submit an inquiry form / request a quote
// @access  Public
router.post('/', async (req, res) => {
  const { name, phone, email, source, destination, materialType, weight, message } = req.body;

  if (!name || !phone || !source || !destination || !materialType) {
    return res.status(400).json({ message: 'Please provide all required fields (Name, Phone, Source, Destination, Material Type)' });
  }

  try {
    const newLead = await Lead.create({
      name,
      phone,
      email,
      source,
      destination,
      materialType,
      weight,
      message
    });
    res.status(201).json({ success: true, data: newLead });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error while submitting inquiry', 
      error: error.message 
    });
  }
});

// @route   GET api/leads
// @desc    Retrieve all inquiries / leads
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving leads' });
  }
});

// @route   PUT api/leads/:id
// @desc    Update a lead status (e.g. Completed, Contacted)
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    const updatedLead = await Lead.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json(updatedLead);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating lead status' });
  }
});

// @route   DELETE api/leads/:id
// @desc    Remove a lead entry
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting lead' });
  }
});

module.exports = router;
