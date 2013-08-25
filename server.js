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
        inboundParameters.set(ParameterName, ParameterValue);
        if (ParameterName === "executeThis" || ParameterName === "beginInboundParameters" || ParameterName === "accesstoken") {
            reservedParameters.set(ParameterName, ParameterValue);
        }
        else {
            leftOverParameters.set(ParameterName, ParameterValue);
        }
    });

    
    var funcT = reservedParameters.get("executeThis");

    switch (funcT) {

    case 'JavaScript': case 'DRI':
        var funcStr = "";
        if (reservedParameters.has('beginInboundParameters')) {
            var valU = reservedParameters.get('beginInboundParameters');
            db.collection('colsam').findOne({ "wid": valU }, function(err, result) {
                if (err) throw err;
                console.log("dB result : "+JSON.stringify(result));
                
                Object.keys(result).forEach(function(key) {
                    var value = result[key];
                    if(!(key==="_id"))
                    {
                        console.log(key + ":" + value);
                        leftOverParameters.set(key,value);                    
                    }
                  });  
                        var _result = "";
                        var vars = getVarsFromParams(leftOverParameters);

                console.log("Print vars : "+JSON.stringify(vars));    
                
                    switch(funcT)
                    {
                        case 'JavaScript':
                            if(leftOverParameters.has('Js'))
                            {
                                funcStr = leftOverParameters.get('Js');            
                            }
                            console.log("Function : "+funcStr);
                            _result = evalWithVariables(funcStr, vars);
                            res.send(""+_result);
                        break;
                        case 'DRI':
                            console.log("Modifying params according to the dri_call ");
                            var varsInDTOFormat = [];  
                            var hasExecuteWideqAppend = false;
                            if('ExecuteWid' in vars)
                            {
                                var vl = vars['ExecuteWid'];
                                if(vl === "getalldata")
                                {
                                    hasExecuteWideqAppend = true;
                                }    
                            }
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
                                _result = JSON.stringify(body);
                                res.send(""+_result);
                              } else {
                                _result = response.statusCode;
                                res.send(""+_result);
                              }
                            })
                        break; 
                        default:
                            res.send(""+_result);
                        break;
                        }
                //res.send(""+leftOverParamEvalFunc(leftOverParameters,funcT));    
            });
        }else
        {   
                                    var _result = "";
                        var vars = getVarsFromParams(leftOverParameters);

                console.log("Print vars : "+JSON.stringify(vars));    
                
                    switch(funcT)
                    {
                        case 'JavaScript':
                            if(leftOverParameters.has('Js'))
                            {
                                funcStr = leftOverParameters.get('Js');            
                            }
                            console.log("Function : "+funcStr);
                            _result = evalWithVariables(funcStr, vars);
                            res.send(""+_result);
                        break;
                        case 'DRI':
                            console.log("Modifying params according to the dri_call ");
                            var varsInDTOFormat = [];            
                            Object.keys(vars).forEach(function(key) {
                                    var value = vars[key];
                                    if(key==="wid")
                                    {
                                        value = 'eq:'+value;                   
                                    }
                                    varsInDTOFormat.push({ 
                                    "ParameterName" : key,
                                    "ParameterValue"  : value
                                    });
                                });  
                            console.log(" A PUT call to drillar.com executewid service : "+JSON.stringify(varsInDTOFormat));
                            request({
                              method: 'PUT',
                              uri: 'http://wiziapi.drillar.com/ButtonServe.svc/GetData/executewid?accessToken=2afe5025-1964-4c50-abcf-bcd558188e74',
                              headers:{ 'Content-type' : 'application/json'},
                              body: JSON.stringify(varsInDTOFormat)
                            }, function (error, response, body) {
                              if(response.statusCode == 200){
                                  console.log("Success --> "+body);
                                _result = JSON.stringify(body);
                                res.send(""+_result);
                              } else {
                                _result = response.statusCode;
                                res.send(""+_result);
                              }
                            })
                        break; 
                        default:
                            res.send(""+_result);
                        break;
                        }
           //res.send(""+leftOverParamEvalFunc(leftOverParameters,funcT));
        }
        break;
    case 'addToMongo':
        var rec = {};
        leftOverParameters.forEach(function(value, key) {
            rec[key] = value;
        })
        console.log(JSON.stringify(rec));
        db.collection('colsam').insert(rec, function(err, result) {
            if (err) throw res.send(err);;            
            res.send(result);
        });
        break;
    default:
        res.send(req.body);
        break;
    }
});

function evalWithVariables(func, vars) {
    return eval('('+func+')')(vars);
};

function isNumeric(val)
{
    var isnum = /^\d+$/.test(val.trim());
    //console.log(" Val : "+isnum);
    return isnum;
};

function getVarsFromParams(leftOverParameters)
{
    var vars = {};
    leftOverParameters.forEach(function(value, key) {
            if(isNumeric(value))
            {
                value = parseInt(value);
                console.log("Parsed string to Int "+value);
            }
            vars[key] = value;
            console.log("Key : "+key+" Value : "+value);
    });
    return vars;
}
function leftOverParamEvalFunc(leftOverParameters,funcT)
{
    var _result = "";
    var vars = getVarsFromParams(leftOverParameters);

console.log("Print vars : "+JSON.stringify(vars));    

    switch(funcT)
    {
        case 'JavaScript':
            if(leftOverParameters.has('Js'))
            {
                funcStr = leftOverParameters.get('Js');            
            }
            console.log("Function : "+funcStr);
            _result = evalWithVariables(funcStr, vars);
            return _result;
        break;
        case 'DRI':
            console.log("Modifying params according to the dri_call ");
            var varsInDTOFormat = [];            
            Object.keys(vars).forEach(function(key) {
                    var value = vars[key];
                    if(key==="wid")
                    {
                        value = 'eq:'+value;                   
                    }
                    varsInDTOFormat.push({ 
                    "ParameterName" : key,
                    "ParameterValue"  : value
                    });
                });  
            console.log(" A PUT call to drillar.com executewid service : "+JSON.stringify(varsInDTOFormat));
            request({
              method: 'PUT',
              uri: 'http://wiziapi.drillar.com/ButtonServe.svc/GetData/executewid?accessToken=2afe5025-1964-4c50-abcf-bcd558188e74',
              headers:{ 'Content-type' : 'application/json'},
              body: JSON.stringify(varsInDTOFormat)
            }, function (error, response, body) {
              if(response.statusCode == 200){
                  console.log("Success --> "+body);
                _result = JSON.stringify(body);
              } else {
                _result = response.statusCode;
              }
              return _result;
            });
            
            var requ = httpsync.request({
              method: 'PUT',
              uri: 'http://wiziapi.drillar.com/ButtonServe.svc/GetData/executewid?accessToken=2afe5025-1964-4c50-abcf-bcd558188e74',
              headers:{ 'Content-type' : 'application/json'},
              body: JSON.stringify(varsInDTOFormat)
            });
            var resp = requ.end();
            return resp;
        break; 
        default:
            return _result;
        break;
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