// Server specific Routes here
var mongoskin = require('mongoskin')
  , mongoose = require('mongoose')
  , config = require('../config.js')
  , db = mongoskin.db(config.MONGODB_URL, config.MONGODB_OPTIONS)
  , SkinStore = require('connect-mongoskin')
  , path = require('path')
  , dao = require('../dao/mongo.js')
  , superagent = require('superagent')
  , filecheck = require('../scrapejob/scrape.js');

var TABLE_NAME = config.TABLE_NAME;

console.log(TABLE_NAME +' is the name of the table !!! ');

        
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

/// logic for executeThis
exports.executethis = function(req, res) {

    var item = req.body[0];

    item = toLowerKeys(item);
    console.log(JSON.stringify(item));

   if (item && item.addthis && item.executethis) {
        //  handle AddThis as a command 
        console.log(' AddThis operation. ' + JSON.stringify(item));

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

    }else if (item && item.executethis) {
        console.log('------------------------------------------------');
        console.log(' <<<<<<<<<<<<<<< PRe , ExecuteThis AND  Post operation. >>>>>>>>>>>>>>>>>>>> ');


            var funcT = item.executethis;
            console.log('funcT -- '+funcT);
            switch (funcT.toLowerCase()) {

                case 'extractthis':
                    //  handle extractThis case
                    // call the file check codeZ
                    callScrapeLogic(res, function(nodeObjects){
                        if(nodeObjects){
                            handleProcessHtmlPersistence(nodeObjects, function(){
                                handleAddThisPersistence(nodeObjects, function(){
                                    res.send(nodeObjects);
                                    res.end();
                                });
                            });
                        }
                    });
                
                    break;      


                case 'javascript':
                    //  handle javascript case
                    var jsFunction = JSON.stringify(item.js);

                    var regex = 'function(\()([^)]*)(\))';

                    var re = new RegExp(regex, 'gi');
                    var array = re.exec(jsFunction);
                    var params = array[1];
                    params = params.replace(/\(/g,'');

                    // var arr = [1,2];// TODO :: fix parsing of parameters as array
                    var options = [];
                    var pArr = params.split(',');
                    for(var i=0;i < pArr.length;i++){
                        options.push(item[pArr[i].trim()]);
                    }
                    eval("var fnCreated = "+eval(jsFunction));
                    console.log(' returned value is >> '+ options);
                    var returned = fnCreated.apply(this,options);
                    res.send({"result" : returned});
                    res.end();
                    break;            

                case 'variable':
                    
                    // TODO ::javascript,variable, executeMultiple, addwidmaster and getwidmaster    
    
                  
    

                case 'getfrommongo':
                    // handle get from mongo DB logic

                    // call get from mongo DB 
                    var rec = {"wid":item.wid};
                    console.log("Fetching one record "+JSON.stringify(rec));
                    dao.getFromMongo(rec,config.TABLE_NAME,function(obj){
                        console.log("Fetched from Mongo DB  - "+ JSON.stringify(obj));
                        res.send(obj);
                        res.end();
                    });
                    break;    

                case 'getwid':
                    // handle getwid :: 
                    if(item.fromwid){
                        // call get from mongo DB 
                        var widVal = item.fromwid;
                        var widFromProperty = item.fromproperty;

                        console.log("getwid ::: Fetching one record , with fromWid "+widVal);
                        getFromMongo({"wid":widVal},config.TABLE_NAME,function(obj){

                            if(obj){
                                // get JSOn from DB
                                console.log("getwid ::: Fetched from Mongo DB  - "+ JSON.stringify(obj));
                                if(widFromProperty){
                                    // return property only
                                    obj = JSON.parse('{"'+widFromProperty+'":"'+obj.data[widFromProperty]+'"}');
                                }

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
                    if(item.wid){
                        // get JSOn to be saved
                        var entityToAdd = cleanParameters(item,["executethis","preexecute","postexecute","fromwid"]);
                        
                        // if fromProperty exists, then copy that as a new property
                        if(entityToAdd.fromproperty){
                            delete  entityToAdd.fromproperty;
                        }
                        
                        // if toProperty exists, then copy that as a new property
                        if(entityToAdd.toproperty){
                            delete  entityToAdd.toproperty;
                        }
                        
                        // if status exists and equals 5, then delete the wid data
                        if(item.status){
                            if(item.status === "5" || item.status === 5){
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
                    var rec = {};
                    if(typeof item.wid === 'object'){
                        rec = item.wid;
                    }else{
                        rec = cleanParameters(item,["executethis","wid","preexecute","postexecute","fromwid"]);
                    }
                    console.log("Add to mongo record -- "+JSON.stringify(rec));
                    dao.addOrUpdate(rec,TABLE_NAME,function(o){
                        console.log("After adding to Mongo - "+ JSON.stringify(o));
                        res.send(o);
                        res.end();
                    });
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
                            res.send(returnedObject);
                            res.end();
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
    else {
        res.send({
            "error": "Requires a valid parameter : executeThis"
        });
    }
};


function cleanParameters(inboundParameters,paramsToClean){
    var outBoundParameters = inboundParameters;
    
    for(var i=0;i<paramsToClean.length;i++){
        if(outBoundParameters[paramsToClean[i]]){
            delete outBoundParameters[paramsToClean[i]];
        }
    } 
    return outBoundParameters;
}

function mergeParameters(c1,c2){
    var mergedMap = c1;

    for(key in c2 && (!c1[key])){
        c1[key] = c2[key];
    };

    return c1;
} 


function toLowerKeys(obj){
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newobj={}
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
}
