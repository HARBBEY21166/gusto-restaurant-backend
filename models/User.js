const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define what a user looks like in our database
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Hash password before saving user - FIXED VERSION
userSchema.pre('save', async function(next) {
  try {
    // Only hash the password if it's modified (or new)
    if (!this.isModified('password')) return next();
    
    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check if password is correct
userSchema.methods.correctPassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;