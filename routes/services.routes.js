const router = require('express').Router();
const controller = require('../controllers/services.controller');
const auth = require('../middlewares/authMiddleware');

router.get('/', controller.getAll);
router.get('/:id/workers', controller.getWorkersByService);

// Health check
router.get('/health', (req, res) => res.json({ services: 'ok' }));

module.exports = router;
