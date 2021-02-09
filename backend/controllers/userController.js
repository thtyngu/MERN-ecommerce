import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
	const profile = req.user;
	if (profile) {
		res.json({
			_id: profile._id,
			name: profile.name,
			email: profile.email,
			isAdmin: profile.isAdmin,
			token: generateToken(profile._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found.');
	}
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User already exists.');
	}

	const user = await User.create({
		name,
		email,
		password,
	});

	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found.');
	}
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const profile = req.user;

	if (profile) {
		profile.name = req.body.name || profile.name;
		profile.email = req.body.email || profile.email;
		if (req.body.password) {
			profile.password = req.body.password;
		}

		const updatedProfile = await profile.save();

		res.json({
			_id: updatedProfile._id,
			name: updatedProfile.name,
			email: updatedProfile.email,
			isAdmin: updatedProfile.isAdmin,
			token: generateToken(profile._id),
		});
	} else {
		res.status(404);
		throw new Error('User not found.');
	}
});

export { authUser, getUserProfile, registerUser, updateUserProfile };
