const User = require('../models/User');

/**
 * Get user profile by ID
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error('GET PROFILE ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Update logged-in user profile
 */
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; // من JWT
    const updates = req.body;

    const user = await User.findByIdAndUpdate(userId, updates, { new: true }).select('-passwordHash');
    res.json({ message: 'Profile updated', user });
  } catch (err) {
    console.error('UPDATE PROFILE ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
