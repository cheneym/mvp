var fs = require('fs');

var result = [];
var f = function(n) {
  return 50 + 10 * Math.sqrt(n);
};

for (var i = 0; i < 400; i++) {
  var obj = {
    time: i,
    distance: 100 + 20 * Math.sin(i * Math.PI / 90),
    xposition: 3 * i,
    yposition: f(i)
  };
  result.push(obj);
}

result = JSON.stringify(result);

fs.writeFile('server/MockData/sine.json', result, function() {});