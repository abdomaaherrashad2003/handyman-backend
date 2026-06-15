const router = require('express').Router();
const controller = require('../controllers/user.controller');
const auth = require('../middlewares/authMiddleware');
const upload = require('../config/multer');
// Get user profile by ID
router.get('/:id', auth, controller.getProfile);

// Update logged-in user profile
router.put('/update', auth, controller.updateProfile);

// 🔔 Save FCM Token
router.post('/save-token', auth, controller.saveFcmToken);

// Health check
router.get('/health', (req, res) => res.json({ user: 'ok' }));


// Upload profile image
router.post(
  '/upload-image',
  auth,
  upload.single('image'),
  controller.uploadProfileImage
);

module.exports = router;