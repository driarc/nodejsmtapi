// Server specific Routes here
var mongoskin = require('mongoskin')
  , mongoose = require('mongoose')
  , config = require('../config.js')
  , db = mongoskin.db(config.MONGODB_URL, config.MONGODB_OPTIONS)
  , SkinStore = require('connect-mongoskin')
  , path = require('path')
  , dao = require('../dao/mongo.js')
  , superagent = require('superagent')
  , filecheck = require('../scrapejob/scrape.js')
  , addget = require('../dao/addget.js')
  // , executethis = require('../../dripoint/saurshaz/wip/scripts/executethis.js')
  , executethis = require('../routes/executethis.js')
  , util = require('../util.js')
  , drifn = require('../dao/dri_functions.js')
  , querym = require('../dao/querym.js');

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

    var item = req.body;
    console.log(JSON.stringify(item));

    executethis.executethis(item,function(data){
        console.log(JSON.stringify(data));
        res.send(data);
        res.end();
    })
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
