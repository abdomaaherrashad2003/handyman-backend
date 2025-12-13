const router = require('express').Router();
const controller = require('../controllers/booking.controller');

// يجب أن تكون كل الـ handlers دوال صحيحة
router.post('/create', controller.create);
router.get('/user/:id', controller.byUser);
router.get('/worker/:id', controller.byWorker);

module.exports = router;
