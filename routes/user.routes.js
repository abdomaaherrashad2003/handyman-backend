const router = require('express').Router();
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/authMiddleware');

// Get user profile by ID
router.get('/:id', auth, controller.getProfile);

// Update logged-in user profile
router.put('/update', auth, controller.updateProfile);

// Health check
router.get('/health', (req, res) => res.json({ user: 'ok' }));

module.exports = router;
