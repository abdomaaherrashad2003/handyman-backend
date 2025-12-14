const Notification = require('../models/Notification');

/**
 * Get all notifications for logged-in user
 */
exports.getAll = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    console.error('GET NOTIFICATIONS ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Mark a notification as read
 */
exports.markRead = async (req, res) => {
  try {
    const { notification_id } = req.body;

    if (!notification_id) return res.status(400).json({ message: 'Missing notification_id' });

    const notification = await Notification.findByIdAndUpdate(
      notification_id,
      { read: true },
      { new: true }
    );

    if (!notification) return res.status(404).json({ message: 'Notification not found' });

    res.json({
      message: 'Notification marked as read',
      notification
    });
  } catch (err) {
    console.error('MARK NOTIFICATION READ ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
