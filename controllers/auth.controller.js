const bcrypt = require('bcrypt');
const User = require('../models/User');
const { signToken } = require('../utils/jwtHelper');

exports.registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, phone, passwordHash: hash, role: 'user' });
  res.json({ user, token: signToken(user) });
};

exports.registerWorker = async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const portfolio = req.files?.map(f => '/uploads/' + f.filename);
  const worker = await User.create({
    ...req.body,
    passwordHash: hash,
    role: 'worker',
    portfolio
  });
  res.json({ worker, token: signToken(worker) });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(req.body.password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  res.json({ user, token: signToken(user) });
};
