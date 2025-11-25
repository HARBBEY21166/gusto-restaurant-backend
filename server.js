// Load environment variables first
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Create Express app
const app = express();

// Middleware - these are like helpers that process requests
// app.use(cors()); 
app.use(cors({
  origin: [
    'https://9000-firebase-studio-1763629194173.cluster-lu4mup47g5gm4rtyvhzpwbfadi.cloudworkstations.dev',
    'https://gusto-lime.vercel.app',
    'http://localhost:3000' // For local development
  ],
  credentials: true
})); // Allow frontend to connect

app.use(express.json()); // Let server understand JSON data

// Basic route - to test if server is working
app.get('/', (req, res) => {
  res.json({ message: 'Gusto Restaurant Backend is running!' });
});

// Routes
app.use('/api/auth', require('./routes/auth'));

// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

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

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});