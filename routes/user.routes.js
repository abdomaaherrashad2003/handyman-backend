const router = require('express').Router();

const controller = require('../controllers/user.controller');
const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/upload');

// Health check
router.get('/health', (req, res) =>
  res.json({ user: 'ok' })
);

router.get('/test-image-route', (req, res) => {
  res.json({ ok: true });
});

// Update logged-in user profile
router.put('/update', auth, controller.updateProfile);

// Save FCM Token
router.post('/save-token', auth, controller.saveFcmToken);

// Upload profile image
router.put(
  '/profile-image',
  auth,
  upload.single('image'),
  controller.updateProfileImage
);

// Get user profile by ID
router.get('/:id', auth, controller.getProfile);

module.exports = router;