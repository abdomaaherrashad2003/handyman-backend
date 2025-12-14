const mongoose = require('mongoose');
const { Schema } = mongoose;

// Chat Room Schema
const chatRoomSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  worker: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

// Message Schema
const messageSchema = new Schema({
  room: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = {
  ChatRoom: mongoose.model('ChatRoom', chatRoomSchema),
  Message: mongoose.model('Message', messageSchema)
};
