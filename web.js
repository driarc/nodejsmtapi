var express = require('express')
  , app = express()
  , request = require('request')
  , common = require('./routes/common')
  , server = require('./routes/server')

/// TODOs
// TODO :: get and add from MongoDB needs to be synchronous mongo.js
// TODO :; FIx the tests to fail if the response JSON has error node
 
app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.set('html', __dirname + '/html');
    app.use("/css", express.static(__dirname + '/views/css'));
    app.use("/js", express.static(__dirname + '/views/js'));
    app.engine('html', require('ejs').renderFile);
    app.use(logErrors);
    app.use(clientErrorHandler);
    app.use(errorHandler);
});

function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    res.send(500, { error: 'Something blew up!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  res.status(500);
  res.render('error', { error: err });
}

app.configure('development', function(){
    app.use(express.errorHandler());
});

//// *********************** Logic for the Application follows   *********************** 
app.get('/', common.index);
app.get('/test', common.test);
app.put('/executethis', server.executethis);

app.listen(3000);