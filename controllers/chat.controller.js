const { ChatRoom, Message } = require('../models/ChatRoom');

/**
 * Create Chat Room
 */
exports.createRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { worker_id } = req.body;

    if (!worker_id) return res.status(400).json({ message: 'Missing worker_id' });

    // تحقق لو Room موجود مسبقًا
    let room = await ChatRoom.findOne({ user: userId, worker: worker_id });
    if (!room) {
      room = await ChatRoom.create({ user: userId, worker: worker_id });
    }

    res.status(201).json({
      message: 'Chat room created',
      room
    });
  } catch (err) {
    console.error('CREATE CHAT ROOM ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get messages for a room
 */
exports.getMessages = async (req, res) => {
  try {
    const { room_id } = req.params;

    const messages = await Message.find({ room: room_id })
      .populate('sender', 'name role')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (err) {
    console.error('GET MESSAGES ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Send Message
 */
exports.sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const { room_id, message } = req.body;

    if (!room_id || !message) {
      return res.status(400).json({ message: 'Missing room_id or message' });
    }

    const newMessage = await Message.create({
      room: room_id,
      sender,
      message
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error('SEND MESSAGE ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
