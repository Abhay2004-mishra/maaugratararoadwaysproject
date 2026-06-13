const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const { protect } = require('../middleware/auth');

// @route   GET api/testimonials
// @desc    Get all testimonials
// @access  Public
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({}).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving testimonials' });
  }
});

// @route   POST api/testimonials
// @desc    Add a testimonial
// @access  Private
router.post('/', protect, async (req, res) => {
  const { clientName, companyName, feedback, rating } = req.body;

  if (!clientName || !feedback) {
    return res.status(400).json({ message: 'Please provide Client Name and Feedback text' });
  }

  try {
    const newTestimonial = await Testimonial.create({
      clientName,
      companyName,
      feedback,
      rating: rating || 5
    });
    res.status(201).json(newTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error adding testimonial' });
  }
});

// @route   PUT api/testimonials/:id
// @desc    Update a testimonial
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { clientName, companyName, feedback, rating } = req.body;

  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    if (clientName) testimonial.clientName = clientName;
    if (companyName) testimonial.companyName = companyName;
    if (feedback) testimonial.feedback = feedback;
    if (rating !== undefined) testimonial.rating = rating;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating testimonial' });
  }
});

// @route   DELETE api/testimonials/:id
// @desc    Delete a testimonial
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting testimonial' });
  }
});

module.exports = router;
