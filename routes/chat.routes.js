const router = require('express').Router();
const controller = require('../controllers/chat.controller');
const auth = require('../middlewares/authMiddleware');

// Create chat room
router.post('/create', auth, controller.createRoom);

// Get messages in a room
router.get('/messages/:room_id', auth, controller.getMessages);

// Send message
router.post('/send', auth, controller.sendMessage);

// Health check
router.get('/health', (req, res) => res.json({ chat: 'ok' }));

module.exports = router;
