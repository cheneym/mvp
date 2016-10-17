var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = 8000;

app.use(express.static(__dirname + '/../client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', function(req, res) {
  res.end();
});

app.listen(port);

console.log('Server is listening on port ' + port);