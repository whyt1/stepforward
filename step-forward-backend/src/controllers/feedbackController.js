const Feedback = require('../models/feedback');

exports.createFeedback = async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (error) {
    res.status(400).json({ message: 'Error submitting feedback', error });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error });
  }
};

exports.getFeedbackByGame = async (req, res) => {
  try {
    const { game } = req.params;
    const feedbacks = await Feedback.find({ game });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback for game', error });
  }
};
