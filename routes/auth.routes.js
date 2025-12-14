const router = require('express').Router();
const controller = require('../controllers/auth.controller');

router.post('/register-user', controller.registerUser);
router.post('/register-worker', controller.registerWorker);
router.post('/login', controller.login);

module.exports = router;
