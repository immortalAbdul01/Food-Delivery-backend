// controllers/restaurantController.js
const Restaurant = require('../models/resturant');
const authMiddleware = require('../middleware/authMiddleware');

const registerRestaurant = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const newRestaurant = new Restaurant({
      name,
      email,
      password,
      address,
    });
    await newRestaurant.save();
    res.status(201).json({ message: 'Restaurant registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRestaurantMenu = async (req, res) => {
  try {
    const restaurant = req.user;
    res.status(200).send(restaurant.menu);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateRestaurantMenu = async (req, res) => {
  try {
    const restaurant = req.user;
    restaurant.menu = req.body.menu;
    await restaurant.save();
    res.status(200).send(restaurant.menu);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  registerRestaurant,
  getRestaurantMenu,
  updateRestaurantMenu,
};
