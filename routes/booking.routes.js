const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
const controller = require('../controllers/booking.controller');

router.post('/create', auth, controller.createBooking);
router.get('/user', auth, controller.myBookings);
router.get('/worker', auth, controller.workerBookings);

module.exports = router;
