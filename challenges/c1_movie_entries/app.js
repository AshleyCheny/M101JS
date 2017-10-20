var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    engines = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(express.static('public'))


MongoClient.connect('mongodb://localhost:27017/video', function(err, db) {

    assert.equal(null, err);
    console.log("Successfully connected to MongoDB.");

    // render the  "movies" template
    app.get('/', function(req, res){
      db.collection('movies').find({}).toArray(function(err, docs) {
          res.render('movies', { 'movies': docs } );
      });
    });

    // TODO: set up a POST route to handle the POST request from the form
    app.post('/', function(req, res){

      // req.body is a document, so save the document to the db
      console.log(req);
      if (!req.body) {
        console.log("no data");
        res.send('insert data failed');
      } else {
        insertDocument(db, req.body, function() {
        });

        res.header("Content-Type", 'application/json');
        res.send("Successfully insert the data");
      }

    });


    app.use(function(req, res){
        res.sendStatus(404);
    });

    var server = app.listen(3002, function() {
        var port = server.address().port;
        console.log('Express server listening on port %s.', port);
    });

});

// create a function which will insert a document to the db
var insertDocument = function(db, insertData, callback){
  db.collection('movies').insertOne(insertData, function(err, result){
    assert.equal(err, null);
    console.log("Inserted a document into the movies collection.");
    callback();
  });
}
