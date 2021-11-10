var express = require("express");
var fs = require('fs');
var path = require('path');
var hbs = require("express-handlebars").create({
  defaultLayout: "main"
});

var app = express();

app.use(express.static(path.join(__dirname, './public')));
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.set('port', 58471);

app.get('/', function(req, res) {
  res.render("home");
});

app.get('/rovers', function(req, res) {
  res.render('rovers');
});

function genContext() {
  var stuffToDisplay = {};
  stuffToDisplay.time = (new Date(Date.now())).toLocaleTimeString('en-US');
  return stuffToDisplay;
}

app.get('/time', function(req, res) {
  res.render('time', genContext());
});

app.get('/data', function(req, res) {
  if (req.query.waypoint > 7) {
    res.type('text/plain');
    res.send('waypoint should less or equ to 7 ');
  } else {
    var data;
    var pathName = './dataJs/waypoint' + req.query.waypoint + '.js';
    fs.readFile(pathName, 'utf8', (err, data) => {
      if (err) throw err;
      // console.log(data);
      // var data = JSON.parse(data);
      // if (req.query.dataType === 'time') {
      //   dataType = data.name;
      // }
      // if (req.query.dataType === 'date') {
      //   dataType = data.date;
      // }
      // if (req.query.dataType === 'info') {
      //   dataType = data.info;
      // }
      res.type('text/plain');
      res.send(data);
    });
  }
});

app.use(function(req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
