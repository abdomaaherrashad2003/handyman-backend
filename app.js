require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ----- Routes -----
const authRoutes = require('./routes/auth');
// باقي الـ routes هتستورد بنفس الطريقة بعد تجهيزهم:
// const workersRoutes = require('./routes/workers');
// const bookingRoutes = require('./routes/booking');
// const chatRoutes = require('./routes/chat');
// const servicesRoutes = require('./routes/services');
// const notificationsRoutes = require('./routes/notifications');
// const userRoutes = require('./routes/user');

app.use('/auth', authRoutes);
// app.use('/workers', workersRoutes);
// app.use('/booking', bookingRoutes);
// app.use('/chat', chatRoutes);
// app.use('/services', servicesRoutes);
// app.use('/notifications', notificationsRoutes);
// app.use('/user', userRoutes);

// Health check
app.get('/', (req, res) => res.json({ ok: true }));

// ----- DB connect + start server -----
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/handyman';

mongoose.connect(MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log('Server running on port', PORT));
  })
  .catch(err => {
    console.error('Mongo connection error', err.message);
    process.exit(1);
  });
