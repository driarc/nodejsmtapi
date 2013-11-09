(function (window) {
    'use strict';
    var config = require('../config.js')
        , execute
        , executeFn
        , doThis;

    // execute method --- method called numbered (1)
    exports.execute = window.execute = execute = function (incomingparams, callback) {
        console.log('arrived in execute ' + incomingparams);
        incomingparams = util.toLowerKeys(incomingparams);
        if (incomingparams["addthis"]) {
            addthisfn(incomingparams, function(results) {
                callback(results);
            });
        }
        else {
            incomingparams['midexecute'] = incomingparams['executethis'];
//            delete incomingparams['executethis'];
            console.log('starting preexecute ' + incomingparams);
            // pre-execute method --- method called numbered (2)
            doThis(incomingparams, 'preexecute', function (preResults) {
                console.log(' after preexecute >> '+ nonCircularStringify(preResults));
                console.log('starting midexecute ' + preResults);
                // mid-execute method --- method called numbered (3)
                doThis(preResults, 'midexecute', function (midResults) {
                    console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                    if (midResults && midResults.midexecute) { delete midResults['midexecute']; }
                    // post-execute method --- method called numbered (4)
                    doThis(midResults, 'postexecute', function(postResults) {
                        console.log(' after postexecute >> ' + nonCircularStringify(postResults));
                        callback(postResults);
                    });
                });
            });
        }
    };

    // Primary execute function called from doThis
    exports.executeFn = window.executeFn = executeFn = function (params, callback) {
//        console.log('executeFn hit! and execute this is => ' + params.executethis);
//        console.log('executethis exists in window => ' + (window[params.executethis]));
//        console.log('window.getwid => ' + window.getwid);  // is showing undefined
//        console.log('window.updatewid => ' + window.updatewid);  // is showing undefined
//        console.log('window.getfrommongo => ' + window.getfrommongo);  // function is found
//        console.log('window.getwidmaster => ' + window.getwidmaster);  // is showing undefined
        if ((params.executethis !== undefined) && (params.executethis !== "")
            && (window[params.executethis] || params.executethis instanceof Function)) {
            var windowFunc;
            if(params.executethis instanceof Function) { console.log('executeFn function name => ' + params.executethis); windowFunc = params.executethis; }  // function was passed in
            else { console.log('executeFn function name => ' + window[params.executethis].name); windowFunc = window[params.executethis]; }  // function name was passed in as string

            if (windowFunc.length === 1) {
                callback(windowFunc(params));
            }
            else {
                windowFunc(params, callback);
            }
        }
        else {
            callback(params);
        }
    };

    // primary command router based on what it reads from config
    exports.doThis = doThis = function (params, target, callback) {
        var w,
            h,
            whatToDo,
            whatToDoList,
            howToDo,
            howToDoList,
            config0,
            incomingConfig;

        console.log(' Beginning doThis => '+ target +' >>> '+ nonCircularStringify(params));

        // Load in configuration and toLower
        config0 = util.toLowerKeys(config.configuration);

        // Check if we have an incoming config override
        if (params.hasOwnProperty('configuration')) {
            incomingConfig = params['configuration'];
        }
        else {
            incomingConfig = 'undefined';
        }

        // override config for howToDo if we have one
        if ((incomingConfig !== 'undefined') && (incomingConfig[target] !== '')) {
            incomingConfig = util.toLowerKeys(incomingConfig);

            if ((typeof config0[params[target]]) !== 'object') {
                // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                config0[target] = {};
            }

            // console.log('Loading"' + JSON.stringify(incomingConfiguration[target]) + ' onto config0...');
            config0[target] = incomingConfig[target];
        }

        // Load up our how to do list based on what stage we are in (pre, mid, post), then sort it
        howToDoList = config0[target];
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

        console.log(" HowToDoList => " + JSON.stringify(howToDoList));

        // iterate over our how to do list
        for (h in howToDoList) {
            // Override config0 for whatToDo
            if ((incomingConfig !== 'undefined') && (incomingConfig[params[target]] !== '')) {
                incomingConfig = util.toLowerKeys(incomingConfig);
                if ((typeof config0[params[target]]) !== 'object') {
                    // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                    config0[params[target]] = {};
                }
                // console.log('Loading"' + JSON.stringify(incomingConfiguration[params[target]]) + ' onto config0...');
                config0[params[target]] = incomingConfig[params[target]];
            }

            whatToDoList = config0[params[target]];
            if (whatToDoList !== undefined) {
                // sort by executeorder and tryorder
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
            }

            if (howToDoList.hasOwnProperty(h)) {
                howToDo = window[howToDoList[h]['dothis']];
            }

            console.log(" What to do list: " + JSON.stringify(whatToDoList));

            if ((whatToDoList !== undefined) && (whatToDoList != "")) { // make sure we have a list from config, if not just go execute it
                for (w in whatToDoList) {
                    // console.log('>>>>>>>>>>>> configuration <'+ target +'> >>> '+JSON.stringify(howToDoList));

                    if (whatToDoList.hasOwnProperty(w)){
                        whatToDo = whatToDoList[w]['dothis'];
                    }
                    params['executethis'] = whatToDo;
                    // clean up params
                    delete params[target];
                    if (howToDo instanceof Function) {
                        //howToDo(params, function(results) { callback(results); });  *** changed by roger
                        howToDo(params, callback);
                    }
                }
            }
            else {
                // console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
                if (howToDo instanceof Function && params[target]) {
                    params['executethis'] = params[target];
                    // Clean up the params, do not want executethis: something and a midexecute : something
                    delete params[target];
                    if (howToDo instanceof Function) {
                        // howToDo(params, function(results) { callback(results); }); *** changed by roger
                        howToDo(params, callback);
                    }

                }
                else {
                    console.log(" Nothing to do in dothis, sending back params...");
                    callback(params);
                }
            }

            if (howToDo instanceof Function) {
                break;
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

    /// logic for executeThis --> accepts 1st argument -- input parameters, 2nd parameter -- callback function
    exports.executethis = window.executethis = function executethis(inboundparms, targetfunction) {
        console.log(' >>>> executethis function from executethis before calling execute with parameters >>> ' + nonCircularStringify(inboundparms));
        if (!targetfunction || !targetfunction instanceof Function) { targetfunction = execute; }

        var params = util.toLowerKeys(inboundparms)
            , argCount = 0
            , result;

        console.log('targetfunction length => ' + targetfunction.length);
        if (targetfunction.length !== undefined) { argCount = targetfunction.length; }

        if (argCount === 1) {
            return targetfunction(params);
        } else if (argCount > 1) {
            targetfunction(params, function(data) {
                if(data.executethis) { delete data['executethis']; }
                result = data;
            });

            while(result === undefined){}
            return result;
        }
    };

})(typeof window == "undefined" ? global : window);