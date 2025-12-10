const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  phone: String,
  role: { type: String, enum: ['user','worker','admin'], default: 'user' },
  job_title: String,
  bio: String,
  location: String,
  experience_years: Number,
  portfolio: [String],
  rating: { type: Number, default: 0 },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
