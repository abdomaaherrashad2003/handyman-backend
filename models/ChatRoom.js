const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatRoomSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  worker: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
