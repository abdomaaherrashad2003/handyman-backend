const router = require('express').Router();
const c = require('../controllers/user.controller');

router.get('/:id', c.getProfile);
router.put('/update', c.updateProfile);

// health
router.get('/health', (req, res) => res.json({ user: 'ok' }));

module.exports = router;
