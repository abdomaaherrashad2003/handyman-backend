const Booking = require('../models/Booking');
const mongoose = require('mongoose');

exports.createBooking = async (req, res) => {
  try {
    if (req.user.role !== 'user')
      return res.status(403).json({ message: 'Only users can book' });

    const { worker_id, date, time, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(worker_id))
      return res.status(400).json({ message: 'Invalid worker id' });

    const booking = await Booking.create({
      user: req.user.id,        // ✅ dynamic
      worker: worker_id,
      date,
      time,
      description
    });

    res.status(201).json(booking);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id })
    .populate('worker', 'name job_title location rating')
    .sort({ createdAt: -1 });

  res.json(bookings);
};

exports.workerBookings = async (req, res) => {
  const bookings = await Booking.find({ worker: req.user.id })
    .populate('user', 'name phone')
    .sort({ createdAt: -1 });

  res.json(bookings);
};
