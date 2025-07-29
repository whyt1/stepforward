const Game = require('../models/game');


exports.getAllGames = async (req, res) => {
  try {
    console.log("getAllGames")
    const games = await Game.find();
    res.json(games);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.addGame = async (req, res) => {
  try {
    const newGame = new Game(req.body);
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

