const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    game: { 
        type: String, 
        required: true 
    },
    educationalValue: { 
        type: Number, 
        min: 1, max: 5, 
        required: true 
    },
    engagementLevel: { 
        type: Number, 
        min: 1, max: 5, 
        required: true 
    },
    userInterface: { 
        type: Number, 
        min: 1, max: 5, 
        required: true 
    },
    comments: { 
        type: String 
    }
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);