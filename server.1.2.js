var express = require('express');
var mongoose = require('mongoose');
var app = express();
var request = require('request');
var HashMap = require('hashmap').HashMap;
var db = require('mongoskin').db('mongodb://odesk:password@ds041228.mongolab.com:41228/nodejsmtapi?auto_reconnect');
var SkinStore = require('connect-mongoskin');
var util = require('util');
//var httpsync = require('httpsync');

/*
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Any = new Schema({ any: Schema.Types.Mixed });

var EntryModel = mongoose.model('EntryModel', Any);

mongoose.connect('mongodb://odesk:password@ds041228.mongolab.com:41228/nodejsmtapi');
var conn = mongoose.connection;
*/

app.configure(function() {
    app.use(express.bodyParser());
    //app.use(express.cookieParser());
    //app.use(express.session({cookie: { secure : false, maxAge : 86400000 }, store: new SkinStore('db')}));

});

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.listen(process.env.PORT, process.env.IP);

app.put('/executethis', function(req, res) {
    //console.log("Body : "+req.body);
    var inboundParameters = new HashMap();
    var leftOverParameters = new HashMap();
    var reservedParameters = new HashMap();

    req.body.forEach(function(item, index) {
        // `item` is the next item in the array
        // `index` is the numeric position in the array, e.g. `array[index] == item`
        var ParameterName = item.ParameterName;
        var ParameterValue = item.ParameterValue;

        //To lower case
        //var ParameterName = ParameterName.toLowerCase();
        ParameterName = ParameterName.toLowerCase();
        inboundParameters.set(ParameterName, ParameterValue);
        if (ParameterName === "executethis" || ParameterName === "begininboundparameters" || ParameterName === "accesstoken" || ParameterName === "multiplewid") {
            reservedParameters.set(ParameterName, ParameterValue);
        }
        else {
            leftOverParameters.set(ParameterName, ParameterValue);
        }
    });
    if(inboundParameters.has("adddatawid"))
    {
        var repAdd = {};
        inboundParameters.forEach(function(value, key) {
            if(key!=='adddatawid')
            {
                repAdd[key] = value;
            }
        });
        console.log(JSON.stringify(rec));
        db.collection('colsam').insert(rec, function(err, result) {
            if (err) throw res.send(err);            
            res.send(result);
        });
    }else if(reservedParameters.has("executethis"))
    {
    var funcT = reservedParameters.get("executethis");
    switch (funcT.toLowerCase()) {

    case 'javascript': case 'dri': case 'multiplemongo':
        var fullURL = req.protocol + "://" + req.get('host') + req.url;
        if (reservedParameters.has('beginInboundParameters')) {
            var valU = reservedParameters.get('beginInboundParameters');
            db.collection('colsam').findOne({ "wid": valU }, function(err, result) {
                if (err) throw err;
                console.log("dB result : "+JSON.stringify(result));
                
                Object.keys(result).forEach(function(key) {
                    var value = result[key];
                    if(key!=="_id")
                    {
                        console.log(key + ":" + value);
                        leftOverParameters.set(key,value);                    
                    }
                  });     
            leftOverParamEvalFunc(leftOverParameters,reservedParameters,inboundParameters,fullURL,funcT,function(err,results){
                if(err) throw err;
                res.send(JSON.stringify(results));    
            });   
            });
        }else
        {   
            console.log("Calling function leftOverParamEvalFunc");      
            leftOverParamEvalFunc(leftOverParameters,reservedParameters,inboundParameters,fullURL,funcT,function(err,results){
                if(err) throw err;
                res.send(JSON.stringify(results));    
            });
        }
        break;
    case 'addtomongo':
        var rec = {};
        leftOverParameters.forEach(function(value, key) {
            rec[key] = value;
        });
        console.log(JSON.stringify(rec));
        db.collection('colsam').insert(rec, function(err, result) {
            if (err) throw res.send(err);            
            res.send(result);
        });
        break;
    default:
        res.send(req.body);
        break;
    }
    }else
    {
        res.send({"error":"Requires a valid parameter : executeThis"});
    }
});

function evalWithVariables(func, vars) {
    console.log("Given eval function : "+func);
    console.log("Given vars for the function :"+JSON.stringify(vars));
    return eval('('+func+')')(vars);
}

function isNumeric(val)
{
    if(typeof val === 'string') val = val.trim();
    var isnum = /^\d+$/.test(val);
    return isnum;
}

 //function isNumeric (val) {
 //     return ! isNaN (val-0) && val !== null && val.replace(/^\s\s*/, '') !== "" && val !== false;
 //   }

