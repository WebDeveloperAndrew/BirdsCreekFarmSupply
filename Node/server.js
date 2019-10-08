require('dotenv').config();
var express = require('express');
var app = express();
var mongo = require('mongodb');
var databaseApi = require('./app/databaseApi.js');
var imageServer = require('./app/imageServer.js');
var loginApi = require('./app/loginApi.js');
var dburl = process.env.MONGO_URI;

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongo.MongoClient.connect(dburl,{ useNewUrlParser: true, reconnectTries: 60, reconnectInterval: 5000}, function(err, db) {

    if (err) {
      console.log(err);
      throw new Error('Error: Database not connected');
    } else {
      console.log('Connected to MongoDB');
      var dbase = db.db("BCData")
      dbase.createCollection("products", {
        capped: false
      });
      dbase.createCollection("brands", {
        capped: false
      });

      databaseApi(app);
      loginApi(app,express);
      imageServer(app, express, db);
      
      var port = process.env.PORT || 8080;
      app.listen(port, function() {
        console.log('Node.js listening on port ' + port);
      });
    }
  });
