exports.createRoom = async (req, res) => {
  res.json({
    message: 'Chat room created (mock)',
    room_id: 'temp_room_id'
  });
};

exports.getMessages = async (req, res) => {
  res.json({
    room_id: req.params.room_id,
    messages: []
  });
};

exports.sendMessage = async (req, res) => {
  res.json({
    status: 'sent',
    data: req.body
  });
};
