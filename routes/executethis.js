(function (window) {
    // 'use strict';
    // var require = require; 
    if (typeof require !== 'undefined') {
        config = require('../config.js')// TODO :: REMOVE this for this file to truly become portable
    }

    // make sure the global is clear
    // window.data = null;
    // // var exports ={}; ** COMMENTED BY SAURABH

    // // start polling at an interval until the data is found at the global
    // var intvl = setInterval(function() {
    //     if (window.data) { 
    //         clearInterval(intvl);
    //         // console.log(data);
    //     }
    // }, 100);


    /// logic for executeThis --> accepts 1st argument -- input parameters, 2nd parameter -- callback function
    exports.executethis = executethis = function (inboundparms, targetfunction) {
        // exports.executethis = executethis = function(inboundparms, targetfunction) {
        console.log(' >>>> executethis function from executethis before calling execute with parameters >>> ' + JSON.stringify(inboundparms));
        console.log(' >>>> executethis function .. before calling callback >>> ' + targetfunction);

        if (targetfunction === undefined || targetfunction === null) {
            targetfunction = 'execute';
            console.log(' >>> targetfunction replaced as  ' + targetfunction);
        }

        var parmnum = 0;
        if (window[targetfunction].length !== undefined) { parmnum = window[targetfunction].length; }

        inboundparms = util.toLowerKeys(inboundparms);

        if (parmnum === 1) {
            var params = inboundparms;
            // var params = JSON.parse(inboundparms[0]);  
            params = util.toLowerKeys(params);
            // start the async
            var data_to_return = window[targetfunction](params);
            return data_to_return;
        };
        if (parmnum > 1) {   // **
            var params = inboundparms;
            var flag = false;
            var result = {};

            window[targetfunction](params, targetfunction, function (data) {
                flag = true;
                result = data;
            });

            while (!flag) { }
            return result

            // var params = inboundparms;  
            // var ret = undefined;

            // // start the async
            // window[targetfunction](params, targetfunction, function(data) {
            //     window.data = data;
            //     console.log(window.data);
            // });

            // while(typeof ret==='undefined'){
            //     if(typeof window.data !== 'undefined'){
            //         ret = window.data;
            //         console.log(' ****** executethis got it , ret is '+ JSON.stringify(ret));
            //     }else{
            //         console.log(' ****** executethis waiting');
            //     }
            // }        
            // return ret; 
        };

    }


    var addthisfn = function (inputWidgetObject) {
        printToDiv('Function addthis in : inputWidgetObject', inputWidgetObject);
        inputWidgetObject["wid"] = inputWidgetObject["addthis"];
        resultObj = updatewid(inputWidgetObject);
        printToDiv('Function addthis in : x', resultObj);
        return resultObj;
    }



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
                    doThis(outgoingparameters, 'postexecute', function(outgoingparameters){
                        // console.log('after postexecute >> '+JSON.stringify(outgoingparameters));
                        callback(outgoingparameters);
                    });
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
                    window[functionToExecute](params, callback);
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

})(typeof window == "undefined" ? global : window);