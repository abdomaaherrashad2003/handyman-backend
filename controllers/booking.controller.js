const Booking = require('../models/Booking');
const mongoose = require('mongoose');

/**
 * Create Booking (User only)
 */
exports.create = async (req, res) => {
  try {
    const { worker_id, date, time, description } = req.body;
    const userId = req.user.id;

    // Role check
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Only users can create bookings' });
    }

    // Validate required fields
    if (!worker_id || !date || !time) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    // Validate worker ID
    if (!mongoose.Types.ObjectId.isValid(worker_id)) {
      return res.status(400).json({ message: 'Invalid worker id' });
    }

    // Optionally: validate date is in the future
    const bookingDate = new Date(date + 'T' + time);
    if (bookingDate < new Date()) {
      return res.status(400).json({ message: 'Booking date must be in the future' });
    }

    const booking = await Booking.create({
      user: userId,
      worker: worker_id,
      date,
      time,
      description
    });

    res.status(201).json({
      message: 'Booking created',
      booking
    });
  } catch (err) {
    console.error('CREATE BOOKING ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get bookings for logged-in user
 */
exports.byUser = async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Only users can access their bookings' });
    }

    const bookings = await Booking.find({ user: req.user.id })
      .populate('worker', 'name job_title location rating')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('GET USER BOOKINGS ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

/**
 * Get bookings for logged-in worker
 */
exports.byWorker = async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Only workers can access their bookings' });
    }

    const bookings = await Booking.find({ worker: req.user.id })
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('GET WORKER BOOKINGS ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
