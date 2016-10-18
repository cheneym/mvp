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
  Point.find().sort('time').exec((err, points) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(points);
    }
  });  
});

app.post('/data', function(req, res) {
  //clear collection
  Point.remove({}, (err, status) => {
    if (err) {
      res.status(500).send(err)
    }
    //Add to collection
    Point.collection.insert(req.body, (err, status) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send(status);
      }
    });
  })
});

app.get('/configs', (req, res) => {
  Setting.find().sort('created_at').exec((err, settings) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(settings[settings.length - 1]);
    }
  });
});

app.post('/configs', function(req, res) {
  new Setting(req.body).save((err, status) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(status);
    }
  });
});

app.get('/clear', (req, res) => {
  Point.remove({}, (err, status) => {
    if (err) {
      res.status(500).send(err)
    } else {
      Setting.remove({}, (err, status) => {
        if (err) {
          res.status(500).send(err)
        } else {
          res.redirect('/home');
        }
      })
    }
  });
});

app.listen(port);

console.log('Server is listening on port ' + port);