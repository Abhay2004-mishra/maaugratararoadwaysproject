require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: '*', // For development, allow any origin. In production, restrict to frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/leads', require('./routes/leads'));
app.use('/api/trucks', require('./routes/trucks'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/documents', require('./routes/documents'));

// Root API Endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Maa Ugra Tara Roadways API',
    version: '1.0.0',
    documentation: 'Use appropriate /api/... endpoints to interact with backend services.'
  });
});

// Detailed Health Check Endpoint
app.get('/api/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected';
  
  if (dbStatus !== 'Connected') {
    return res.status(500).json({
      success: false,
      status: 'ERROR',
      message: 'Maa Ugra Tara Roadways API is active but Database is not connected',
      database: dbStatus,
      timestamp: new Date()
    });
  }
  
  res.json({
    success: true,
    status: 'OK',
    message: 'Maa Ugra Tara Roadways API is active and fully functional',
    database: dbStatus,
    timestamp: new Date()
  });
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `API Endpoint not found: ${req.method} ${req.originalUrl}`
  });
});

// General Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Server encountered an unexpected error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
