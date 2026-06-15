const router = require('express').Router();
const controller = require('../controllers/serviceCategory.controller');
const auth = require('../middlewares/authMiddleware');

// create category (admin only if عندك roles)
router.post('/', auth, controller.createCategory);

module.exports = router;