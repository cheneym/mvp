var mongoose = require('mongoose');

var settingsSchema = mongoose.Schema({
  s1position: { type: Number, required: true },
  s1orientation: { type: Number, required: true },
  s2position: { type: Number, required: false },
  s2orientation: { type: Number, required: false },
});

var Setting = mongoose.model('Setting', settingsSchema);

module.exports = Setting;