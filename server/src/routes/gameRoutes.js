const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

// GET /api/games
router.get('/', gameController.getAllGames);

// POST /api/games
router.post('/', gameController.addGame);

module.exports = router;