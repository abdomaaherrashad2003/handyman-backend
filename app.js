require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// ===== Global Middlewares =====
app.use(helmet());
app.use(cors({
  origin: '*', // Flutter / Web
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Static Files =====
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ===== Routes =====
app.use('/auth', require('./routes/auth.routes'));
app.use('/workers', require('./routes/workers.routes'));
app.use('/booking', require('./routes/booking.routes'));
app.use('/chat', require('./routes/chat.routes'));
app.use('/services', require('./routes/services.routes'));
app.use('/notifications', require('./routes/notifications.routes'));
app.use('/user', require('./routes/user.routes'));

// ===== Health Check =====
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Handyman API is running 🚀'
  });
});

// ===== Global Error Handler (مهم جدًا) =====
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error('❌ Failed to connect DB', err);
    process.exit(1);
  });
