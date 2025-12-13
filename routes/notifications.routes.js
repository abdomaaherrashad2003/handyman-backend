const router = require('express').Router();
const c = require('../controllers/notifications.controller');

router.get('/:user_id', c.getAll);
router.post('/mark-read', c.markRead);

// health
router.get('/health', (req, res) => res.json({ notifications: 'ok' }));

module.exports = router;
