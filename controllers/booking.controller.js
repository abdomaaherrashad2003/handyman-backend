const Booking = require('../models/Booking');
const User = require('../models/User');
const { sendNotification } = require('../utils/sendNotification');
const mongoose = require('mongoose');

// ===============================
// Create Booking
// ===============================
exports.createBooking = async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({
        message: 'Only users can book'
      });
    }

    const { worker_id, date, time, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(worker_id)) {
      return res.status(400).json({
        message: 'Invalid worker id'
      });
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

    const worker = await Worker.findById(worker_id);

    if (worker?.fcmToken) {
      await sendNotification(
        worker.fcmToken,
        'New Booking 🔔',
        'You received a new booking request',
        {
          type: 'NEW_BOOKING',
          bookingId: booking._id.toString()
        }
      );
    }

    res.status(201).json(booking);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// ===============================
// Get User Bookings
// ===============================
exports.myBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    })
      .populate('worker', 'name job_title location rating')
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// ===============================
// Get Worker Bookings
// ===============================
exports.workerBookings = async (req, res) => {
  try {
    if (req.user.role !== 'worker') {
      return res.status(403).json({
        message: 'Only workers allowed'
      });
    }

    const bookings = await Booking.find({
      worker: req.user.id
    })
      .populate('user', 'name phone')
      .sort({ createdAt: -1 });

    res.json(bookings);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// ===============================
// Update Booking Status
// ===============================
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['accepted', 'rejected', 'completed'];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: 'Invalid status'
      });
    }

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    booking.status = status;
    await booking.save();

    const user = await User.findById(booking.user);

    if (user?.fcmToken) {
      let title = '';
      let body = '';

      switch (status) {
        case 'accepted':
          title = 'Booking Accepted ✅';
          body = 'Your booking has been accepted';
          break;

        case 'rejected':
          title = 'Booking Rejected ❌';
          body = 'Your booking has been rejected';
          break;

        case 'completed':
          title = 'Booking Completed 🎉';
          body = 'Your booking has been completed';
          break;
      }

      await sendNotification(
        user.fcmToken,
        title,
        body,
        {
          type: 'BOOKING_UPDATE',
          bookingId: booking._id.toString(),
          status
        }
      );
    }

    res.json(booking);

  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

// ===============================
// Health Check
// ===============================
exports.bookingHome = (req, res) => {
  res.json({
    message: 'Booking API is working ✅'
  });
};