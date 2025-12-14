const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/booking.controller');

// ✅ Route أساسي للـ GET /booking
router.get('/', controller.bookingHome);

// ✅ User booking routes
router.post('/create', auth, controller.createBooking);
router.get('/user', auth, controller.myBookings);

// ✅ Worker booking routes
router.get('/worker', auth, controller.workerBookings);

module.exports = router;
