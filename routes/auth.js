// routes/authRoutes.js - Authentication routes

const express = require('express');
const authController = require('../controllers/auth_controller');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
// Define login route and other authentication routes as needed

module.exports = router;
