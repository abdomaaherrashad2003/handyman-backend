
const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/booking.controller');

// 🔹 Test route
router.get('/', controller.bookingHome);

// 🔹 Create booking
router.post('/create', auth, controller.createBooking);

// 🔹 User bookings
router.get('/user', auth, controller.myBookings);

// 🔹 Worker bookings
router.get('/worker', auth, controller.workerBookings);

module.exports = router;