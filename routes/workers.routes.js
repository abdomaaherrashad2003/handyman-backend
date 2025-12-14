const router = require('express').Router();
const controller = require('../controllers/workers.controller');
const auth = require('../middlewares/authMiddleware');

// Get all workers
router.get('/', auth, controller.getAll);

// Get worker by ID
router.get('/:id', auth, controller.getById);

// Health check
router.get('/health', (req, res) => res.json({ workers: 'ok' }));

module.exports = router;
