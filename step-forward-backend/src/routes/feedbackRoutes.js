const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// POST /api/feedback
router.post('/', feedbackController.createFeedback);

// GET /api/feedback
router.get('/', feedbackController.getAllFeedback);

router.get('/:game', feedbackController.getFeedbackByGame);


module.exports = router;