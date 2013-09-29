// Server specific Routes here
var mongoskin = require('mongoskin')
  , mongoose = require('mongoose')
  , HashMap = require('hashmap').HashMap
  , config = require('../config.js')
  , db = mongoskin.db(config.MONGODB_URL, config.MONGODB_OPTIONS)
  , SkinStore = require('connect-mongoskin')
  , path = require('path')
  , dao = require('../dao/mongo.js')
  , superagent = require('superagent')
  , filecheck = require('../scrapejob/scrape.js');

var TABLE_NAME = config.TABLE_NAME;

console.log(TABLE_NAME +' is the name of the table !!! ');

/// logic for executeThis
exports.executethis = function(req, res) {
    var inboundParameters = new HashMap();
    var leftOverParameters = new HashMap();
    var reservedParameters = new HashMap();

    var item = req.body[0];
   

    //  iterate over the input JSON 
    for(var i =0;i< req.body.length;i++) {

        // assign each JSON obj in the array received for operating
        json = req.body[i];

        console.log(">>> Request body is >> "+ JSON.stringify(json));

        for(item in json){
            // `item` is the next parameter in JSON 
            var ParameterName = item;
            var ParameterValue = json[item];

            //To lower case
            ParameterName = ParameterName.toLowerCase();
            inboundParameters.set(ParameterName, ParameterValue);

            if (ParameterName === "addthis" || ParameterName === "executethis" || ParameterName === "begininboundparameters" || ParameterName === "accesstoken" ||
               ParameterName === "multiplewid" || ParameterName === "preexecute"|| ParameterName === "postexecute" || ParameterName === "getmultiplefrommongo" ) {
                reservedParameters.set(ParameterName, ParameterValue);
            }
            else {
                leftOverParameters.set(ParameterName, ParameterValue);
            }
        } 
    };
    

    /// HANDLE ADDDATAWID logic 
    if (inboundParameters.has("adddatawid")) {
         console.log('---------'+JSON.stringify(inboundParameters));
        var repAdd = {};
        inboundParameters.forEach(function(value, key) {
            if (key !== 'adddatawid') {
                repAdd[key] = value;
            }
        });

        dao.addOrUpdate(repAdd,TABLE_NAME,function(o){
           if (err) throw res.send(err);
            res.send(result);
        });

    }else if (reservedParameters.has("addthis") && reservedParameters.has("executethis")) {
        //  handle AddThis as a command 
        console.log(' AddThis operation. ' + JSON.stringify(req.body));

        // START PROCESSING AS PER 'addThis' param of the JSON in the request body received
        filecheck.handleAddThis(req.body,function(returnedObject){
            console.log('coming back after addthis'+JSON.stringify(returnedObject));

            // save returned data to DB
            callUpdateWid(returnedObject.addThisJson[0], function(o){
                res.send({"message":"Addd Wid successfully "});
                res.end();
            });

            
        });
        console.log('After addThis logic has been processed');
        console.log('------------------------------------------------');

    }else if (reservedParameters.has("executethis")) {
        console.log('------------------------------------------------');
        console.log(' <<<<<<<<<<<<<<< PRe , ExecuteThis AND  Post operation. >>>>>>>>>>>>>>>>>>>> ');

        handlePreExecuteLogic(inboundParameters, res, function(outboundParameters){
            console.log('------------------------------------------------');
            console.log('>>> AFTER PREEXECUTE  :: coming back '+JSON.stringify(outboundParameters));
            console.log('After PREEXECUTE logic has been processed');
        
            leftOverParameters = mergeParameters(leftOverParameters,outboundParameters);
            console.log(' leftOverParameters >>  '+ JSON.stringify(leftOverParameters));

            // START PROCESSING AS PER 'executeThis' param of the JSON in the request body received
            handleExecuteThis(reservedParameters, res, leftOverParameters,function(o){
                console.log('------------------------------------------------');
                console.log('>>> AFTER EXECUTETHIS :: coming back '+JSON.stringify(o));
                console.log('After EXECUTETHIS logic has been processed');

                // PROCESS POST-EXECUTE LOGIC IF ONE HAS BEEN SPECIFIED
                handlePostExecuteLogic(inboundParameters, res, function(outboundParameters){
                        console.log('------------------------------------------------');
                        res.send(o);
                        res.end();

                        console.log('>>> AFTER POSTEXECUTE  :: coming back '+JSON.stringify(outboundParameters));
                });    
            });  

        });
    }
    else {
        res.send({
            "error": "Requires a valid parameter : executeThis"
        });
    }
};

