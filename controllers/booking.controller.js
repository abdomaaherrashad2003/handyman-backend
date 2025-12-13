exports.create = async (req, res) => {
  res.json({
    message: 'Booking created (mock)',
    data: req.body
  });
};

exports.byUser = async (req, res) => {
  res.json({
    user_id: req.params.id,
    bookings: []
  });
};

exports.byWorker = async (req, res) => {
  res.json({
    worker_id: req.params.id,
    bookings: []
  });
};
