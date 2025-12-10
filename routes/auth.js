const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

const User = require('../models/User');
const { signToken } = require('../utils/jwtHelper');

// multer
const upload = multer({ dest: path.join(__dirname, '../uploads/') });

// register user
router.post('/register-user', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash: hash, phone, role: 'user' });

    const token = signToken(user);
    res.json({ user: { id: user._id, name: user.name, role: user.role, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// register worker
router.post('/register-worker', upload.array('portfolio', 6), async (req, res) => {
  try {
    const { name, email, password, phone, job_title, bio, location, experience_years } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'Missing fields' });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    const hash = await bcrypt.hash(password, 10);
    const portfolio = (req.files || []).map(f => '/uploads/' + path.basename(f.path));

    const worker = await User.create({
      name, email, passwordHash: hash, phone, role: 'worker', job_title, bio, location, experience_years: Number(experience_years || 0), portfolio
    });

    const token = signToken(worker);
    res.json({ worker: { id: worker._id, name: worker.name, role: worker.role, email: worker.email, job_title: worker.job_title }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });

    const token = signToken(user);
    res.json({ user: { id: user._id, name: user.name, role: user.role, email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
