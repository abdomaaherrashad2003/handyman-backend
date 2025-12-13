const router = require('express').Router();
const c = require('../controllers/chat.controller');

router.post('/create', c.createRoom);
router.get('/messages/:room_id', c.getMessages);
router.post('/send', c.sendMessage);

// health check
router.get('/health', (req, res) => res.json({ chat: 'ok' }));

module.exports = router;
