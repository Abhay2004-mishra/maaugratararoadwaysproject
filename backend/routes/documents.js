const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Document = require('../models/Document');
const { protect } = require('../middleware/auth');

// Make sure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter (PDF and Images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png'];
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});

// @route   GET api/documents
// @desc    Get all company/challan documents
// @access  Public
router.get('/', async (req, res) => {
  try {
    const docs = await Document.find({}).sort({ createdAt: -1 });
    res.json(docs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error retrieving documents' });
  }
});

// @route   POST api/documents/upload
// @desc    Upload document and save metadata
// @access  Private
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      // Clean up uploaded file if validation failed
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: 'Please provide a document title' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    // Create relative file URL for backend serving
    const fileUrl = `/uploads/${req.file.filename}`;
    const fileType = path.extname(req.file.originalname).replace('.', '').toLowerCase();

    const newDoc = await Document.create({
      title,
      description,
      fileUrl,
      fileType
    });

    res.status(201).json(newDoc);
  } catch (error) {
    console.error(error);
    // Clean up uploaded file in case of error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message || 'Server error during file upload' });
  }
});

// @route   DELETE api/documents/:id
// @desc    Delete document (and remove file from server)
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const doc = await Document.findById(req.params.id);
    if (!doc) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Get absolute path to the file
    const filePath = path.join(__dirname, '..', doc.fileUrl);

    // Remove file from server storage
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete document metadata from DB
    await Document.findByIdAndDelete(req.params.id);

    res.json({ message: 'Document deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting document' });
  }
});

module.exports = router;
