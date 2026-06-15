const router = require('express').Router();
const controller = require('../controllers/rating.controller');
const auth = require('../middlewares/authMiddleware');

router.post('/', auth, controller.createRating);

module.exports = router;