// This is a PRE-EXECUTE Logic
function handlePreExecuteLogic(inboundParameters, res, callback){
    // PROCESS PRE-EXECUTE LOGIC IF ONE HAS BEEN SPECIFIED
    var preExecuteFunctionName = inboundParameters.get("preexecute");
    if(inboundParameters.has("preexecute") && preExecuteFunctionName){
        console.log('preExecuteFunctionName >>> '+JSON.stringify(preExecuteFunctionName));
        var outboundParameters = new HashMap();

        var requestArr = [];
        var request = {};
        
        // in case of JSON received pass the same as data for the request , in case of a non-JSON, create an executeThis JSOn     
        if('object' === typeof preExecuteFunctionName){

            // JSON passed
            if(preExecuteFunctionName.ExecuteThis){
                request = preExecuteFunctionName;
            }else{
                outboundParameters = inboundParameters;
                callback(outboundParameters);
            }
        }else{
            // STRING passed
            request.ExecuteThis = preExecuteFunctionName;
        }
        console.log('>>>>>>>>> inboundParameters before request  :::  ' + JSON.stringify(inboundParameters));
        
        requestArr.push(request);
        console.log('request  sent '+ JSON.stringify(requestArr));
        superagent.put(config.SERVICE_URL+'executethis')
                .send(requestArr)
          .end(function(e, res){
            console.log('>>>>>>>>> handlePreExecuteLogic ::: Sent another request :: PUT request ');
            
            // TODO :: append the non-reserved inbound parameters also
            outboundParameters = cleanupParameters(inboundParameters,["wid","executethis","postexecute","preexecute"]);
            // append res JSON (non-reserved) to inbound params and return
            for(attr in res.body.data){
                if(attr && attr.toLowerCase() !== "wid".toLowerCase() && attr.toLowerCase() !== "executethis" && attr.toLowerCase() !== "preexecute" && attr.toLowerCase() !== "postexecute"){
                    outboundParameters.set(attr,res.body.data[attr]);
                }
            }
            console.log(JSON.stringify('outboundParameters '+ JSON.stringify(outboundParameters)));
           
            callback(outboundParameters);
        });

        // helperFunctions[preExecuteFunctionName]();
        console.log('After pre-execute logic has been checked');
    }else{
        console.log('No pre-execute logic processed');
    }

    callback('FROM :: handlePreExecuteLogic :: Pre-execute logic processed');
    console.log('------------------------------------------------');
}

// This is a POST-EXECUTE Logic
function handlePostExecuteLogic(inboundParameters,res,callback){
    var postExecuteFunctionName = inboundParameters.get("postexecute");
    if(inboundParameters.has("postexecute") && postExecuteFunctionName){
        // handlePostExecuteLogic(inboundParameters, res, postExecuteFunctionName);
        helperFunctions[postExecuteFunctionName]();
        console.log('After post-execute logic has been checked');
    }else{
        console.log('No post-execute logic processed');
    }


    callback('FROM :: handlePostExecuteLogic :: Post-execute logic processed');
    console.log('------------------------------------------------');
}

var helperFunctions = { }; // better would be to have module create an object
helperFunctions.sayPreHello = function()
{
   console.log('LOGIC  PRE >>>>>>>>> sayPreHello');
};

helperFunctions.sayPostHello = function(){
    console.log('LOGIC  POST >>>>>>>>> sayPostHello');
};

// logic for generic AddThis functionality
function handleAddThis(reservedParameters, res,leftOverParameters, callback, addThisFlag){
    console.log(' >>>>>> Process AddThis operation only');
   
    
    callScrapeLogic(res, function(nodeObjects){
        console.log('AddThis :::: After scraping - '+JSON.stringify(nodeObjects));
        // res.writeHead(200, {"Content-Type": "application/json"});

        if(nodeObjects && nodeObjects['addThisJson'] && nodeObjects['addThisJson'].length == 0){
            // See what is to be done here
            // add to mongo DB
            var entityToAdd = {};
            leftOverParameters.forEach(function(value, key) {
                entityToAdd[key] = value;
            });
            console.log("AddThis :::: Now go ahead and add the requested JSON to mongoDB : "+JSON.stringify(entityToAdd));
            
            dao.addOrUpdate(entityToAdd,TABLE_NAME,function(o){
                console.log("AddThis :::: After adding to post extractThis callback Mongo - "+ JSON.stringify(o));
            });
        }
    });
    
}
        

