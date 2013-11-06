(function (window) {
    'use strict';
    var config
      , response
      , startexecutethis
      , dataToReturn = {}
      , executeThisFinished = false;

    if (typeof require !== 'undefined') {
        config = require('../config.js');// TODO :: REMOVE this for this file to truly become portable
    }

    //    // make sure the global is clear
    //    window.data = null;

    //// start polling at an interval until the data is found at the global
    //var intvl = setInterval(function () {
    //    if (window.data) {
    //        clearInterval(intvl);
    //        // console.log(data);
    //    }
    //}, 100);

    exports.startexecutethis = startexecutethis = function(req, res) {
        var params = util.toLowerKeys(req.body);
        console.log('************Start***********executeThis************Start************');
        console.log(' parameters sent in => ' + JSON.stringify(params));

        response = res;
        executethis(params);
    };

    function executethis(params, nextfunction) {
        if (!nextfunction || !nextfunction instanceof Function) { nextfunction = execute; }

        nextfunction(params, function(results) {
            if (executeThisFinished) {
                console.log('*************End************executeThis*************End*************');
                response.send(dataToReturn);
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
                console.log(' after preexecute >> '+JSON.stringify(preResults));
                addObjectToReturn(preResults);

                // mid-execute method --- method called numbered (3)
                doThis(preResults, 'midexecute', function (midResults) {
                    console.log(' after midexecute >> ' + JSON.stringify(midResults));
                    addObjectToReturn(midResults);

                    // post-execute method --- method called numbered (4)
                    doThis(midResults, 'postexecute', function(postResults) {
                        console.log(' after postexecute >> ' + JSON.stringify(postResults));
                        addObjectToReturn(postResults);

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
        console.log(' From doThis => '+ target +' >>> '+JSON.stringify(params));
        // TolowerCase all incoming parameters
        var config = util.toLowerKeys(config.configuration)
          , incomingConfig = params['configuration'];

        // override config for howToDo
        if ((typeof incomingConfig !== 'undefined') && (typeof incomingConfig[target] !== '')) {
            incomingConfig = util.toLowerKeys(incomingConfig);

            if ((typeof config[params[target]]) !== 'object') {
                // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                config[target] = {};
            }
            // console.log('Loading"' + JSON.stringify(incomingConfiguration[target]) + ' onto config0...');
            config[target] = incomingConfig[target];
        }

        var howToDoList = config[target];

        // console.log("How to do list: " + JSON.stringify(howToDoList));

        for (var item in howToDoList) {
            // Override config0 for whatToDo
            if ((typeof incomingConfig !== 'undefined') && (incomingConfig[params[target]] !== undefined)) {
                incomingConfig = util.toLowerKeys(incomingConfig);
                if ((typeof config[params[target]]) !== 'object') {
                    // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                    config[params[target]] = {};
                }
                // console.log('Loading"' + JSON.stringify(incomingConfiguration[params[target]]) + ' onto config0...');
                config[params[target]] = incomingConfig[params[target]];

            }

            var whatToDoList = config[params[target]];
            var howToDo = howToDoList[item]['dothis'];

            console.log(" What to do list: " + JSON.stringify(whatToDoList));

            if ((whatToDoList !== undefined) && (whatToDoList != "")) { // make sure we have a list from config, if not just go execute it
                for (var whatitem in whatToDoList) {
                    // console.log('>>>>>>>>>>>> configuration <'+ target +'> >>> '+JSON.stringify(howToDoList));

                    var whatToDo = whatToDoList[whatitem]['dothis'];
                    // console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                    params['executethis'] = whatToDo;
                    // clean up params
                    delete params[target];
                    if (howToDo instanceof Function) {
                        howToDo(params, function(results) { callback(results); });
                    }
                }
            } else {
                // console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
                if (window[howToDo] && (params[target])) {
                    params['executethis'] = params[target];
                    // Clean up the params, do not want executethis: something and a midexecute : something
                    delete params[target];
                    howToDo(params, function(results) { callback(results); });

                } else {
                    // console.log("Nothing to do in dothis...");
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
})(typeof window == "undefined" ? global : window);