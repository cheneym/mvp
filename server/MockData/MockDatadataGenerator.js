var fs = require('fs');

var result = [];
var f = function(n) {
  return 50 + 10 * Math.sqrt(n);
};

for (var i = 0; i < 400; i++) {
  var obj = {
    time: i,
    distance1: 100 + 20 * Math.sin(i * Math.PI / 90),
    distance2: 80 + 15 * Math.cos(i * Math.PI / 70),
    distance3: 150 + 15 * Math.cos(i * Math.PI / 70),
    xposition: 3 * i,
    yposition: f(i)
  };
  result.push(obj);
}

result = JSON.stringify(result);

fs.writeFile('server/MockData/sine.json', result, function() {});