// logic for generic ExecuteThis functionality
function handleExecuteThis(reservedParameters, res,leftOverParameters, callback){
    var funcT = reservedParameters.get("executethis");
    switch (funcT.toLowerCase()) {

        case 'extractthis':
            //  handle extractThis case
            // call the file check codeZ
            callScrapeLogic(res, function(nodeObjects){
                if(nodeObjects){
                    handleProcessHtmlPersistence(nodeObjects, function(){
                        handleAddThisPersistence(nodeObjects, function(){
                            callback(nodeObjects);
                        });
                    });
                }
            });
        
            break;        

        case 'getfrommongo':
            // handle get from mongo DB logic

            // call get from mongo DB 
            var rec = {"wid":leftOverParameters.get("wid")};
            console.log("Fetching one record "+JSON.stringify(rec));
            dao.getFromMongo(rec,config.TABLE_NAME,function(obj){
                console.log("Fetched from Mongo DB  - "+ JSON.stringify(obj));
                res.send(obj);
                res.end();
            });
            break;    

        case 'getmultiplefrommongo':
            // handle get multiple from mongo DB logic

            // call get from mongo DB 
            var rec = getJsonFromMap(leftOverParameters);
            console.log("Fetching multiple records for -- "+JSON.stringify(rec));
            dao.getMultipleFromMongo(rec,config.TABLE_NAME,function(obj){
                console.log("Fetched from Mongo DB  - "+ JSON.stringify(obj));
                res.send(obj);
                res.end();
            });
            break;          

        case 'javascript':
                // TODO :: Complete THIS 
                //     Then the code will fish out parameters executethis, accesstoken, beginInboundParameters from inboundParameters
                //     The 'left over' inbound parameters will be y

                //     Now read what we entered in part I
                //     Since beginInboundParameters exists, the code will readFromMongo from the value of beginInboundParamters. 
                //     It will read 'wid1': inbound = inbound + get from mongo (beginInboundParameters).  It receives
                //     [{""x":"1","wid":"wid1","Js":"function (x, y){ return x + y; }"}]

                //     So now inboundParamters has these values
                //     y:2, x:1, wid:wid1, x:1, JS: "function (x, y){ return x + y; }"

                //     The case statement will go to 'Javascript'
                //     It will look for parameter JS
                //     It will execute "value: function (x, y){ return x + y; }" with parameters wid: wid1, x:1, y:2
                //     Javascript will evaluate {value: 3}

                //     ExecuteThis returns {value: 3}
                //     Result:
                //     [{"Key":"value","Value":"3"}]
                if(reservedParameters.has('begininboundparameters')){
                    var widVal = reservedParameters.get('begininboundparameters');
                    var queryDoc = {"wid":widVal};
                    dao.getFromMongo(queryDoc,config.TABLE_NAME,function(returnedObject){
                        console.log("Fetched from Mongo DB  - "+ JSON.stringify(returnedObject));
                        if(returnedObject){
                            // value found in DB for wid provided
                            for(attr in returnedObject){
                                leftOverParameters.set(attr,returnedObject[attr]);
                            }
                            console.log("Now leftover parameters are :::   - "+ leftOverParameters);
                            // console.log(leftOverParameters);
                            function evaluateJs(reservedParameters,leftOverParameters, callback){
                                console.log('leftOverParameters '+ leftOverParameters);
                                callback();
                            };

                        }
                    });
                }
                break;
                
        case 'getwid':
            // handle getwid :: 
            if(leftOverParameters.has("wid")){
                // call get from mongo DB 
                var widVal = leftOverParameters.get("wid");
                console.log("getwid ::: Fetching one record , with wid "+widVal);
                getFromMongo({"wid":widVal},config.TABLE_NAME,function(obj){

                    if(obj){
                        // get JSOn from DB
                        console.log("getwid ::: Fetched from Mongo DB  - "+ JSON.stringify(obj));
                        res.send(obj);
                        res.end();
                    }else{
                        // get JSOn from DB
                        console.log("getwid ::: No Wid matching value, return empty JSON - ");  
                       res.send({});
                       res.end(); 
                    }
                });
            }else{
               console.log("getwid ::: No Wid specified, return empty JSON - ");  
               res.send({});
               res.end();  
            }
    
            break;     

        case 'updatewid':
            
            // handle updatewid
            console.log('>>> updatewid ::: '+JSON.stringify(leftOverParameters));
            if(leftOverParameters.has("wid")){
                // get JSOn to be saved
                var entityToAdd = getJsonFromMap(leftOverParameters);
                
                // if fromProperty exists, then copy that as a new property
                if(entityToAdd.fromproperty){
                    delete  entityToAdd.fromproperty;
                }
                
                // if toProperty exists, then copy that as a new property
                if(entityToAdd.toproperty){
                    delete  entityToAdd.toproperty;
                }
                
                // if status exists and equals 5, then delete the wid data
                if(leftOverParameters.has("status")){
                    if(leftOverParameters.get("status") == 5){
                        dao.removeFromMongo({"wid":entityToAdd.wid},config.TABLE_NAME,function(o){
                            console.log("updatewid :: After deleting node from Mongo - "+ JSON.stringify(o));  
                            res.send(o);
                            res.end();   
                        });
                    }
                }else{
                    console.log("updatewid :: Add/update record "+JSON.stringify(entityToAdd));

                    // call persistence method
                    dao.addOrUpdate(entityToAdd,config.TABLE_NAME,function(o){
                       console.log("updatewid :: After adding/updating node to Mongo - "+ JSON.stringify(o));  
                       res.send(o);
                       res.end();   
                    });
                }
                
            }else{
               console.log("updatewid ::: No Wid specified, Do Nothing - ");  
               res.send({});
               res.end();  
            }
            break;            

                
        case 'addtomongo':
            // handle ADD TO MONGO logic
            var rec = getJsonFromMap(leftOverParameters);
            console.log("Add to mongo record -- "+JSON.stringify(rec));
            dao.addOrUpdate(rec,TABLE_NAME,function(o){
                console.log("After adding to Mongo - "+ JSON.stringify(o));
                callback(o);
            });
            break;

        case 'dri':
            // TODO :: COMPLETE THIS
            break;

        case 'multiplemongo':
            // TODO :: COMPLETE THIS

            var fullURL = req.protocol + "://" + req.get('host') + req.url;
            if (reservedParameters.has('begininboundparameters')) {
                var valU = reservedParameters.get('begininboundparameters');
                db.collection(TABLE_NAME).findOne({
                    "wid": valU
                }, function(err, result) {
                    if (err) throw err;
                    console.log("dB result : " + JSON.stringify(result));

                    Object.keys(result).forEach(function(key) {
                        var value = result[key];
                        if (key !== "_id") {
                            console.log(key + ":" + value);
                            leftOverParameters.set(key.toLowerCase(), value);
                        }
                    });
                    leftOverParamEvalFunc(leftOverParameters, reservedParameters, inboundParameters, fullURL, funcT, function(err, results) {
                        if (err) throw err;
                        res.send(JSON.stringify(results));
                    });
                });
            }
            else {
                console.log("Calling function leftOverParamEvalFunc");
                leftOverParamEvalFunc(leftOverParameters, reservedParameters, inboundParameters, fullURL, funcT, function(err, results) {
                    if (err) throw err;
                    res.send(JSON.stringify(results));
                });
            }
            break;
                
        default:
            // for example if executeThis = abc and abc is not found as a case the system is supposed to go get from mongo
            // (abc)…and use the results as parameters to call again - recurse into executeThis

            // if I send executeThis {executetThis=Saurabh}
            // in case of no case match for 'Saurabh',
            // parms= getfrommongo (wid=Saurabh)
            // call executeThis(parms)

            // if wid=Saurabh = {executeThis:extractThis} then extractThis will run
            var executeThisVal = funcT.toLowerCase();
            console.log('default parameter value for executetThis is >>> '+executeThisVal);

            // call get from mongo DB 
            var queryObj = {'wid':executeThisVal};
            dao.getFromMongo(queryObj,TABLE_NAME, function(returnedObject){
                console.log('>>>>>>> Default case >>> DB returns >>>  '+ JSON.stringify(returnedObject));

                // check if object is found
                if(returnedObject){
                    // Make another request, matching data found in MongoDB
                    superagent.put(config.SERVICE_URL+'executethis')
                        .send(returnedObject)
                          .end(function(e, res){
                            console.log('>>>>>>>>> Sent another request :: ExtractThis :: PUT request ');
                            
                                
                    });
                  callback(returnedObject);
                }else{
                    // nothing to do, no matching data found in MongoDB
                    console.log('>>>>>>>>> nothing to do, no matching data found in MongoDB');
                    res.send({});
                    res.end();
                }
            });

            break;
    }
} 

