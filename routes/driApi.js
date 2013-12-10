'use strict';
var needle = require('needle')
//    , querystring = require('querystring')
    , host = 'http://drirest.drillar.com/json/Data/'
    , apiKey = '2FFA4085C7994016913F8589B765D4E5'
    , driGetData;

exports.driGetData = driGetData = function driGetData(req, resp) {
    var params = req.body;

    // get results from dri Api
    getData(params, function(err, results) {
        var returnData = err || results;
        resp.send(returnData);
        resp.end();
    });
};

function getData(params, callback) {
    var actionQueryString = params.actionQueryString || ''
        , putUrl = actionQueryString.indexOf('?') !== -1
            ? actionQueryString + '&apiKey=' + apiKey  // no url params found
            : actionQueryString + '?apiKey=' + apiKey  // url params already present
        , options = { json: true };

    console.log(host + putUrl);

    needle.put(host + putUrl, params.parameterDTOs, options, function(err, resp, body) {
        if (err) {
            console.log('error occurred during getdata call => ' + err);
            callback(err, body)
        }
        else {
            console.log('results from dri getdata call => ' + JSON.stringify(body));
            callback(null, body);
        }
    });

//    var paramString = JSON.stringify(params.parameterDTOs);
//
//    // set up request
//    var req = http.request(options, function(res) {
//        var resultString = '';
//        res.setEncoding('utf-8');
//
//        // build result data as it comes in
//        res.on('data', function(chunk) {
//            console.log('chunk found! => ' + chunk);
//            resultString += chunk;
//        });
//
//        // when all data is returned then send it off in the success callback
//        res.on('end', function() {
//            console.log('results from dri getdata call => ' + resultString);
//            var resultObj = JSON.parse(resultString);
//            successFn(resultObj);
//        });
//    });
//
//    req.on('error', function(err) {
//        console.log('The following error occurred during getdata request => ' + err.message);
//        req.end();
//    });
//
//    // submit request, passing in paramString, then end request
//    req.write(paramString);
//    req.end();
}