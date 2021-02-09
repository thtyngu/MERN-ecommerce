import express from 'express';
const router = express.Router();
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router.post('/login', authUser);
router.post('/', registerUser);

export default router;
