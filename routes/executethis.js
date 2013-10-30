'use strict';
var config = require('../config.js');
require('../dao/mongo.js');
require('../dao/addget.js');
require('../dao/querym.js');

if(!global){
    global = {};
}

(function(window) {
    
    

     // make sure the global is clear
    window.data = null

    // start polling at an interval until the data is found at the global
    var intvl = setInterval(function() {
        if (window.data) { 
            clearInterval(intvl);
            // console.log(data);
        }
    }, 100);


    /// logic for executeThis --> accepts 1st argument -- input parameters, 2nd parameter -- callback function
    // var executethis = function(inboundparms, targetfunction) {
    exports.executethis = function(inboundparms, targetfunction) {
        console.log(' >>>> executethis function from executethis before calling execute with parameters >>> '+JSON.stringify(inboundparms));
        // console.log(' >>>> executethis function .. before calling callback >>> '+targetfunction);

        if (typeof targetfunction !== 'function') { targetfunction = execute; }

        var params = util.toLowerKeys(inboundparms);

        console.log('targetfunction string is function => ' + (typeof targetfunction).toString() === 'function');
        console.log('typeof targetfunction as a string => ' + (typeof targetfunction).toString());
        console.log('is equal to execute => ' + targetfunction === execute);
        if (typeof targetfunction === 'function'){
            if (targetfunction === execute) {
                targetfunction(params, function(data) {
                    window.data = data;
                });
            } else {
                targetfunction;
            }
        }

        // targetfunction(inboundparms);
        
        // if(!targetfunction){
        //     targetfunction = 'execute';
        // } 
       
        // if(window[targetfunction]){

        //     var parmnum=window[targetfunction].length;
        //     inboundparms = util.toLowerKeys(inboundparms);  
            
        //     if (parmnum===1) {
        //         var params = inboundparms;  
        //         // var params = JSON.parse(inboundparms[0]);  
        //         params = util.toLowerKeys(params);  
        //         // start the async
        //         var data_to_return = window[targetfunction](params);
        //         return data_to_return;
        //     }else{
        //         var params = inboundparms;  
        //         // start the async
        //         window[targetfunction](params, function(data) {
        //             window.data = data;
        //         });

        //         return window.data;
        //     }
                
        // }else{
        //     return window.data;
        // }
    }



      

    function addthisfn(inputWidgetObject) {
        printToDiv('Function addthis in : inputWidgetObject',  inputWidgetObject);
        inputWidgetObject["wid"]=inputWidgetObject["addthis"];
        delete inputWidgetObject["addthis"];
        resultObj=addtomongo(inputWidgetObject);
        printToDiv('Function addthis in : x',  resultObj);
        return resultObj;
    }



    // execute method --- method called numbered (1)
    var execute = function(incomingparameters, callback){
       if (incomingparameters["executethis"] === "test") {
            incomingparameters["imAlive"] = "true";
            callback(incomingparameters);
        }
        incomingparameters['midexecute']=incomingparameters['executethis'];
        delete incomingparameters['executethis']

        // getAllParameters(incomingparameters);

        // pre-execute method --- method called numbered (2)
        doThis(incomingparameters,'preexecute',function(incomingparameters){

            // console.log('after preexecute >> '+JSON.stringify(incomingparameters));
            // mid-execute method --- method called numbered (3)
            doThis(incomingparameters,'midexecute',function(outgoingparameters){

                if(!outgoingparameters){
                    outgoingparameters ={};
                }

                // console.log('after executethis >> '+JSON.stringify(outgoingparameters));
                // post-execute method --- method called numbered (4)
                doThis(outgoingparameters,'postexecute',function(outgoingparameters){

                    // console.log('after postexecute >> '+JSON.stringify(outgoingparameters));
                    callback(outgoingparameters);
                });
            });
        });
    }


    // Primary execute function called after doThis
    var executeFn = function(params, target,  callback){
        var functionToExecute = params['executethis'];
        if(functionToExecute !== undefined) {
            if(typeof window[functionToExecute] === 'function') {
                // delete params["executethis"];
                // check for number of params
                var param_count = window[functionToExecute].length;
                
                if (param_count === 1) {
                    // if the function to call accepts only 1 parameter, it 
                    // does not have a callback...so use this version
                    callback(executethis(params,functionToExecute));
                } else {
                    // This version assumes a callback is present
                    window[functionToExecute](params, target, function(data) {
                        callback(data);
                    });
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
    function doThis(params, target, callback) {

        console.log('>>>>>>>>>>>> From doThis '+ target +' >>> '+JSON.stringify(params));
        // TolowerCase all incoming parameters
        var config0 = config.configuration;
        // ToLower the incoming config first level keys
        config0 = util.toLowerKeys(config0);

        var incomingConfiguration = params['configuration'];

        // override config for howToDo
        if(typeof incomingConfiguration !== 'undefined' && typeof incomingConfiguration[target] !== 'undefined') {
            incomingConfiguration = util.toLowerKeys(incomingConfiguration);
            
            if((typeof config0[params[target]])!== 'object'){
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
            if(typeof incomingConfiguration !== 'undefined' && incomingConfiguration[params[target]] !== undefined) {
                incomingConfiguration = util.toLowerKeys(incomingConfiguration);
                if((typeof config0[params[target]])!== 'object'){
                        // console.log('Found a new config entry for "' + params[target] + '" building new object for it in config0...');
                        config0[params[target]] = {};
                    }
                // console.log('Loading"' + JSON.stringify(incomingConfiguration[params[target]]) + ' onto config0...');
                config0[params[target]] = incomingConfiguration[params[target]];

            }

            var whatToDoList = config0[params[target]];
            var howToDo = howToDoList[item]['dothis'];

            // console.log("What to do list: " + JSON.stringify(whatToDoList));

            if (whatToDoList !== undefined) { // make sure we have a list from config, if not just go execute it
                for (var item in whatToDoList) {
                    console.log('>>>>>>>>>>>> configuration <'+ target +'> >>> '+JSON.stringify(howToDoList));
                    
                    var whatToDo = whatToDoList[item]['dothis'];
                    // console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                    params['executethis'] = whatToDo;
                    // clean up params
                    delete params[target];
                    window[howToDo](params, target, callback);
                }
            } else {
                // console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
                if(window[howToDo]) {
                    params['executethis'] = params[target];
                    // Clean up the params, do not want executethis: something and a midexecute : something
                    delete params[target];
                    window[howToDo](params, target, callback);
                } else {
                    // console.log("Nothing to do in dothis...");
                    callback(params);
                }
            }

            if(window[howToDo] && typeof window[howToDo] === 'function'){
                break;
            }
        }
    }



})(typeof window == "undefined" ? global : window);