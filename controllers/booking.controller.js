const Booking = require('../models/Booking');
const mongoose = require('mongoose');

/**
 * Create Booking
 */
exports.createBooking = async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Only users can book' });
    }

    const { worker_id, date, time, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(worker_id)) {
      return res.status(400).json({ message: 'Invalid worker id' });
    }

    const existing = await Booking.findOne({
      worker: worker_id,
      date,
      time
    });

    if (existing) {
      return res.status(409).json({
        message: 'This time slot is already booked'
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      worker: worker_id,
      date,
      time,
      description
    });

    res.status(201).json(booking);

  } catch (err) {
    console.error('CREATE BOOKING ERROR:', err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'This time slot is already booked'
      });
    }

    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Update Booking Status 
 */
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatus = ['pending', 'accepted', 'rejected', 'completed'];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    //  مهم: بس العامل هو اللي يقدر يقبل أو يرفض
    if (req.user.role === 'worker' && booking.worker.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not allowed' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);

  } catch (err) {
    console.error('UPDATE STATUS ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get User Bookings
 */
exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('worker', 'name job_title location rating')
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    console.error('MY BOOKINGS ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Get Worker Bookings
 */
exports.workerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({ message: 'Only workers allowed' });
    }

    const bookings = await Booking.find({ worker: req.user.id })
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    console.error('WORKER BOOKINGS ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Test Route
 */
exports.bookingHome = (req, res) => {
  res.json({ message: 'Booking API is working ✅' });
};