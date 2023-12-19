// routes/authRoutes.js - Authentication routes

const express = require('express');
const authController = require('../controllers/auth_controller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword); // New route for forgot password
router.post('/reset-password', authController.resetPassword); // New route for resetting password

module.exports = router;
