(function (window) {
      // 'use strict';

    if(typeof require !== 'undefined'){// *** Added by Saurabh for making it node compatible 11/11
        var config=require('../config.js')// *** Added by Saurabh for making it node compatible 11/11
    }else{// *** Added by Saurabh for making it node compatible 11/11
        exports = {};// *** Added by Saurabh for making it node compatible 12/11
    }

    'use strict';
    var execute
      , executethis
      , executeFn
      , doThis
      // , exports = {};


// add test ****
    // execute method --- method called numbered (1)
    exports.execute = window.execute = execute = function (incomingparams, callback) {
        console.log('arrived in execute ' + incomingparams);
        incomingparams = util.toLowerKeys(incomingparams);

        //*** add if 'test2'
        console.log(' *** test2  '+ JSON.stringify(incomingparams));
        if (incomingparams["executethis"]==="test2") {
            return callback({'test2':'Reached test2 code.. execute function'});
        }

        if (incomingparams["addthis"]) {
            addthisfn(incomingparams, callback);
            //addthisfn(incomingparams  , function(results) { // corrected by roger ***
            //    callback(results);
            //});
        }
        else {
            incomingparams['midexecute'] = incomingparams['executethis'];
            // ** roger added line below 11-10
            delete incomingparams['executethis'];
            console.log('starting preexecute ' + incomingparams);
            // pre-execute method --- method called numbered (2)
            doThis(incomingparams, 'preexecute', function (preResults) {
                console.log(' after preexecute >> '+ nonCircularStringify(preResults));
                console.log('starting midexecute ' + preResults);
                if(!preResults){preResults={};} // ** added by Roger
                // mid-execute method --- method called numbered (3)
                doThis(preResults, 'midexecute', function (midResults) {
                    console.log(' after midexecute >> ' + nonCircularStringify(midResults));
                    //if (midResults && midResults.midexecute) { delete midResults['midexecute']; }
                    // line above take anway by Roger, added below *** not sure why needed, but needed
                    if(!midResults){midResults={};}
                    // post-execute method --- method called numbered (4)
                    doThis(midResults, 'postexecute', function(postResults) {
                        console.log(' after postexecute >> ' + nonCircularStringify(postResults));
                        if(!postResults){postResults={};} // ** added by Roger
                        callback(postResults);
                    });
                });
            });
        }
    };


    // Primary execute function called from doThis
    // this is a function router, it looks inside parm executethis...accepts strings or functions
    // it is the reponsability of what gets called to remove paramter executethis from results
    exports.executeFn = window.executeFn = executeFn = function (params, callback) {

       //*** add if 'test3'
        console.log(' *** test3  '+ JSON.stringify(params));
        if (params["executethis"]==="test3") {
            return callback({'test3':'Reached test3 code.. executeFn function '});
        }

        if ((params['executethis'] !== undefined) && (params['executethis'] !== "")
            && (window[params['executethis']] || params['executethis'] instanceof Function)) {  // ** added ()
            var windowFunc;
            if(params['executethis'] instanceof Function) { windowFunc = params['executethis']; }  // function was passed in
            else { windowFunc = window[params['executethis']]; }  // function name was passed in as string

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

    // primary command router based on what it reads from config and execeptions sent in parameter configuration.
    exports.doThis = doThis = function (params, target, callback) {
        var w,
            h,
            whatToDo,
            whatToDoList,
            howToDo,
            howToDoList,
            config0,
            incomingConfig,
            targetfunction; // added by roger

        //*** add if 'test4'
        console.log(' *** test4  '+ JSON.stringify(params));
        if (params["executethis"]==="test4") {
            return callback({'test4':'Reached test4 code.. doThis function '});
        }
        // it is possible the function sent in a string or an actual function...we need to convert to string 
        // so we can look up config -- line below added by Roger ***
        if(params[target] instanceof Function) { targetfunction = params[target].name; }  // function was passed in
            else { targetfunction = params[target]; }  // function name was passed in as string

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

            //if ((typeof config0[params[target]]) !== 'object') {  *** line below changed by Roger -- look by string
            if (typeof config0[targetfunction] !== 'object') {
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
            // if ((incomingConfig !== 'undefined') && (incomingConfig[params[target]] !== '')) { -- changed by Roger **
            if ((incomingConfig !== 'undefined') && (incomingConfig[targetfunction] !== '')) {
                incomingConfig = util.toLowerKeys(incomingConfig);
                // if ((typeof config0[params[target]]) !== 'object') { -- changed by Roger **
                if ((typeof config0[targetfunction]) !== 'object') {
                    // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                    //config0[params[target]] = {};  changed by roger **
                    config0[targetfunction] = {};
                }
                // console.log('Loading"' + JSON.stringify(incomingConfiguration[params[target]]) + ' onto config0...');
                //config0[params[target]] = incomingConfig[params[target]]; -- changed by roger **
                config0[targetfunction] = incomingConfig[targetfunction];
            }

            //whatToDoList = config0[params[target]]; -- changed by roger **
            whatToDoList = config0[targetfunction];
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
                    //params['executethis'] = targetfunction; 
                    // ** we really should use this line, but lukes tests check for returned executethis, thus we need string
                    //
                    // Clean up the params, do not want executethis: something and a midexecute : something
                    delete params[target];
                    if (howToDo instanceof Function) {
                        // howToDo(params, function(results) { callback(results); }); *** changed by roger
                        howToDo(params, callback);
                    }

                }
                else {
                    console.log(" Nothing to do in dothis, sending back params...");
                    delete params[target]; // added by roger
                    callback(params);
                }
            }

            if (howToDo instanceof Function) {
                break;
            }
        }
    };

    var addthisfn = function (inputWidgetObject, callback) {
        proxyprinttodiv('Function addthis in : inputWidgetObject', inputWidgetObject);
        inputWidgetObject["wid"] = inputWidgetObject["addthis"];
        delete inputWidgetObject["addthis"];
        updatewid(inputWidgetObject, callback)
        proxyprinttodiv('Function addthis in : x', resultObj);
        callback(results);
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

        /// executethis is a function router that will return result synchronously
        /// 1st argument -- input parameters, 2nd parameter -- callback function
        /// second parameter must be a function, if not sent in will be defaulted to 'execute'
        /// if the function to be called has only one input object then this fn will wait for results (act asynch)
    exports.executethis = window.executethis = executethis = function executethis(inboundparms, targetfunction) {

        // if test1 ***
        if (inboundparms["executethis"]==="test1") {
            return {'test1':'Reached test1 code.. executethis function'};
        }

        console.log(' >>>> executethis function from executethis before calling execute with parameters >>> ' + nonCircularStringify(inboundparms));
        if (!targetfunction || !targetfunction instanceof Function) { targetfunction = execute; }

        var params = util.toLowerKeys(inboundparms)
            , argCount = 0
            , result;

        proxyprinttodiv('Function executethis params',  params,99);
        proxyprinttodiv('Function executethis fn', String(targetfunction),99);
        console.log('targetfunction length => ' + targetfunction.length);
        if (targetfunction.length !== undefined) { argCount = targetfunction.length; }

        if (argCount === 1) {
            return targetfunction(params);
        } else if (argCount > 1) {
            targetfunction(params, function(data) {
                if (data) {result = data} else {result={}}
            });

            // var retResult = undefined;
            // function counter()
            // {
            //    retResult = result;
            // }
            // var idx = setInterval(function() {
            //     if(!result){
            //         counter();
            //     }else{
            //         clearInterval(idx);
            //     }
            // }, 100);
            
            // return retResult;

            var retResult = undefined;
            var cnt=0;
            
            function counter()
            {
               retResult = result;
               cnt++;
            }
            
            var idx = setInterval(function() {
                if((!result) && (cnt<50)) {
                    counter();
                }else{
                    clearInterval(idx);
                }
            }, 100);
            
            if(!retResult){retResult={}}
            return retResult;    
        }
    };

})(typeof window == "undefined" ? global : window);
