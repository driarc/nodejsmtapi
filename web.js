
// using common files at server side also

// TEST files
// require('../dripoint/test/et-utils.js');
// require('../dripoint/test/et-add.js');
// require('../dripoint/test/et-get.js');
// require('../dripoint/test/et-testing.js');
// require('../dripoint/test/et-test.js');
// require('../dripoint/test/et-query.js');
// require('../dripoint/test/et-unit_tests.js');

// MASTER files
// require('../dripoint/js/et-utils.js');
// require('../dripoint/js/et-add.js');
// require('../dripoint/js/et-get.js');
// require('../dripoint/js/et-testing.js');
// require('../dripoint/js/et-test.js');
// require('../dripoint/js/et-query.js');
// require('../dripoint/js/et-unit_tests.js');

// INDIVIDUAL PLAYGROUND copy
var c = require('./config-server.js');
exports.configuration = configuration = c.config.configuration;

require('../dripoint/Staff_local/saurabh/et-utils.js');
require('../dripoint/Staff_local/saurabh/et-add.js');
require('../dripoint/Staff_local/saurabh/et-get.js');
require('../dripoint/Staff_local/saurabh/et-testing.js');
require('../dripoint/Staff_local/saurabh/et-test.js');
require('../dripoint/Staff_local/saurabh/et-query.js');
require('../dripoint/Staff_local/saurabh/et-unit_tests.js');

exports.async = async = require('async');



var express = require('express')
  , app = express()
  , request = require('request')
  , common = require('./routes/common')
  , server = require('./routes/server')
  , driTemplate = require('./routes/driTemplate')
  , driApi = require('./routes/driApi');

  



// console.log('config is '+ JSON.stringify(config));

 
 //// *********************** Express Application Configuration follows   *********************** 
app.configure(function(){
    app.set('port', process.env.PORT || 3000);  //test
	app.enable('trust proxy');
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
app.put('/executethis', server.runExecutethis);
app.put('/buildtemplate', driTemplate.buildTemplate);
app.put('/getdata', driApi.driGetData);
app.get('/echo',common.echo);
// app.get('/testget',server.testget);


app.get('/updateWidTest', common.updateWidTest);

app.listen(process.env.PORT || 3000);
