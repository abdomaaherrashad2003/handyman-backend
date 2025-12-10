const mongoose = require('mongoose');
const { Schema } = mongoose;

const ServiceSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  slug: String
});

module.exports = mongoose.model('Service', ServiceSchema);
