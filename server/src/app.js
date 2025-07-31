// app.js

// Main enterpoint for the Express server

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./mongodb/mongodbConnection');
const path = require('path'); 

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
console.log(path.join(__dirname, '..', '..', 'client'))
app.use(express.static(path.join(__dirname, '..', '..', 'client'))); 

// Import routes
const userRoutes = require('./routes/userRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const gamesRoutes = require('./routes/gameRoutes');


// Use routes
app.use('/api/users', userRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/games', gamesRoutes);

// --- Routes for specific HTML files ---
const clientPath = path.resolve(__dirname, '..', '..', 'client'); 

// app.get('/gamedev_login', (req, res) => {
//     res.sendFile(path.join(clientPath, 'gamedev_login.html'));
// });

// app.get('/games_analytics', (req, res) => {
//     res.sendFile(path.join(clientPath, 'Games Analytics .html'));
// });

// app.get('/parents_login', (req, res) => {
//     res.sendFile(path.join(clientPath, 'parents_login.html'));
// });

// app.get('/play_game', (req, res) => {
//     res.sendFile(path.join(clientPath, 'Play Game.html'));
// });

// app.get('/track_progress', (req, res) => {
//     res.sendFile(path.join(clientPath, 'Track Progress.html'));
// });

// app.get('/upload_games', (req, res) => {
//     res.sendFile(path.join(clientPath, 'Upload Games.html'));
// });

// Serve the main index.html for the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
});

// // Catch-all route for any other unhandled paths
// app.get('*', (req, res) => {
//     res.sendFile(path.join(clientPath, 'index.html')); 
// });

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on https://stepforward.onrender.com/api`);
});