function getVarsFromParams(leftOverParameters)
{
    var vars = {};
    leftOverParameters.forEach(function(value, key) {
        if(key)
        {
            if(isNumeric(value))
                {
                    value = parseInt(value);
                    console.log("Parsed string to Int "+value);
                }
                vars[key] = value;
                console.log("Key : "+key+" Value : "+value);   
        }
    });
    console.log("Done with getVarsFromParams");
    return vars;
}

function leftOverParamEvalFunc(leftOverParameters,reservedParameters,inboundParameters,fullURL,funcT,cb)
{
    
var _result = "";
var vars = getVarsFromParams(leftOverParameters);

console.log("Print vars : "+JSON.stringify(vars));

switch(funcT.toLowerCase())
{
    case 'javascript':
        try {
            var funcStr = "";
            if(leftOverParameters.has('js'))
            {
                funcStr = leftOverParameters.get('js');            
                console.log("Function : "+funcStr);
                _result = evalWithVariables(funcStr, vars);
                _result = {'Result':_result};
                console.log("eval result "+_result);
            }else
            {
                _result = {'Error':'no valid Js key/value pair'};    
            }
        }
        catch (err) {
            cb(null,{'Error':err.message});   
        }
        cb(null,_result);
    break;
    case 'dri':
        console.log("Modifying params according to the dri_call ");
        var varsInDTOFormat = [];  
        var hasExecuteWideqAppend = false;
        if(hasOwnPropertyCI(vars,'ExecuteWid'))
        {
            var vl = getObjValCI(vars,'ExecuteWid');
            if(vl === "getalldata" && vl!==null)
            {
                hasExecuteWideqAppend = true;
            }  
        }
        /*
        if('ExecuteWid' in vars)
        {
            var vl = vars['ExecuteWid'];
            if(vl === "getalldata")
            {
                hasExecuteWideqAppend = true;
            }    
        }*/
        Object.keys(vars).forEach(function(key) {
                var value = vars[key];
                if(key === "wid" && hasExecuteWideqAppend)
                {
                    value = 'eq:' + value;
                }
                varsInDTOFormat.push({ 
                "ParameterName" : key,
                "ParameterValue"  : value
                });
            });
        if(hasExecuteWideqAppend)   
        {
            var val = vars["wid"];
            vars["wid"] = 'eq:'+val;
        }
        console.log(" A PUT call to drillar.com executewid service : "+JSON.stringify(varsInDTOFormat));
        request({
          method: 'PUT',
          uri: 'http://wiziapi.drillar.com/ButtonServe.svc/GetData/executewid?accessToken=2afe5025-1964-4c50-abcf-bcd558188e74',
          headers:{ 'Content-type' : 'application/json'},
          body: JSON.stringify(varsInDTOFormat)
        }, function (error, response, body) {
          if(response.statusCode == 200){
              console.log("Success --> "+body);
            _result = body; //JSON.stringify(body);
          } else {
            _result = response.statusCode;
          }
          cb(null,_result);
        });
    break; 
    case 'multiplemongo':
        var mulWid = reservedParameters.get("multiplewid");
        db.collection('colsam').findOne({ "wid": mulWid }, function(err, result) {
            if (err) throw err;
            console.log("dB result : "+JSON.stringify(result));
            //var mulWidVal = result[mulWid];
            //var mulWidVal = result;
            var mulWidVal = {};
                Object.keys(result).forEach(function(key) {
                    var value = result[key];
                    if(key!=='_id' && key!=='wid')
                    {
                        mulWidVal[key] = value;
                    }
                });
            var mulWidResKeys = Object.keys(mulWidVal),
            irx, mulWidResLen = mulWidResKeys.length;
            
            mulWidResKeys.sort();
            for (irx = 0; irx < mulWidResLen; irx++)
            {
                var mulKey = mulWidResKeys[irx];
                console.log("   "+mulKey + ':' + mulWidVal[mulKey]);
            }
            console.log("Keys are : "+mulWidResKeys);
            var mulWidResVals = Object.values(mulWidVal);
            console.log("Vals are :" + mulWidResVals);
            //console.log(fullURL);
            var valRetCol = [];
            //db.collection('colsam').find({ "wid": { $in : mulWidResVals }}, function(err, result) {
            db.collection('colsam').find({ "wid": { $in : mulWidResVals }}).toArray(function(err, results) {
                if (err) throw err;
            //console.log(results);
            console.log("Getting all wid info from mongo for "+mulWid);
            //Getting all wids   
            for(var reskey in results)
            {
                console.log("Key : "+reskey+" - Value : "+JSON.stringify(results[reskey]));
                valRetCol[results[reskey].wid]   = results[reskey];
            }
            console.log("Storing them in an associative array for ordered use");
            //console.log(valRetCol);    
            for(var _key in valRetCol)
            {
                var value = valRetCol[_key];
                console.log("Key : "+_key+" - Value : "+JSON.stringify(value));
            }
            loopWidRequests(mulWidResLen,fullURL,mulWidResKeys,mulWidVal,valRetCol,{},function(err,results){
                if(err) throw err;
                cb(null,results);
                //res.send(results);
            });
            //res.send(""+JSON.stringify(result));
        });
    });    
    break;
    default:
        cb(null,""+_result);
    break;
    }    
}

