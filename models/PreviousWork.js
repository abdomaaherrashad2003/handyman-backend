const mongoose = require('mongoose');

const previousWorkSchema = new mongoose.Schema({
  worker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  image: {
    type: String,
    required: true
  },

  title: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('PreviousWork', previousWorkSchema);