var mongoose = require('mongoose');

var pointSchema = mongoose.Schema({
  time: { type: Number, required: true, index: {unique: true} },
  sensor1: { type: Number, required: true },
  sensor2: { type: Number, required: false },
  xPos: { type: Number, required: false },
  yPos: { type: Number, required: false },
  angle: { type: Number, required: false }
});

var Point = mongoose.model('Point', pointSchema);

module.exports = Point;