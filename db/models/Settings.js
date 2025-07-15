const mongoose = require('mongoose');

const SettingsSchema = new mongoose.Schema({
  vaultCode: { type: String, default: '' },
  bonusMin: { type: Number, default: 5 },
  bonusMax: { type: Number, default: 25 },
  prizeVariance: { type: Number, default: 42.3 },
  predictionToggles: {
    mega: { type: Boolean, default: false },
    super: { type: Boolean, default: false },
    player: { type: Boolean, default: false }
  }
});

module.exports = mongoose.model('Settings', SettingsSchema);
