const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String, // Path or URL to the image
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number, // e.g., 4.5 for ⭐⭐⭐⭐½
        min: 0,
        max: 5,
        required: true
    },
    downloadUrl: {
        type: String, // URL or path to download the game
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Game', gameSchema);