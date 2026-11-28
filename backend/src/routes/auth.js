const express = require('express');
const { register, login, logout, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Login with email & password
// @access  Public
router.post('/login', login);

// @route   POST /api/auth/logout
// @desc    Clear auth cookie
// @access  Public
router.post('/logout', logout);

// @route   GET /api/auth/me
// @desc    Get the currently authenticated user
// @access  Private (requires JWT)
router.get('/me', protect, getMe);

module.exports = router;
