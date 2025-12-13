const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  passwordHash: String,
  phone: String,
  role: { type: String, enum: ['user', 'worker'] },
  job_title: String,
  bio: String,
  location: String,
  experience_years: Number,
  portfolio: [String],
  rating: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
