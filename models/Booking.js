const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  date: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  description: String,

  problemImage: {
    type: String,
    default: ""
  },

  status: {
    type: String,
    enum: [
      'pending',
      'accepted',
      'rejected',
      'completed'
    ],
    default: 'pending'
  }

}, { timestamps: true });

bookingSchema.index(
  { worker: 1, date: 1, time: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  'Booking',
  bookingSchema
);