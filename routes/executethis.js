(function (window) {
    'use strict';
    var config = require('../config.js')
        , startexecutethis
        , execute
        , executethis
        , executeFn
        , doThis;

    // execute method --- method called numbered (1)
    exports.execute = execute = function (incomingparams, callback) {
        incomingparams = util.toLowerKeys(incomingparams);
        console.log('executejason hit!');
        var overallResults = {};
        if (incomingparams["addthis"]) {
            addthisfn(incomingparams, function(results) {
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
                    addObjectToReturn(midResults, overallResults);

                    // post-execute method --- method called numbered (4)
                    doThis(incomingparams, 'postexecute', function(postResults) {
                        //  console.log(' after postexecute >> ' + nonCircularStringify(postResults));

                        callback(overallResults);
                    });
                });
            });
        }
    };

    // Primary execute function called from doThis
    exports.executeFn = window.executeFn = executeFn = function (params, callback) {
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
        console.log('>>>> In doThis with: '+JSON.stringify(params));
        var w,
            h,
            whatToDo,
            whatToDoList,
            howToDo,
            howToDoList,
            config0 = util.toLowerKeys(config.configuration),
            incomingConfiguration = params['configuration'];

        // override config for howToDo
        if(typeof incomingConfiguration !== 'undefined' && typeof incomingConfiguration[target] !== 'undefined') {
            incomingConfiguration = util.toLowerKeys(incomingConfiguration);

            if((typeof config0[params[target]])!== 'object'){
                console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                config0[target] = {};
            }

            console.log('Loading"' + JSON.stringify(incomingConfiguration[target]) + ' onto config0...');
            config0[target] = incomingConfiguration[target];
        }

        // Build and/or list for howtodo
        howToDoList = config0[target];
        // sort by executeorder and tryorder
        howToDoList = howToDoList.sort(function(a, b) {
            if ( a.executeOrder > b.executeOrder )
                return 1;
            else if ( a.executeOrder < b.executeOrder)
                return -1;
            else if ( a.tryOrder > b.tryOrder )
                return 1;
            else if ( a.tryOrder < b.tryOrder)
                return -1;
            else
                return 0;
        });

        console.log("Sorted howToDoList: " + JSON.stringify(howToDoList));

        // Iterate through the sorted list, if the function exists
        for (h in howToDoList) {
            // set the howToDo should be Server, executeFn, etc..
            if (howToDoList.hasOwnProperty(h)) { // just making sure we are accessing an array member that exists
                console.log('hasOwnProperty(h) is true!');
                howToDo = window[howToDoList[h]['dothis']];
            }

            // if we don't find the howToDo in global then skip to the next item in the list
            if (!params[target]) {
                console.log('%c In the ' + target + ' stage with no target in params, continuing on...', 'color: #FF0000');
                callback(params);
                break;
            }
            else if (!howToDo instanceof Function) {
                if (!whatToDo) {
                    whatToDo = 'No what to do!';
                }
                console.log('%c whatToDo = ' + whatToDo + ', Trying next function...', 'color: #FF0000');
                continue;
            }

            // Override config0 for whatToDo
            if(typeof incomingConfiguration !== 'undefined' && incomingConfiguration[params[target]] !== undefined) {
                incomingConfiguration = util.toLowerKeys(incomingConfiguration);

                if((typeof config0[params[target]])!== 'object'){
                    console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                    config0[params[target]] = {};
                }

                console.log('Loading"' + JSON.stringify(incomingConfiguration[params[target]]) + ' onto config0...');
                config0[params[target]] = incomingConfiguration[params[target]];
            }

            // Build and/or list for whattodo
            whatToDoList = config0[target];

            if (whatToDoList !== undefined) {
                // sort by executeorder and tryorder
                //whatToDoList = whatToDoList.sort(function(a, b){return a.executeorder-b.executeorder});

                whatToDoList = whatToDoList.sort(function(a, b) {
                    if ( a.tryOrder > b.tryOrder )
                        return 1;
                    else if ( a.tryOrder < b.tryOrder)
                        return -1;
                    else if ( a.executeOrder > b.executeOrder )
                        return 1;
                    else if ( a.executeOrder < b.executeOrder)
                        return -1;
                    else
                        return 0;
                });

                console.log("Sorted whatToDoList: " + JSON.stringify(whatToDoList));

                // make sure we have a list from config, if not just go execute it
                for (w in whatToDoList) {
                    // set the howToDo should be something like getwidfrommongo, login1, dosomethingwithstuff, etc...
                    if (whatToDoList.hasOwnProperty(w)) {
                        whatToDo = whatToDoList[w]['dothis'];
                    }

                    // if we don't find the whatToDo in global then skip to the next item in the list
                    if (!howToDo instanceof Function){
                        console.log(whatToDo + ' was not found, trying next function...');
                        continue;
                    }

                    console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                    params['executethis'] = whatToDo;
                    // clean up params
                    delete params[target];
                    howToDo(params, function(results) { callback(results); });
                }
            }
            else { // We have a case of no config for the right hand side that needs to be handled
                console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
                if(howToDo instanceof Function) {
                    params['executethis'] = params[target];
                    if (!window[params[target]]){
                        // if we have another iteration to try, try it else go to next step in execution
                        if (howToDoList.length > 1 && howToDo !== 'server'){
                            console.log("No local function for " + params[target] + " trying next")
//                        } else if (howToDo === 'server') {  // howToDo is an actual function now, not a string.
//                            // server is a special case where the right hand side will not exist in local scope
//                            console.log("Sending " + params[target] + " to server for execution");
//                            delete params[target];
//                            server(params, target, callback);
                        } else {
                            console.log(whatToDo + ' was not found, trying next execution...');
                            // clear out this cycle execution
                            callback(params);
                        }
                    }
                }
                else {
                    console.log("Nothing to do in dothis, sending back params...");
                    callback(params);
                }
            }
        }
    };

    var addthisfn = function (inputWidgetObject, callback) {
        printToDiv('Function addthis in : inputWidgetObject', inputWidgetObject);
        inputWidgetObject["wid"] = inputWidgetObject["addthis"];
        updatewid(inputWidgetObject, function(results) {
            printToDiv('Function addthis in : x', resultObj);
            callback(results);
        });
    };

    function addObjectToReturn(fromobj, toobj) {
        for (var prop in fromobj) {
            toobj[prop] = fromobj[prop];
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