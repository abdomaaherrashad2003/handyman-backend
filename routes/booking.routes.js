const router = require('express').Router();
const controller = require('../controllers/booking.controller');
const auth = require('../middlewares/authMiddleware');

// User creates booking
router.post('/create', auth, controller.create);

// Logged-in user bookings
router.get('/user', auth, controller.byUser);

// Logged-in worker bookings
router.get('/worker', auth, controller.byWorker);

module.exports = router;
