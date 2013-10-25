'use strict';
var config = require('../config.js');
require('../dao/mongo.js');

if(!global){
    global = {};
}

(function(window) {
    // execute method --- method called numbered (1)
    exports.execute = function(incomingparameters, callback){
       if(incomingparameters["executethis"] === "test")
    {
        incomingparameters["imAlive"] = "true";
        callback(incomingparameters);
    }

    incomingparameters = util.toLowerKeys(incomingparameters);
    incomingparameters['midexecute']=incomingparameters['executethis'];
    delete incomingparameters['executethis']

    // getAllParameters(incomingparameters);

    // pre-execute method --- method called numbered (2)
    doThis(incomingparameters,'preexecute',function(incomingparameters){

        console.log('after preexecute >> '+JSON.stringify(incomingparameters));
        // mid-execute method --- method called numbered (3)
        doThis(incomingparameters,'midexecute',function(outgoingparameters){

            if(!outgoingparameters){
                outgoingparameters ={};
            }

            console.log('after executethis >> '+JSON.stringify(outgoingparameters));
            // post-execute method --- method called numbered (4)
            doThis(outgoingparameters,'postexecute',function(outgoingparameters){

                console.log('after postexecute >> '+JSON.stringify(outgoingparameters));
                callback(outgoingparameters);
            });
        });
    });
}


// Primary execute function called after doThis
var executeFn = global.executeFn = function(params, target,  callback){
    var functionToExecute = params['executethis'];
    if(functionToExecute !== undefined) {
        if(typeof window[functionToExecute] === 'function') {
            window[functionToExecute](params,target, function(data){
                callback(data);
            });
        } else {
            console.log("No function by that name nothing to do in executefn ...");
            callback(params);
        }
    } else {
        console.log("Nothing to do in executefn...");
        callback(params);
    }
}

function joesExecuteFn(params, target,  callback){
    var functionToExecute = params['executethis'];
    if(functionToExecute !== undefined) {
        if(typeof window[functionToExecute] === 'function') {
            window[functionToExecute](params,target, function(data){
                callback(data);
            });
        } else {
            console.log("No function by that name nothing to do in executefn ...");
            callback(params);
        }
    } else {
        console.log("Nothing to do in executefn...");
        callback(params);
    }
}

// primary conmmand router based on what it reads from config
function doThis(params, target, callback) {
    // TolowerCase all incoming parameters
    var config0 = config.configuration;
    // ToLower the incoming config first level keys
    config0 = util.toLowerKeys(config0);

    var incomingConfiguration = params['configuration'];

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

    var howToDoList = config0[target];
                
    console.log("How to do list: " + JSON.stringify(howToDoList));

    for (var item in howToDoList) {
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

        var whatToDoList = config0[params[target]];
        var howToDo = howToDoList[item]['dothis'];

        console.log("What to do list: " + JSON.stringify(whatToDoList));

        if (whatToDoList !== undefined) { // make sure we have a list from config, if not just go execute it
            for (var item in whatToDoList) {
                var whatToDo = whatToDoList[item]['dothis'];
                console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                params['executethis'] = whatToDo;
                // clean up params
                delete params[target];
                window[howToDo](params, target, callback);
            }
        } else {
            console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
            if(window[howToDo]) {
                params['executethis'] = params[target];
                // Clean up the params, do not want executethis: something and a midexecute : something
                delete params[target];
                window[howToDo](params, target, callback);
            } else {
                console.log("Nothing to do in dothis...");
                callback(params);
            }
        }
    }
}

})(typeof window == "undefined" ? global : window);
