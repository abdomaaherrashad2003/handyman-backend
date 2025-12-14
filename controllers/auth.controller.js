const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signToken } = require('../utils/jwtHelper');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    if (!email || !password || !name)
      return res.status(400).json({ message: 'Missing required fields' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      passwordHash: hash,
      role: 'user'
    });

    res.status(201).json({
      user,
      token: signToken(user)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.registerWorker = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);

    const worker = await User.create({
      ...req.body,
      passwordHash: hash,
      role: 'worker'
    });

    res.status(201).json({
      worker,
      token: signToken(worker)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok)
      return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      user,
      token: signToken(user)
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
