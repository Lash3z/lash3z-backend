const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  huntType: { type: String, enum: ['mega', 'super', 'player', 'tournament'], required: true },
  submittedAt: { type: Date, default: Date.now },
  predictionData: { type: Object, required: true },
  correct: { type: Boolean, default: false }
});

module.exports = mongoose.model('Prediction', PredictionSchema);
