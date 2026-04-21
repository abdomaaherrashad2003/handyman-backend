const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/booking.controller');

// 🔹 Test
router.get('/', controller.bookingHome);

// 🔹 Create
router.post('/create', auth, controller.createBooking);

// 🔹 User bookings
router.get('/user', auth, controller.myBookings);

// 🔹 Worker bookings
router.get('/worker', auth, controller.workerBookings);

//  NEW (Accept / Reject)
router.put('/:id/status', auth, controller.updateBookingStatus);

module.exports = router;