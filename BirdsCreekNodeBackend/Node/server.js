require('dotenv').config();
var express = require('express');
var mongo = require('mongodb');
var rmapi = require('./app/databaseApi.js');
var dburl = process.env.MONGO_URI;

app.use("/public", express.static(path.join(__dirname, 'public')));

mongo.MongoClient.connect(dburl, function(err, db) {

    if (err) {
      throw new Error('Error: Database not connected');
    } else {
      console.log('Connected to MongoDB');
    }
    
    db.createCollection("products", {
      capped: false
    });

    databaseApi(app,db);
    
    var port = process.env.PORT || 8080;
    app.listen(port, function() {
      console.log('Node.js listening on port ' + port);
    });
    
  });