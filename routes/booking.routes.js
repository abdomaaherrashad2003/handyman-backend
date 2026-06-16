const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/booking.controller');

router.get('/', controller.bookingHome);

router.post('/create', auth, controller.createBooking);

router.get('/user', auth, controller.myBookings);

router.get('/worker', auth, controller.workerBookings);

router.patch('/:bookingId/status', auth, controller.updateBookingStatus);

module.exports = router;