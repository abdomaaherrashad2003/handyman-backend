const Rating = require('../models/Rating');
const User = require('../models/User');
const Booking = require('../models/Booking');

// ===============================
// Create Rating
// ===============================
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { workerId, bookingId, rating, comment } = req.body;

    // 1. Check booking exists
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // 2. Prevent duplicate rating
    const existing = await Rating.findOne({
      user: userId,
      booking: bookingId
    });

    if (existing) {
      return res.status(400).json({
        message: 'You already rated this booking'
      });
    }

    // 3. Save rating
    const newRating = await Rating.create({
      user: userId,
      worker: workerId,
      booking: bookingId,
      rating,
      comment
    });

    // 4. Update worker rating
    const worker = await User.findById(workerId);

    const totalRating =
      worker.rating * worker.ratingCount + rating;

    worker.ratingCount += 1;
    worker.rating = totalRating / worker.ratingCount;

    await worker.save();

    res.status(201).json({
      message: 'Rating submitted',
      rating: newRating
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};