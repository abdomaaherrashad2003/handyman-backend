const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  icon: {
    type: String, // optional (emoji or image url)
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model('ServiceCategory', serviceCategorySchema);