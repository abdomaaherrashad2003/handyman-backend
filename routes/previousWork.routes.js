const router = require('express').Router();

const controller = require('../controllers/previousWork.controller');
const auth = require('../middlewares/authMiddleware');
const upload = require('../config/multer');

// Add work
router.post(
  '/',
  auth,
  upload.single('image'),
  controller.addWork
);

// Get worker gallery
router.get('/:workerId', controller.getWorkerWorks);

// Delete work
router.delete('/:id', auth, controller.deleteWork);

module.exports = router;