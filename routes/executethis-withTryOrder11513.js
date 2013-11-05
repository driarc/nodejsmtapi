'use strict';
// /*
// We land in executeThis
// system creates a midexecute property based on value of the executeThis property
// then we try to doThis fn preexecute
// then we try to doThis fn midexecute
// then we try to doThis fn postexecute
// --
// DoThis is a function that accepts two objects: what function to do, what parameters should be sent to that function.

// DoThis first checks to see if there is a configuration for the function to do…if there is configuration then it
// creates a exception array (i.e. we decided not to do the original sent in fn, but things related to original fn)
// based on it.

// If there are no exceptions (if array empty) it should just do the function that was originally sent in…send it
// parameters…done ELSE

// execute method --- method called numbered (1)
function execute(incomingparameters, callback){
   if (incomingparameters["executethis"] === "test") {
        incomingparameters["imAlive"] = "true";
        callback(incomingparameters);
    }
    incomingparameters['midexecute']=incomingparameters['executethis'];
    delete incomingparameters['executethis'];

    // getAllParameters(incomingparameters);

    // pre-execute method --- method called numbered (2)
    doThis(incomingparameters,'preexecute',function(incomingparameters){

        console.log('after preexecute >>>> '+JSON.stringify(incomingparameters));
        // mid-execute method --- method called numbered (3)
        doThis(incomingparameters,'midexecute',function(outgoingparameters){

            if(!outgoingparameters){
                outgoingparameters ={};
            }

            console.log('after executethis >>>> '+JSON.stringify(outgoingparameters));
            // post-execute method --- method called numbered (4)
            doThis(outgoingparameters,'postexecute',function(outgoingparameters){

                console.log('after postexecute >>>> '+JSON.stringify(outgoingparameters));
                callback(outgoingparameters);
            });
        });
    });
}


// Primary execute function called after doThis
function executeFn(params, target,  callback){
    var functionToExecute = params['executethis'];
    if(functionToExecute !== undefined) {
        if(typeof window[functionToExecute] === 'function') {
            // delete params["executethis"];
            window[functionToExecute](params, target, function(data){
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

// primary command router based on what it reads from config
function doThis(params, target, callback) {
    var w,
        h,
        whatToDo,
        whatToDoList,
        howToDo,
        howToDoList,
        config0,
        incomingConfiguration;


    console.log('>>>> In doThis with: '+JSON.stringify(params));
    // lowerCase all incoming parameters
    config0 = config.configuration;
    // ToLower the incoming config first level keys
    config0 = util.toLowerKeys(config0);

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
            howToDo = howToDoList[h]['dothis'];
        }

        // if we don't find the howToDo in global then skip to the next item in the list
        if (!params[target]) {
            console.log('%c In the ' + target + ' stage with no target in params, continuing on...', 'color: #FF0000');
            callback(params);
            break;
        }
        else if (!window[howToDo]) {
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
        whatToDoList = config0[params[target]];

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
                if (!window[whatToDo]){
                    console.log(whatToDo + ' was not found, trying next function...');
                    continue;
                } 

                console.log("Trying to execute: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + whatToDo + '"}');
                params['executethis'] = whatToDo;
                // clean up params
                delete params[target];
                window[howToDo](params, target, callback);
            }
        }
        else { // We have a case of no config for the right hand side that needs to be handled
            console.log("No config for whatToDo trying to execute directly: " + JSON.stringify(howToDo) + ' with: {"executethis":"' + params[target] + '"}');
            if(window[howToDo]) {
                params['executethis'] = params[target];
                if (!window[params[target]]){
                    // if we have another iteration to try, try it else go to next step in execution
                    if (howToDoList.length > 1 && howToDo !== 'server'){
                        console.log("No local function for " + params[target] + " trying next")
                    } else if (howToDo === 'server') {
                        // server is a special case where the right hand side will not exist in local scope
                        console.log("Sending " + params[target] + " to server for execution");
                        delete params[target];
                        server(params, target, callback);
                    } else {
                        console.log(whatToDo + ' was not found, trying next execution...');
                        // clear out this cycle execution
                        callback(params);
                    }
                } 
            }
            else {
                console.log("Nothing to do in dothis...");
                callback(params);
            }
        }
    }
}

