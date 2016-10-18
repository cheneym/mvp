var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var Setting = require('./db/models/settings');
var Point = require('./db/models/points');
var db = require('./db/config');

var port = 8000;

app.use(express.static(__dirname + '/../client'));
app.use(express.static(__dirname + '/../client/pages'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
  res.redirect('/home');
});

app.get('/home', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/simulate', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/pages/simulate.html'));
});

app.get('/data', (req, res) => {
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

app.get('/configs', (req, res) => {
  Setting.findOne().sort('-created_at').exec((err, setting) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(setting);
    }
  });
});

app.post('/configs', function(req, res) {
  var filePath = path.resolve(__dirname + '/MockData/configs.json');
  new Setting(req.body).save((err, status) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(status);
    }
  });
});


app.listen(port);

console.log('Server is listening on port ' + port);