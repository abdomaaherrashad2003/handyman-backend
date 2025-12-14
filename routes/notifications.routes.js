const router = require('express').Router();
const controller = require('../controllers/notifications.controller');
const auth = require('../middlewares/authMiddleware');

// Get all notifications for logged-in user
router.get('/', auth, controller.getAll);

// Mark notification as read
router.post('/mark-read', auth, controller.markRead);

// Health check
router.get('/health', (req, res) => res.json({ notifications: 'ok' }));

module.exports = router;
