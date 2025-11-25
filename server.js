// Load environment variables first
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// ========== MIDDLEWARE SETUP ==========
// CORS configuration - SIMPLIFIED VERSION
app.use(cors({
  origin: true, // Allow ALL origins in development
  credentials: true
}));

// JSON parsing
app.use(express.json());

// Request logging middleware - MUST be after CORS but before routes
app.use((req, res, next) => {
  console.log('=== INCOMING REQUEST ===');
  console.log('Time:', new Date().toISOString());
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Origin:', req.headers.origin);
  console.log('=======================');
  next();
});

// ========== ROUTES ==========
// Basic route - to test if server is working
app.get('/', (req, res) => {
  res.json({ message: 'Gusto Restaurant Backend is running!' });
});

// Auth routes
app.use('/api/auth', require('./routes/auth'));

// ========== DATABASE CONNECTION ==========
// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// ========== ERROR HANDLING ==========
// Error handling middleware - place this AFTER your routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!' 
  });
});

// Handle 404 routes - FIXED VERSION
// This catches any route that doesn't match the ones above
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

// ========== START SERVER ==========
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});