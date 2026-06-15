const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: {
    type: String,
    unique: true,
    required: true
  },
rating: {
  type: Number,
  default: 0
},

ratingCount: {
  type: Number,
  default: 0
},
  passwordHash: {
    type: String,
    required: true
  },

  phone: String,

  role: {
    type: String,
    enum: ['user', 'worker'],
    required: true
  },

  profileImage: {
    type: String,
    default: ""
  },

  fcmToken: {
    type: String,
    default: ""
  },

  job_title: String,
  bio: String,
  location: String,
  experience_years: Number,

  serviceCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  },

  previousWorks: [
    {
      image: String,
      description: String
    }
  ],

  portfolio: [String],

  rating: {
    type: Number,
    default: 0
  },

  ratingsCount: {
    type: Number,
    default: 0
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);