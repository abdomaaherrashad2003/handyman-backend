const mongoose = require('mongoose');
const { Schema } = mongoose;

const BookingSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  worker: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: String,
  status: { type: String, enum: ['pending','accepted','rejected','completed'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
