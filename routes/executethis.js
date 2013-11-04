// 'use strict';
config=require('../config.js')// TODO :: REMOVE this for this file to truly become portable

 // make sure the global is clear
exports.data = {}
// var exports ={}; ** COMMENTED BY SAURABH

// start polling at an interval until the data is found at the global
var intvl = setInterval(function() {
    if (exports.data) { 
        clearInterval(intvl);
        // console.log(data);
    }
}, 100);


/// logic for executeThis --> accepts 1st argument -- input parameters, 2nd parameter -- callback function
exports.executethis = executethis = function(inboundparms, targetfunction) {
    // exports.executethis = executethis = function(inboundparms, targetfunction) {
    console.log(' >>>> executethis function from executethis before calling execute with parameters >>> '+JSON.stringify(inboundparms));
    console.log(' >>>> executethis function .. before calling callback >>> '+targetfunction);
    
    if(!targetfunction) {// ** DONE BY SAURABH 
        targetfunction = 'execute';
    }

    var parmnum=0;
    if (eval(targetfunction).length!==undefined) {parmnum=eval(targetfunction).length;}

    inboundparms = util.toLowerKeys(inboundparms);  
    
    if (parmnum===1) {
        var params = inboundparms;  
        // var params = JSON.parse(inboundparms[0]);  
        params = util.toLowerKeys(params);  
        // start the async
        var data_to_return = eval(targetfunction)(params);
        return data_to_return; 
    };
    if (parmnum>1) {   // **
        var params = inboundparms;   
        // start the async
         eval(targetfunction)(params,targetfunction, function(data) {
            exports.data = data;
            console.log(exports.data);
        });
        return exports.data;
    };
   
}


var addthisfn = function(inputWidgetObject) {
    printToDiv('Function addthis in : inputWidgetObject',  inputWidgetObject);
    inputWidgetObject["wid"]=inputWidgetObject["addthis"];
    resultObj=updatewid(inputWidgetObject);
    printToDiv('Function addthis in : x',  resultObj);
    return resultObj;
}



// execute method --- method called numbered (1)
var execute = function(incomingparameters, targetfunction, callback){
// we should add cases of targetfuctnion: execute, addthis, test
   if (incomingparameters["executethis"] === "test") {
        incomingparameters["imAlive"] = "true";
        callback(incomingparameters);
    }

    if (incomingparameters["addthis"]) {
        output=addthisfn(incomingparameters);
        callback(output);
        } 
    else
        {
        //if (!inputWidgetObject["executethis"]) {inputWidgetObject["executethis"=targetfunction}
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

                console.log('after executethis >> '+JSON.stringify(outgoingparameters));
                // post-execute method --- method called numbered (4)
                doThis(outgoingparameters,'postexecute',function(outgoingparameters){
                    console.log('after postexecute >> '+JSON.stringify(outgoingparameters));
                    callback(outgoingparameters);
                });
            });
        });
    }
}


// Primary execute function called after doThis
var executeFn = function(params, target,  callback){
    if ((params['executethis']!== undefined) && (params['executethis'] !== "")) {
        var functionToExecute = params['executethis'];
        if(typeof eval(functionToExecute) === 'function') {
            //delete params["executethis"];  // **
            // check for number of params
            var param_count = eval(functionToExecute).length;
            
            if (param_count === 1) {
                // if the function to call accepts only 1 parameter, it 
                // does not have a callback...so use this version
                callback(executethis(params,functionToExecute));
            } else {
                // This version assumes a callback is present
                eval(functionToExecute)(params, target, function(data) {
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

    // console.log('>>>>>>>>>>>> From doThis '+ target +' >>> '+JSON.stringify(params));
    // TolowerCase all incoming parameters
    var config0 = {};
    // if(!config){
    //     var config = require('../config.js');
    // }
    config0 = config.configuration;
    // ToLower the incoming config first level keys
    config0 = util.toLowerKeys(config0);

    var incomingConfiguration = params['configuration'];

    // override config for howToDo
    if((typeof incomingConfiguration !== 'undefined') && (typeof incomingConfiguration[target] !== '')) {
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
        if((typeof incomingConfiguration !== 'undefined') && (incomingConfiguration[params[target]] !== undefined)) {
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

        // if (whatToDoList !== undefined) { // make sure we have a list from config, if not just go execute it
        if ((whatToDoList !== undefined) && (whatToDoList != "")) { // make sure we have a list from config, if not just go execute it
            for (var whatitem in whatToDoList) {
                // console.log('>>>>>>>>>>>> configuration <'+ target +'> >>> '+JSON.stringify(howToDoList));
                
                var whatToDo = whatToDoList[whatitem]['dothis'];
                // console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                params['executethis'] = whatToDo;
                // clean up params
                delete params[target];
                eval(howToDo)(params, target, callback);
            }
        } else {
            // console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
            if(eval(howToDo)&& (params[target])) {
                params['executethis'] = params[target];
                // Clean up the params, do not want executethis: something and a midexecute : something
                delete params[target];
                eval(howToDo)(params, target, callback);
            } else {
                // console.log("Nothing to do in dothis...");
                callback(params);
            }
        }

        if(eval(howToDo) && typeof eval(howToDo) === 'function'){
            break;
        }
    }
}

