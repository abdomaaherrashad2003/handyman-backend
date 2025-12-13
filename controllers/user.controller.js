exports.getProfile = async (req, res) => {
  res.json({
    id: req.params.id,
    name: 'Demo User'
  });
};

exports.updateProfile = async (req, res) => {
  res.json({
    message: 'Profile updated',
    data: req.body
  });
};
