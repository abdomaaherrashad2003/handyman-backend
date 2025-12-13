const User = require('../models/User');

exports.getAll = async (req, res) => {
  const workers = await User.find({ role: 'worker' });
  res.json(workers);
};

exports.getById = async (req, res) => {
  const worker = await User.findById(req.params.id);
  res.json(worker);
};
