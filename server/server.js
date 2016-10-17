var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var port = 8000;

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../client/pages'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
  res.end();
});

app.get('/simulate', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/../client/pages/simulate.html'));
});

app.get('/data', function(req, res) {
  var filePath = path.resolve(__dirname + '/MockData/sine.json');
  fs.readFileAsync(filePath)
    .then(function(text) {
      res.writeHead(200);
      res.end(text);
    }).catch(function(err) {
      res.writeHead(404);
      res.end(err);
    });
});

app.listen(port);

console.log('Server is listening on port ' + port);