var fs = require('fs');

var result = [];
var f = function(n) {
  return 50 + 10 * Math.sqrt(n);
};

for (var i = 0; i < 340; i++) {
  var rate = 3;
  var obj = {
    time: i,
    distance1: 100 + 6 * Math.sin(i * Math.PI / 2) - 10 * Math.cos(i * Math.PI / 80),
    distance2: 80 + 3 * Math.cos(i * Math.PI / 1) + 30 * Math.cos(i * Math.PI / 80 + Math.PI/270),
    distance3: 6 * 190 + 5 * Math.cos(i * Math.PI / 10) - rate * i,
    xposition: 50 + rate * i,
    yposition: 350 + 20 * Math.cos(i * Math.PI / 80),
    angle: 0
  };
  result.push(obj);
}

result = JSON.stringify(result);

fs.writeFile('server/MockData/sine.json', result, function() {});