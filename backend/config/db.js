const mongoose = require('mongoose');
const autoSeed = require('./autoSeed');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/maaugratararoadways');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Auto seed database on connection
    await autoSeed();
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    // Do not call process.exit(1) to avoid crashing the server on startup in production
  }
};

module.exports = connectDB;
