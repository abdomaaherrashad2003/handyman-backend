const mongoose = require('mongoose');
const { Schema } = mongoose;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  slug: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);
