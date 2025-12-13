exports.getAll = async (req, res) => {
  res.json({
    user_id: req.params.user_id,
    notifications: []
  });
};

exports.markRead = async (req, res) => {
  res.json({
    message: 'Notification marked as read',
    id: req.body.notification_id
  });
};
