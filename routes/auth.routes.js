const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const upload = require('../middlewares/upload');

router.post('/login', controller.login);
router.post('/register-user', controller.registerUser);
router.post('/register-worker', upload.array('portfolio', 6), controller.registerWorker);

module.exports = router;