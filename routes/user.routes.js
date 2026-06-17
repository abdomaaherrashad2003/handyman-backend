const router = require('express').Router();

const controller = require('../controllers/user.controller');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

router.get('/health', (req, res) =>
  res.json({ user: 'ok' })
);

router.get('/test-image-route', (req, res) => {
  res.json({ ok: true });
});

router.put('/update', auth, controller.updateProfile);

router.post('/save-token', auth, controller.saveFcmToken);

router.put(
  '/profile-image',
  auth,
  upload.single('image'),
  controller.updateProfileImage
);

// لازم يكون آخر Route
router.get('/:id', auth, controller.getProfile);

module.exports = router;