const router = require('express').Router();
const c = require('../controllers/services.controller');

router.get('/', c.getAll);
router.get('/:id/workers', c.getWorkersByService);

// health
router.get('/health', (req, res) => res.json({ services: 'ok' }));

module.exports = router;
