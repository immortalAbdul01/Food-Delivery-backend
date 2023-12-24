// models/restaurant.js
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	address: String,
	menu: [
		{
			category: {
				type: String,
				required: true,
			},
			dishes: [
				{
					name: {
						type: String,
						required: true,
					},
					price: {
						type: Number,
						required: true,
					},
				},
			],
		},
	],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
