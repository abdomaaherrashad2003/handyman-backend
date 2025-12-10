const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'ChatRoom' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Message', MessageSchema);
