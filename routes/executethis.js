(function (window) {
    'use strict';
    var config = require('../config.js')
        , response
        , startexecutethis
        , dataToReturn = {}
        , execute
        , executejason
        , executethis
        , executeFn
        , executeFnjason
        , doThis
        , doThisjason
        , executeThisFinished = false;

    exports.startexecutethis = startexecutethis = function(req, res) {
        var params = util.toLowerKeys(req.body);
        console.log('************Start***********executeThis************Start************');
        console.log(' parameters sent in => ' + JSON.stringify(params));

        response = res;
        executethisjason(params);
    };

    function executethisjason(params, nextfunction) {
        if (!nextfunction || !nextfunction instanceof Function) { nextfunction = execute; }

        nextfunction(params, function(results) {
            if (executeThisFinished) {
                console.log('*************End************executeThis*************End*************');
                response.send(dataToReturn);
                dataToReturn = {};
                response.end();
            }
        });
    }

    var addthisfn = function (inputWidgetObject, callback) {
        printToDiv('Function addthis in : inputWidgetObject', inputWidgetObject);
        inputWidgetObject["wid"] = inputWidgetObject["addthis"];
        updatewid(inputWidgetObject, function(results) {
            printToDiv('Function addthis in : x', resultObj);
            callback(results);
        });
    };

    // execute method --- method called numbered (1)
    exports.execute = execute = function (incomingparams, callback) {
        console.log('executejason hit!');
        if (incomingparams["addthis"]) {
            addthisfn(incomingparams, function(results) {
                executeThisFinished = true;
                callback(results);
            });
        }
        else {
            incomingparams['midexecute'] = incomingparams['executethis'];
            delete incomingparams['executethis'];

            // pre-execute method --- method called numbered (2)
            doThis(incomingparams, 'preexecute', function (preResults) {
                //  console.log(' after preexecute >> '+ nonCircularStringify(preResults));

                // mid-execute method --- method called numbered (3)
                doThis(incomingparams, 'midexecute', function (midResults) {
                    //  console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                    if (midResults && midResults.midexecute) { delete midResults['midexecute']; }
                    addObjectToReturn(midResults);

                    // post-execute method --- method called numbered (4)
                    doThis(incomingparams, 'postexecute', function(postResults) {
                        //  console.log(' after postexecute >> ' + nonCircularStringify(postResults));

                        executeThisFinished = true;
                        callback(postResults);
                    });
                });
            });
        }
    };

    // Primary execute function called from doThis
    exports.executeFn = executeFn = function (params, callback) {
        if ((params['executethis'] !== undefined) && (params['executethis'] !== "")) {
            var functionToExecute = window[params['executethis']];

            if (functionToExecute instanceof Function) {
                functionToExecute(params, function(results) {
                    callback(results);
                });
            }
        } else {
            callback(params);
        }
    };

    // primary command router based on what it reads from config
    exports.doThis = doThis = function (params, target, callback) {
        console.log(' Beginning doThis => '+ target +' >>> '+ nonCircularStringify(params));
        // TolowerCase all incoming parameters
        var config0 = util.toLowerKeys(config.configuration)
            , incomingConfig = params['configuration'];

        // override config for howToDo
        if ((typeof incomingConfig !== 'undefined') && (typeof incomingConfig[target] !== '')) {
            incomingConfig = util.toLowerKeys(incomingConfig);

            if ((typeof config0[params[target]]) !== 'object') {
                // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                config0[target] = {};
            }
            // console.log('Loading"' + JSON.stringify(incomingConfiguration[target]) + ' onto config0...');
            config0[target] = incomingConfig[target];
        }

        var howToDoList = config0[target];

        console.log(" HowToDoList => " + JSON.stringify(howToDoList));

        for (var item in howToDoList) {
            // Override config0 for whatToDo
            if ((typeof incomingConfig !== 'undefined') && (incomingConfig[params[target]] !== undefined)) {
                incomingConfig = util.toLowerKeys(incomingConfig);
                if ((typeof config0[params[target]]) !== 'object') {
                    // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                    config0[params[target]] = {};
                }
                // console.log('Loading"' + JSON.stringify(incomingConfiguration[params[target]]) + ' onto config0...');
                config0[params[target]] = incomingConfig[params[target]];
            }

            var whatToDoList = config0[params[target]];
            var howToDo = window[howToDoList[item]['dothis']];

            console.log(" What to do list: " + JSON.stringify(whatToDoList));

            if ((whatToDoList !== undefined) && (whatToDoList != "")) { // make sure we have a list from config, if not just go execute it
                for (var whatitem in whatToDoList) {
                    // console.log('>>>>>>>>>>>> configuration <'+ target +'> >>> '+JSON.stringify(howToDoList));

                    var whatToDo = whatToDoList[whatitem]['dothis'];
                    params['executethis'] = whatToDo;
                    // clean up params
                    delete params[target];
                    if (howToDo instanceof Function) {
                        howToDo(params, function(results) { callback(results); });
                    }
                }
            } else {
                console.log('howToDo is executeFn? => ' + howToDo === executeFn);
                console.log('params[target] => ' + params[target])
                if (howToDo instanceof Function && params[target]) {
                    params['executethis'] = params[target];
                    // Clean up the params, do not want executethis: something and a midexecute : something
                    delete params[target];
                    howToDo(params, function(results) { callback(results); });

                } else {
                    console.log(" Nothing to do in dothis, sending back params...");
                    callback(params);
                }
            }

            if (howToDo instanceof Function) {
                break;
            }
        }
    };

    function addObjectToReturn(obj) {
        for (var prop in obj) {
            dataToReturn[prop] = obj[prop];
        }
    }

    function nonCircularStringify(obj) {
        var cache = [];

        return JSON.stringify(obj, function(key, value) {
            if (typeof value === 'object' && value !== null) {
                if (cache.indexOf(value) !== -1) {
                    //found circular reference, discard key
                    return;
                }
                cache.push(value);
            }
            return value;
        });
    }


    /*****  older 'fake' sync executethis functions **Start**/

        /// logic for executeThis --> accepts 1st argument -- input parameters, 2nd parameter -- callback function
    exports.executethis = executethis = function (inboundparms, targetfunction) {
        console.log(' >>>> executethis function from executethis before calling execute with parameters >>> ' + JSON.stringify(inboundparms));
        if (inboundparms.response) {
            response = inboundparms.response;
            delete inboundparms['response'];
        }

        if (!targetfunction || !targetfunction instanceof Function) { targetfunction = execute; }

        var params = util.toLowerKeys(inboundparms)
            , argCount = 0
            , proceedflag = false
            , result = {};

        console.log('targetfunction length => ' + targetfunction.length);
        if (targetfunction.length !== undefined) { argCount = targetfunction.length; }

        if (argCount === 1) {
            result = targetfunction(params);

            response.send(result);
            response.end();
        } else if (argCount > 1) {
            targetfunction(params, function(data) {
                proceedflag=true;
                result=data;
            });

            while (!proceedflag) {}

            response.send(result);
            response.end();
        }
    };

    /*****  older 'fake' sync executethis functions **End**/

})(typeof window == "undefined" ? global : window);