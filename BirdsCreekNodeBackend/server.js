require('dotenv').config();
var express = require('express');
var app = express();
var mongo = require('mongodb');
var databaseApi = require('./app/databaseApi.js');
var imageServer = require('./app/imageServer.js');
var dburl = process.env.MONGO_URI;


mongo.MongoClient.connect(dburl, function(err, db) {

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
        imageServer(app, express, db);
        
        var port = process.env.PORT || 8080;
        app.listen(port, function() {
        console.log('Node.js listening on port ' + port);
        });
    }
});