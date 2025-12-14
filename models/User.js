const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  phone: String,

  role: {
    type: String,
    enum: ['user', 'worker'],
    required: true
  },

  // worker fields
  job_title: String,
  bio: String,
  location: String,
  experience_years: Number,
  portfolio: [String],

  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
