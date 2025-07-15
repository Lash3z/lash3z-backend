const express = require('express');
const router = express.Router();
const Prediction = require('../db/models/Prediction');

// Submit a new prediction
router.post('/', async (req, res) => {
  try {
    const newPrediction = new Prediction(req.body);
    await newPrediction.save();
    res.json({ message: 'Prediction submitted', prediction: newPrediction });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save prediction' });
  }
});

// Mark predictions correct by ID list
router.patch('/mark-correct', async (req, res) => {
  const { ids } = req.body;
  try {
    await Prediction.updateMany(
      { _id: { $in: ids } },
      { $set: { correct: true } }
    );
    res.json({ message: 'Marked predictions as correct' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark predictions' });
  }
});

// Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const leaderboard = await Prediction.aggregate([
      { $match: { correct: true } },
      {
        $group: {
          _id: '$username',
          totalCorrect: { $sum: 1 },
          megaCorrect: {
            $sum: { $cond: [{ $eq: ['$huntType', 'mega'] }, 1, 0] }
          },
          superCorrect: {
            $sum: { $cond: [{ $eq: ['$huntType', 'super'] }, 1, 0] }
          },
          playerCorrect: {
            $sum: { $cond: [{ $eq: ['$huntType', 'player'] }, 1, 0] }
          },
          tournamentCorrect: {
            $sum: { $cond: [{ $eq: ['$huntType', 'tournament'] }, 1, 0] }
          }
        }
      },
      { $sort: { totalCorrect: -1 } }
    ]);
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get leaderboard' });
  }
});

module.exports = router;
