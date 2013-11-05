var express = require('express')
  , app = express()
  , request = require('request')
  , config = require('./config.js')
  , common = require('./routes/common')
  , server = require('./routes/server')
  , driTemplate = require('./routes/driTemplate')
  , jasonserver = require('./routes/server-jason');


 
 //// *********************** Express Application Configuration follows   *********************** 
app.configure(function(){
    app.set('port', process.env.PORT || 3000);  //test
	app.enable('trust proxy')
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
// Add headers

app.use(express.static(__dirname + '/../dripoint'));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middlewaresssss
    next();
});
    app.use(app.router);
    app.set('html', __dirname + '/html');
    app.use("/css", express.static(__dirname + '/views/css'));
    app.use("/js", express.static(__dirname + '/views/js'));
    app.engine('html', require('ejs').renderFile);
});


app.configure('development', function(){
    app.use(express.errorHandler());
});

//// *********************** Route Mapping for Application follows   *********************** 
app.get('/', common.index);
app.get('/test', common.test);
app.put('/executethis', server.executethis);
app.put('/executethisjason', jasonserver.executethis);
app.put('/buildtemplate', driTemplate.buildTemplate);
app.get('/echo',common.echo);

app.get('/updateWidTest', common.updateWidTest);

app.listen(process.env.PORT || 3000);
