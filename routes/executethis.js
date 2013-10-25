'use strict';
var config = require('../config.js');

(function(window) {
    // execute method --- method called numbered (1)
    exports.execute = function(incomingparameters, callback){
        if (incomingparameters["executeThis"] == "test") {
            incomingparameters["change"] = "a";
            callback(incomingparameters);
        }

        incomingparameters = util.toLowerKeys(incomingparameters);
        incomingparameters['midexecute'] = incomingparameters['executethis'];
        delete incomingparameters['executethis']

        // getAllParameters(incomingparameters);

        // pre-execute method --- method called numbered (2)
        doThis(incomingparameters, 'preexecute', function (incomingparameters) {

            console.log('after preexecute >> ' + JSON.stringify(incomingparameters));
            // mid-execute method --- method called numbered (3)
            doThis(incomingparameters, 'midexecute', function (outgoingparameters) {

                console.log('after executethis >> ' + JSON.stringify(outgoingparameters));
                // post-execute method --- method called numbered (4)
                doThis(outgoingparameters, 'postexecute', function (outgoingparameters) {

                    console.log('after postexecute >> ' + JSON.stringify(outgoingparameters));
                    callback(outgoingparameters);
                });
            });
        });
    }

    // Primary execute function called after doThis
    var executeFn = exports.executeFn =  function(params, target, callback) {
        console.log('>>>>>> Lllll '+params);    
        var functionToExecute = params['executethis'];
        if (functionToExecute !== undefined) {
            if (typeof window[functionToExecute] === 'function') {
                window[functionToExecute](params, target, function (data) {
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
        config0 = util.toLowerKeys(config0);
        var howToDoList = config0[target];

        console.log("How to do list: " + JSON.stringify(howToDoList));

        for (var item in howToDoList) {
            var whatToDoList = config0[params[target]];
            console.log('>>>>>>>> '+JSON.stringify(global[howToDoList[item]['doThis']]));
            var howToDo = howToDoList[item]['doThis'];

            console.log("What to do list: " + JSON.stringify(whatToDoList));

            if (whatToDoList !== undefined) { // make sure we have a list from config, if not just go execute it
                for (item in whatToDoList) {
                    var whatToDo = whatToDoList[item]['doThis'];
                    console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                    params['executethis'] = whatToDo;
                    // clean up params
                    delete params[target];
                    window[howToDo](params, target, callback);
                }
            } else {
                console.log("No config for whatToDo tyring to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
                if (window[howToDo]) {
                    params['executethis'] = params[target];
                    // Clean up the params do not want executethis: something and a midexecute : something
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


