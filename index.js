// app.js
require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth')
const connectDB = require('./db');
const resturantRoutes= require('./routes/resturant')

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Routes


app.use('/auth', authRoutes);
app.use('/restaurant', resturantRoutes);



// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
