const { ChatRoom, Message } = require('../models/ChatRoom');
const User = require('../models/User');

const { sendNotification } = require('../utils/sendNotification');

/**
 * Create Chat Room
 */
exports.createRoom = async (req, res) => {
  try {
    const userId = req.user.id;
    const { worker_id } = req.body;

    if (!worker_id) {
      return res.status(400).json({ message: 'Missing worker_id' });
    }

    // تحقق لو room موجود مسبقًا
    let room = await ChatRoom.findOne({
      user: userId,
      worker: worker_id
    });

    if (!room) {
      room = await ChatRoom.create({
        user: userId,
        worker: worker_id
      });
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
 * Send Message + Notification
 */
exports.sendMessage = async (req, res) => {
  try {
    const sender = req.user.id;
    const { room_id, message } = req.body;

    if (!room_id || !message) {
      return res.status(400).json({
        message: 'Missing room_id or message'
      });
    }

    // 1. Save message
    const newMessage = await Message.create({
      room: room_id,
      sender,
      message
    });

    // 2. Get chat room
    const room = await ChatRoom.findById(room_id);

    if (!room) {
      return res.status(404).json({
        message: 'Chat room not found'
      });
    }

    // 3. Determine receiver
    let receiverId =
      room.user.toString() === sender
        ? room.worker
        : room.user;

    // 4. Find receiver (User or Worker)
    let receiver =
      (await User.findById(receiverId)) ||
      (await Worker.findById(receiverId));

    // 5. Send notification
    if (receiver?.fcmToken) {
      await sendNotification(
        receiver.fcmToken,
        'New Message 💬',
        message,
        {
          type: 'NEW_MESSAGE',
          roomId: room_id,
          senderId: sender.toString()
        }
      );
    }

    res.status(201).json(newMessage);

  } catch (err) {
    console.error('SEND MESSAGE ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};