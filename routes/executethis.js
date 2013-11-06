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
        if (!nextfunction || !nextfunction instanceof Function) { nextfunction = executejason; }

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
    exports.executejason = executejason = function (incomingparams, callback) {
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
            doThisjason(incomingparams, 'preexecute', function (preResults) {
                //  console.log(' after preexecute >> '+ nonCircularStringify(preResults));

                // mid-execute method --- method called numbered (3)
                doThisjason(incomingparams, 'midexecute', function (midResults) {
                    //  console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                    if (midResults && midResults.midexecute) { delete midResults['midexecute']; }
                    addObjectToReturn(midResults);

                    // post-execute method --- method called numbered (4)
                    doThisjason(incomingparams, 'postexecute', function(postResults) {
                        //  console.log(' after postexecute >> ' + nonCircularStringify(postResults));

                        executeThisFinished = true;
                        callback(postResults);
                    });
                });
            });
        }
    };

    // Primary execute function called from doThis
    exports.executeFnjason = executeFnjason = function (params, callback) {
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
    exports.doThisjason = doThisjason = function (params, target, callback) {
        console.log(' Beginning doThis => '+ target +' >>> '+ nonCircularStringify(params));
        // TolowerCase all incoming parameters
        var config0 = util.toLowerKeys(config.configurationjason)
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
                // console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
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

        // execute method --- method called numbered (1)
    exports.execute = execute = function (incomingparameters, targetfunction, callback) {
        // we should add cases of targetfuctnion: execute, addthis, test
        if (incomingparameters["executethis"] === "test") {
            incomingparameters["imAlive"] = "true";
            callback(incomingparameters);
        }

        if (incomingparameters["addthis"]) {
            output = addthisfn(incomingparameters);
            callback(output);
        }
        else {
            //if (!inputWidgetObject["executethis"]) {inputWidgetObject["executethis"=targetfunction}
            incomingparameters['midexecute'] = incomingparameters['executethis'];
            delete incomingparameters['executethis']

            // getAllParameters(incomingparameters);

            // pre-execute method --- method called numbered (2)
            doThis(incomingparameters, 'preexecute', function (incomingparameters) {

                // console.log('after preexecute >> '+JSON.stringify(incomingparameters));
                // mid-execute method --- method called numbered (3)
                doThis(incomingparameters, 'midexecute', function (outgoingparameters) {

                    if (!outgoingparameters) {
                        outgoingparameters = {};
                    }

                    console.log('after executethis >> ' + JSON.stringify(outgoingparameters));
                    // post-execute method --- method called numbered (4)
                    doThis(outgoingparameters, 'postexecute', callback) //(outgoingparameters) {
//                        console.log('after postexecute >> ' + JSON.stringify(outgoingparameters));
//                        callback(outgoingparameters);
//                    ;
                });
            });
        }
    }


    // Primary execute function called after doThis
    exports.executeFn = executeFn = function (params, target, callback) {
        if ((params['executethis'] !== undefined) && (params['executethis'] !== "")) {
            var functionToExecute = params['executethis'];
            if (typeof window[functionToExecute] === 'function') {
                //delete params["executethis"];  // **
                // check for number of params
                var param_count = window[functionToExecute].length;

                if (param_count === 1) {
                    // if the function to call accepts only 1 parameter, it
                    // does not have a callback...so use this version
                    callback(executethis(params, functionToExecute));
                } else {
                    // This version assumes a callback is present,
                    // so we will not use a version with a return...it has to be
                    // a callback
                    window[functionToExecute](params, target, callback);
                    // window[functionToExecute](params, target, function(data) {
                    //     console.log(' ****** executeFn receiving data');
                    //     callback(data);
                    // window.data = data;
                    // var ret = undefined;
                    //  while(typeof ret === 'undefined'){
                    //         if(typeof window.data!=='undefined'){
                    //         console.log(' ****** executeFn got it');
                    //         ret = window.data;
                    //         return ret;
                    //     }else{
                    //         console.log(' ****** executeFn waiting');
                    //     }
                    // }
                    // printToDiv('Function executeFn',  params);
                    // callback(ret);
                    // });


                }
            } else {
                // console.log("No function by that name nothing to do in executefn ...");
                callback(params);
            }
        } else {
            // console.log("Nothing to do in executefn...");
            callback(params);
        }
    }

    // primary conmmand router based on what it reads from config
    exports.doThis = doThis = function (params, target, callback) {
        // console.log('>>>>>>>>>>>> From doThis '+ target +' >>> '+JSON.stringify(params));
        // TolowerCase all incoming parameters
        var config0 = config.configuration;
        // ToLower the incoming config first level keys
        config0 = util.toLowerKeys(config0);

        var incomingConfiguration = params['configuration'];

        // override config for howToDo
        if ((typeof incomingConfiguration !== 'undefined') && (typeof incomingConfiguration[target] !== '')) {
            incomingConfiguration = util.toLowerKeys(incomingConfiguration);

            if ((typeof config0[params[target]]) !== 'object') {
                // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                config0[target] = {};
            }
            // console.log('Loading"' + JSON.stringify(incomingConfiguration[target]) + ' onto config0...');
            config0[target] = incomingConfiguration[target];
        }


        var howToDoList = config0[target];


        // console.log("How to do list: " + JSON.stringify(howToDoList));

        for (var item in howToDoList) {
            // Override config0 for whatToDo
            if ((typeof incomingConfiguration !== 'undefined') && (incomingConfiguration[params[target]] !== undefined)) {
                incomingConfiguration = util.toLowerKeys(incomingConfiguration);
                if ((typeof config0[params[target]]) !== 'object') {
                    // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                    config0[params[target]] = {};
                }
                // console.log('Loading"' + JSON.stringify(incomingConfiguration[params[target]]) + ' onto config0...');
                config0[params[target]] = incomingConfiguration[params[target]];

            }

            var whatToDoList = config0[params[target]];
            var howToDo = howToDoList[item]['dothis'];

            // console.log("What to do list: " + JSON.stringify(whatToDoList));

            // if (whatToDoList !== undefined) { // make sure we have a list from config, if not just go execute it
            if ((whatToDoList !== undefined) && (whatToDoList != "")) { // make sure we have a list from config, if not just go execute it
                for (var whatitem in whatToDoList) {
                    // console.log('>>>>>>>>>>>> configuration <'+ target +'> >>> '+JSON.stringify(howToDoList));

                    var whatToDo = whatToDoList[whatitem]['dothis'];
                    // console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                    params['executethis'] = whatToDo;
                    // clean up params
                    delete params[target];
                    window[howToDo](params, target, callback);
                }
            } else {
                // console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
                if (window[howToDo] && (params[target])) {
                    params['executethis'] = params[target];
                    // Clean up the params, do not want executethis: something and a midexecute : something
                    delete params[target];
                    window[howToDo](params, target, callback);
                } else {
                    // console.log("Nothing to do in dothis...");
                    callback(params);
                }
            }

            if (window[howToDo] && typeof window[howToDo] === 'function') {
                break;
            }
        }
    }

    /*****  older 'fake' sync executethis functions **End**/

})(typeof window == "undefined" ? global : window);