const User = require('../models/User');
const uploadToCloudinary = require("../utils/uploadToCloudinary");
/**
 * Get user profile by ID
 */
exports.getProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
    const userId = req.user.id; // من JWT middleware
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true }
    ).select('-passwordHash');

    res.json({
      message: 'Profile updated',
      user
    });
  } catch (err) {
    console.error('UPDATE PROFILE ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.updateProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const imageUrl = await uploadToCloudinary(req.file);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        profileImage: imageUrl,
      },
      { new: true }
    );

    res.json({
      message: "Profile image updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

/**
 * Save FCM Token
 */
exports.saveFcmToken = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fcmToken } = req.body;

    if (!fcmToken) {
      return res.status(400).json({
        message: "FCM Token is required"
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { fcmToken },
      { new: true }
    ).select('-passwordHash');

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      message: "FCM Token saved successfully",
      fcmToken: user.fcmToken
    });

  } catch (error) {
    console.error("saveFcmToken error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};


// ===============================
// Upload Profile Image
// ===============================
exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: 'No image uploaded'
      });
    }

    const imageUrl = `/uploads/profiles/${req.file.filename}`;

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile image updated',
      profileImage: user.profileImage
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};