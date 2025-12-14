const User = require('../models/User');

/**
 * Get all workers
 */
exports.getAll = async (req, res) => {
  try {
    const workers = await User.find({ role: 'worker' })
      .select('-passwordHash'); // بدون كلمة المرور
    res.json(workers);
  } catch (err) {
    console.error('GET WORKERS ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get worker by ID
 */
exports.getById = async (req, res) => {
  try {
    const worker = await User.findById(req.params.id).select('-passwordHash');
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    res.json(worker);
  } catch (err) {
    console.error('GET WORKER BY ID ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
