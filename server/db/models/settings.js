var mongoose = require('mongoose');

var settingsSchema = mongoose.Schema({
  s1position: { type: String, required: true },
  s1orientation: { type: String, required: true },
  s2position: { type: String, required: false },
  s2orientation: { type: String, required: false },
  s3position: { type: String, required: false },
  s3orientation: { type: String, required: false },
  s4position: { type: String, required: false },
  s4orientation: { type: String, required: false },
  date: { type: Date, default: Date.now }
});

var Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;