Object.values = function (obj) {
    var vals = [];
    for( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            vals.push(obj[key]);
        }
    }
    return vals;
};
 
function getObjValCI(obj,prop)
{
    if(hasOwnPropertyCI(obj,prop))
    {
        for (var key in obj){
             if (obj.hasOwnProperty(key)){
                if(key.toLowerCase()==prop.toLowerCase())
                {
                    return obj[key];
                }
             }
         }
    }
    return null;
}

function hasOwnPropertyCI(obj,prop) {
      return ( function(t) {
         var ret = [];
         for (var l in t){
             if (t.hasOwnProperty(l)){
                 ret.push(l.toLowerCase());
             }
         }
         return ret;
     } )(obj).indexOf(prop.toLowerCase()) > -1;
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function convertToParamsInDTOFormat(params)
{
    var varsInDTOFormat = [];
    Object.keys(params).forEach(function(key) {
        var value = params[key];
        if(key!=="_id")
        {
            varsInDTOFormat.push({ 
            "ParameterName" : key,
            "ParameterValue"  : value
            });                   
        }
    });
    console.log("Converted \n"+JSON.stringify(params)+" \n to \n "+JSON.stringify(varsInDTOFormat));
    return varsInDTOFormat;
}

var resultsComb = {};
function appendResults(_resl)
{
        Object.keys(_resl).forEach(function(key) {
        resultsComb[key] = _resl[key];
        console.log("Appended key:val "+key+":"+_resl[key]);
        });  
}

function appendBothResults(objA,objB)
{
    var resultsComb = {};
    if(!(objA instanceof Object)){objA=JSON.parse(objA);}
    if(!(objB instanceof Object)){objB=JSON.parse(objB);}
    console.log("Appending Objects : "+JSON.stringify(objA)+" - "+JSON.stringify(objB));
    if(!isEmpty(objA))
    {
        Object.keys(objA).forEach(function(key) {
            if(key!=='_id') resultsComb[key] = objA[key];
        });          
    }
    if(!isEmpty(objB))
    {
        Object.keys(objB).forEach(function(key) {
            if(key!=='_id') resultsComb[key] = objB[key];
        });          
    }

    return resultsComb;
}

function merge_options(obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrName in obj2) { obj3[attrName] = obj2[attrName]; }
    return obj3;
}

function loopWidRequests(rot,fullURL,mulWidResKeys,mulWidVal,valRetCol,_resu,cb)
{
    var resultsComb = {};
    var mulWidResLen = mulWidResKeys.length;
    var irx = mulWidResLen-rot;
    if (rot===0) return cb(null,_resu);
    
    var mulKey = mulWidResKeys[irx];
    var mulVal = mulWidVal[mulKey];
    var paramsFromDB = valRetCol[mulVal];
    console.log("   mulKey : "+mulKey+" "+" mulVal : "+mulVal+"  valRetCol[mulVal] : "+JSON.stringify(valRetCol[mulVal]));
    if(paramsFromDB)
    {
        resultsComb = appendBothResults(paramsFromDB,_resu);
        console.log("Request being made with params "+JSON.stringify(resultsComb));
        request({
          method: 'PUT',
          uri: fullURL,
          headers:{ 'Content-type' : 'application/json'},
          body: JSON.stringify(convertToParamsInDTOFormat(resultsComb))
        }, function (error, response, body) {
          if(response.statusCode == 200){
            console.log("Success --> "+body);
            loopWidRequests(--rot,fullURL,mulWidResKeys,mulWidVal,valRetCol,body,cb);
          } else {
            loopWidRequests(--rot,fullURL,mulWidResKeys,mulWidVal,valRetCol,{'status':response.statusCode},cb);
          }
        });   
    }else
    {
        loopWidRequests(--rot,fullURL,mulWidResKeys,mulWidVal,valRetCol,{},cb);
    }
}
/*

function evalWithVariables(func, vars) {
 var varString = "";

 for (var i in vars)
     varString += "var " + i + " = " + vars[i] + ";";   

 eval(varString + "; var result = (" + func + ")");
 return result;
}
*/