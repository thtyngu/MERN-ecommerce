import express from 'express';
const router = express.Router();
import {
	authUser,
	getUserProfile,
	registerUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/profile').get(protect, getUserProfile);
router.post('/login', authUser);
router.post('/', registerUser);

export default router;
