'use strict';
var https = require('https')
    , querystring = require('querystring')
    , host = 'http://localhost:3000'
    , apiKey = '2FFA4085C7994016913F8589B765D4E5'
    , driGetData;

exports.driGetData = driGetData = function driGetData(req, resp) {
    var params = req.body;

    console.log('driGetData hit!, parameters are => ' + JSON.stringify(params));

    // get results from dri Api
    getData(params, function(results) {
        resp.send(results);
        resp.end();
    });
};

function getData(params, successFn) {
    var actionQueryString = params.actionQueryString || ''
        , putUrl = actionQueryString.indexOf('?') !== -1
            ? '/getdataDIRECT/' + actionQueryString + '&apiKey=' + apiKey  // no url params found
            : '/getdataDIRECT/' + actionQueryString + '?apiKey=' + apiKey  // url params already present
        , options = {
            host: host,
            path: putUrl,
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        };

    console.log(putUrl);
    console.log(JSON.stringify(options));

    var paramString = JSON.stringify(params.parameterDTOs);

    // set up request
    var req = https.request(options, function(res) {
        var resultString = '';
        res.setEncoding('utf-8');

        // build result data as it comes in
        res.on('data', function(chunk) {
            console.log('chunk found! => ' + chunk);
            resultString += chunk;
        });

        // when all data is returned then send it off in the success callback
        res.on('end', function() {
            console.log('results from dri getdata call => ' + resultString);
            var resultObj = JSON.parse(resultString);
            successFn(resultObj);
        });
    });

    req.on('error', function(err) {
        console.log('The following error occurred during getdata request => ' + err.message);
        req.end();
    });

    // submit request, passing in paramString, then end request
    req.write(paramString);
    req.end();
}