function callUpdateWid(entityToAdd, callback){
    // Make another request, to update DB data
    var data = JSON.stringify(entityToAdd["data"]);
     console.log(">>>>>> callUpdateWid >>>>>>> :::: "+ data);    
    var requestObj = [];
    requestObj.push({"executethis":"updatewid","Wid":entityToAdd["wid"],"data":entityToAdd["data"]});

    superagent.put(config.SERVICE_URL+'executethis')
        .send(requestObj)
          .end(function(e, res){
            console.log('>>>>>>>>> callUpdateWid :::: Sent another request :: updatewid :: PUT request ');
            callback(res);
    });
}

function getJsonFromMap(leftOverParameters){
    var rec = {};
    leftOverParameters.forEach(function(value, key) {
        if(key != "Wid"){
            rec[key] = value;
        }
    });
    return rec;
}

function handleProcessHtmlPersistence(nodeObjects, callback){
    if(nodeObjects && nodeObjects['processHtmlJson'] && nodeObjects['processHtmlJson'][0]){
            // persist the scrape results from processHTML process   
            for(var i=0;i<nodeObjects['processHtmlJson'][0].length; i ++){
                // iterate over objects and make according entries in the DB
                var entityToAdd = nodeObjects['processHtmlJson'][0][i];
                console.log(">>>> :::: extractthis :::: processHtmlJson Now go ahead and add the requested JSON to mongoDB : "+JSON.stringify(entityToAdd));
                
                callUpdateWid(entityToAdd, function(o){
                   console.log("::: extractthis :: processHtmlJson :: After adding/updating node to Mongo - "+ o);  
                   callback();
                });
            } 
        }else{
            callback();
        }
}


