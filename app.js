require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');

app.use(helmet());

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/workers', require('./routes/workers.routes'));
app.use('/booking', require('./routes/booking.routes'));
app.use('/chat', require('./routes/chat.routes'));
app.use('/services', require('./routes/services.routes'));
app.use('/notifications', require('./routes/notifications.routes'));
app.use('/user', require('./routes/user.routes'));
app.use('/categories', require('./routes/serviceCategory.routes'));
app.use('/works', require('./routes/previousWork.routes'));
app.use('/ratings', require('./routes/rating.routes'));

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Handyman API is running'
  });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => {
    console.error(err);
  });