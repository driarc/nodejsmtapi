'use strict';

var config = require('../config.js');
// execute method --- method called numbered (1)
exports.execute = function(incomingparameters, callback){

//    {
//     "executethis": "a",
//     "b": "c",
//     "configuration": {
//         "midexecute": [
//             {
//                 "doThis": "dothis"
//             }
//         ],
//         "a": [
//             {
//                 "order": 0,
//                 "doThis": "server",
//                 "parameters": {
//                     "b": [
//                         {
//                             "order": 0,
//                             "parameters": {},
//                             "doThis": "alertfn"
//                         }
//                     ]
//                 }
//             }
//         ]
//     }
// }

    incomingparameters = util.toLowerKeys(incomingparameters);
    incomingparameters['midexecute']=incomingparameters['executethis'];
    delete incomingparameters['executethis']

    // getAllParameters(incomingparameters);

    // pre-execute method --- method called numbered (2)
    doThis(incomingparameters,'preexecute',false,function(incomingparameters){
        delete incomingparameters['preexecute'];
        console.log('after preexecute >> '+JSON.stringify(incomingparameters));
        // mid-execute method --- method called numbered (3)
        doThis(incomingparameters,'midexecute',false,function(outgoingparameters){
            delete incomingparameters['midexecute'];
            console.log('after executethis >> '+JSON.stringify(outgoingparameters));
            // post-execute method --- method called numbered (4)
            doThis(outgoingparameters,'postexecute',false,function(outgoingparameters){
                delete incomingparameters['postexecute'];
                console.log('after postexecute >> '+JSON.stringify(outgoingparameters));
                callback(outgoingparameters);
            });
        });
    });
}

function doThis(incomingparameters,targetparameter, skipProcessConfig, callback){// allparameters ,'preexecute','preexecute'.configuration,callback
    
    var configurationO = config.configuration;
    var incomingConfiguration = incomingparameters['configuration'];

    // modify default config accordingly -- if overridable config is received 
    if(configurationO && incomingConfiguration && configurationO[targetparameter] && incomingConfiguration[targetparameter]){
        if((typeof configurationO[targetparameter])!=='object'){
            configurationO[targetparameter] = new Array();
        }
        configurationO[targetparameter].push(incomingConfiguration[targetparameter]);
    }


    if(incomingparameters[targetparameter] && configurationO[targetparameter]){
        incomingparameters = util.toLowerKeys(incomingparameters);
        configurationO = util.toLowerKeys(configurationO);

        var targetparameterValue=incomingparameters[targetparameter];
        var doThisArray = configurationO[targetparameter];  // get config for this targetparameter

        if(!skipProcessConfig){
            processConfig(incomingparameters, targetparameter,  doThisArray, function(outgoingparameters){
                callback(outgoingparameters);// return to execute method to proceed
            });
        }else{
            // this is the recursed call as part of the configuration
            var data = undefined;
            if(incomingparameters['executethis'] && (window[incomingparameters['executethis']]) && ((typeof window[incomingparameters['executethis']]) === 'function')){
                window[incomingparameters['executethis']](incomingparameters,targetparameter,true, function(data){
                    callback(data);
                })
            }else{
                callback(data);
            }

        }

    }else{
        if(!skipProcessConfig){
            callback(incomingparameters);
        }else{
            callback(undefined);
        }
    }
        
}


function processConfig(params,target,doThisArray, callback){

    var success=false;
    for(var ctr=0;ctr < doThisArray.length; ctr++){
        if(window[doThisArray[ctr]['doThis']]){
            // alert('from processConfig method >>> '+JSON.stringify(params));
            if(doThisArray[ctr]['parameters']){
                for(var param in doThisArray[ctr]['parameters']){
                    params[param] = doThisArray[ctr]['parameters'][param];
                }
            }

            // call doThis function in context
            window[doThisArray[ctr]['doThis']](params,target, true, function(data){
                if(data){
                    // alert(' processConfig function callback >>> '+ JSON.stringify(data));
                    // stop processing 
                    success=true;
                    callback(data);
                }
            });


        }
        if(success){
            break;
        }
    }

}



// if attributes called 'preexecute' && 'configuration.preexecute' both exist
// execute 'preexecute' using a common method(pass all parameters (original parameters + configuration.preexecute.parameters))
// once complete remove preexecute and configuration.preexecute from configuration(optional)

// if attributes called 'executethis' && 'configuration.executethis' both exist
// execute 'executethis' using a common method(pass all parameters (original parameters + configuration.executethis.parameters))
// once complete remove executethis and configuration.executethis from configuration(optional)

// if attributes called 'postexecute' && 'configuration.postexecute' both exist
// execute 'postexecute' using a common method(pass all parameters (original parameters + configuration.postexecute.parameters))
// once complete remove postexecute and configuration.postexecute from configuration(optional)


// Configuration sample 
// 
// {
//     "configuration": {
//         "preExecuteThis": [
//             {
//                 "order": 0,
//                 "doThis": "executeFunction"
//             },
//             {
//                 "order": 1,
//                 "doThis": "executeVariable"
//             }
//         ]
//     }
// }
//
// config.midexecute=doThis:executeThis
// translation: go find a parameter called mid execute
// x=its value
// …now call function doThis…make sure to send to it a parmarameter called {executeThis:<x>}




function executeVariable(params,target,skipProcessConfig, callback){
    // alert('execute variable called');]
    delete params['configuration'];
    var params = util.toLowerKeys(params);
    callback();
}


function executeParameter(params,target,skipProcessConfig,  callback){
    // alert('execute parameters called');
    delete params['configuration'];
    var params = util.toLowerKeys(params);
    callback();
}


// helper functions for processing required :: server 
function getFromMongo(params, callback){
    //alert('getFromMongo called');
    delete params['configuration'];
    var params = util.toLowerKeys(params);
    callback(params);
}


function addToMongo(params, callback){
    //alert('getFromMongo called');
    delete params['configuration'];
    var params = util.toLowerKeys(params);
    callback(params);
}

function alertFn(params, callback){
    // alert('alertFn called');
    delete params['configuration'];
    var params = util.toLowerKeys(params);
    callback(params);
}