function handleAddThisPersistence(nodeObjects, callback){
    if(nodeObjects && nodeObjects['addThisJson'] && nodeObjects['addThisJson'][0]){
            // persist the scrape results from processHTML process   
            for(var i=0;i<nodeObjects['addThisJson'][0].length; i ++){
                // iterate over objects and make according entries in the DB
                var entityToAdd = nodeObjects['addThisJson'][0][i];
                console.log(">>>> :::: extractthis :::: handleAddThisPersistence Now go ahead and add the requested JSON to mongoDB : "+JSON.stringify(entityToAdd));
                
                callUpdateWid(entityToAdd, function(o){
                   console.log("::: extractthis :: handleAddThisPersistence :: After adding/updating node to Mongo - "+ o);  
                   callback();
                });
            } 
        }else{
            callback();
        }
}



function callScrapeLogic(res, callback){
    var dirName = config.LOOKUP_DIR; 
    filecheck.run(dirName, function(returnJson){
        console.log(' json formatHTML array  '+JSON.stringify(returnJson));
        var objToJson = { };
        objToJson.res = res;
        callback(returnJson);
    });
}

function cleanupParameters(inboundParameters,paramsToClean){
    var outBoundParameters = inboundParameters;
    
    for(var i=0;i<paramsToClean.length;i++){
        if(outBoundParameters.has(paramsToClean[i])){
            outBoundParameters.remove(paramsToClean[i]);
        }
    } 
    return outBoundParameters;
}

function mergeParameters(c1,c2){
    var mergedMap = c1;

    for(key in c2._data){
        c1.set(key, c2._data[key]);
    };

    return c1;
} 
