// routes/restaurant.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant_controller');
const authMiddleware = require('../middleware/authMiddleware');

// Restaurant Registration
router.post('/register', restaurantController.registerRestaurant);

// Restaurant Menu (protected by authentication middleware)
router.get('/menu', authMiddleware, restaurantController.getRestaurantMenu);
router.patch('/menu', authMiddleware, restaurantController.updateRestaurantMenu);

module.exports = router;
