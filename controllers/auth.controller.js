const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signToken } = require('../utils/jwtHelper');

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash: hash, role: 'user' });

    res.json({ user, token: signToken(user) });
  } catch (err) {
    console.error('REGISTER USER ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.registerWorker = async (req, res) => {
  try {
    const { name, email, password, phone, job_title, bio, location, experience_years } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hash = await bcrypt.hash(password, 10);
    const portfolio = req.files?.map(f => '/uploads/' + f.filename) || [];
    const worker = await User.create({
      name,
      email,
      phone,
      job_title,
      bio,
      location,
      experience_years,
      passwordHash: hash,
      role: 'worker',
      portfolio
    });

    res.json({ worker, token: signToken(worker) });
  } catch (err) {
    console.error('REGISTER WORKER ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Missing email or password' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({ user, token: signToken(user) });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
