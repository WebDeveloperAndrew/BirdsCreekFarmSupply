
var bodyParser = require('body-parser')
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;
  app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use(bodyParser.json());

  var routes = require('./api/routes/mailerRoutes'); //importing route
  routes(app);

app.listen(port);

console.log('Mailer RESTful API server started on: ' + port);
