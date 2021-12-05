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

const cors = require("cors");
const allowedOrigins = [
  'http://localhost:777',
  'http://flip1.engr.oregonstate.edu:7771',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=1',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=2',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=3',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=4',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=5',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=6',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=7',
  'http://flip1.engr.oregonstate.edu:58471/data?waypoint=7',
  'http://flip1.engr.oregonstate.edu:58471/'
];

//communicate of cors
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

//receive homepage request
app.get('/', function (req, res) {
  res.render("home");
});

app.get('/roverlist', function (req, res) {
  res.render('roverlist');
});
app.get('/lunokhod1', function (req, res) {
  res.render('lunokhod1');
});
app.get('/lunokhod2', function (req, res) {
  res.render('lunokhod2');
});
app.get('/apollo15LRV', function (req, res) {
  res.render('apollo15LRV');
});
app.get('/sojourner', function (req, res) {
  res.render('sojourner');
});
app.get('/spirit', function (req, res) {
  res.render('spirit');
});
app.get('/yutu', function (req, res) {
  res.render('yutu');
});
app.get('/oppportunity', function (req, res) {
  res.render('oppportunity');
});
app.get('/curiosity', function (req, res) {
  res.render('curiosity');
});
app.get('/yutu2', function (req, res) {
  res.render('yutu2');
});
app.get('/zhurong', function (req, res) {
  res.render('zhurong');
});
app.get('/perseverance', function (req, res) {
  res.render('perseverance');
});
app.get('/franklin', function (req, res) {
  res.render('franklin');
});

app.get('/data', function (req, res) {
  if (req.query.waypoint > 7) {
    res.type('text/plain');
    res.send('waypoint should less or equ to 7 ');
  } else {
    var data;
    var pathName = './dataJs/waypoint' + req.query.waypoint + '.js';
    fs.readFile(pathName, 'utf8', (err, data) => {
      if (err) throw err;
      res.type('text/plain');
      res.send(data);
    });
  }
});

app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
  console.log('Express started on ' + app.get('port') + '; press Ctrl-C to terminate.');
});
