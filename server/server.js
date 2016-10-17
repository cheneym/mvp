var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
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

app.listen(port);

console.log('Server is listening on port ' + port);