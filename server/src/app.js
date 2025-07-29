// app.js

// Main enterpoint for the Express server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./mongodb/mongodbConnection');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const gamesRoutes = require('./routes/gameRoutes');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/games', gamesRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on https://stepforward.onrender.com/api`);
});