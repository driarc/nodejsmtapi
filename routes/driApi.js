'use strict';
var https = require('https')
    , querystring = require('querystring')
    , host = 'http://localhost:3000'
    , apiKey = '2FFA4085C7994016913F8589B765D4E5'
    , driGetData;

exports.driGetData = driGetData = function driGetData(req, resp) {
    var params = req.body;

    // get results from dri Api
    getData(params, function(results) {
        resp.send(results);
        resp.end();
    });
};

function getData(params, successFn) {
    var paramString = JSON.stringify(params)
        , actionQueryString = params.actionQueryString || ''
        , putUrl = actionQueryString.indexOf('?') !== -1
            ? '/getdata/' + actionQueryString + '?apiKey=' + apiKey  // no url params found
            : '/getdata/' + actionQueryString + '&apiKey=' + apiKey  // url params already present
        , options = {
            host: host,
            path: putUrl,
            method: 'PUT',
            headers: {'Content-Type':'application/json'}
        };

    // set up request
    var req = https.request(options, function(res) {
        var resultString = '';
        res.setEncoding('utf-8');

        // build result data as it comes in
        res.on('data', function(chunk) {
            resultString += chunk;
        });

        // when all data is returned then send it off in the success callback
        res.on('end', function() {
            var resultObj = JSON.parse(resultString);
            successFn(resultObj);
        });
    });

    req.on('error', function(err) {
        console.log('The following error occurred during getdata request => ' + err.message);
    });

    // submit request, passing in paramString, then end request
    req.write(paramString);
    req.end();
}