require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/auth', require('./routes/auth.routes'));
app.use('/workers', require('./routes/workers.routes'));
app.use('/booking', require('./routes/booking.routes'));
app.use('/chat', require('./routes/chat.routes'));
app.use('/services', require('./routes/services.routes'));
app.use('/notifications', require('./routes/notifications.routes'));
app.use('/user', require('./routes/user.routes'));

app.get('/', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
