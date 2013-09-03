function isNumeric(val)
{
    var isnum = /^\d+$/.test(val.trim());
    console.log(" Val : "+isnum);
    return isnum;
}

console.log(isNumeric('12'));
console.log(isNumeric('12 '));
console.log(isNumeric('12O'));
console.log(isNumeric('y12'));
console.log(isNumeric('xyz'));

var request = require('request')
var db = require('mongoskin').db('mongodb://odesk:password@ds041228.mongolab.com:41228/nodejsmtapi?auto_reconnect');

/*
request({
  method: 'PUT',
  uri: 'http://wiziapi.drillar.com/ButtonServe.svc/GetData/adddatawid?accessToken=2afe5025-1964-4c50-abcf-bcd558188e74',
  headers:{ 'Content-type' : 'application/json'},
  body: '[{"ParameterName":"executeThis","ParameterValue":"DRI"},{"ParameterName":"beginInboundParameters","ParameterValue":"wid1"},{"ParameterName":"y","ParameterValue":"2"}, {"ParameterName":"accesstoken","ParameterValue":"111111111"}]'
}, function (error, response, body) {
  if(response.statusCode == 200){
    console.log('Call Success '+body);
  } else {
    console.log('error: '+ response.statusCode);
    console.log(body);
  }
})
*/

var mulWid = "wid2";
db.collection('colsam').findOne({ "wid": mulWid }, function(err, result) {
console.log(result);
var mulWidVal = result[mulWid];
var mulWidResKeys = Object.keys(mulWidVal),
irx, mulWidResLen = mulWidResKeys.length;

mulWidResKeys.sort();
console.log(mulWidResKeys);
    for (irx = 0; irx < mulWidResLen; irx++)
    {
        k = mulWidResKeys[irx];
        console.log(k + ':' + mulWidVal[k]);
    }
});

db.collection('colsam').find({ "wid": { $in : [ "wid1", "wid2" ] }}, function(err, result) {
    if (err) throw err;
    //console.log(util.inspect(resul, false, null));
    //console.log("In here "+result);
    
     result.each(function(err, re) {
        console.log(re);
    });
    
});

function convertToParamsInDTOFormat(params)
{
    var varsInDTOFormat = [];
    Object.keys(params).forEach(function(key) {
        var value = params[key];
        varsInDTOFormat.push({ 
        "ParameterName" : key,
        "ParameterValue"  : value
        });
    });
    return varsInDTOFormat;
}

db.collection('colsam').find({ "wid": { $in : [ "wid2" ] }}).toArray(function(er, resul){
    if (er) throw er;
    //console.log(util.inspect(resul, false, null));
    console.log("In here "+JSON.stringify(resul));
    console.log(convertToParamsInDTOFormat(resul[0].wid2));
});

console.log(convertToParamsInDTOFormat({"1":"wid1","2":"wid3"}));


Object.prototype.hasOwnPropertyCI = function(prop) {
      return ( function(t) {
         var ret = [];
         for (var l in t){
             if (t.hasOwnProperty(l)){
                 ret.push(l.toLowerCase());
             }
         }
         return ret;
     } )(this).indexOf(prop.toLowerCase()) > -1;
};

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
}

console.log("------------>"+{'_JS':'javascript'}.hasOwnPropertyCI('Js'));

console.log("------------>"+hasOwnPropertyCI({'jS':'javascript'},'Js'));

console.log("------------>"+getObjValCI({'jS':'javascript'},'jS'));

console.log(JSON.parse("{\"Error\":\"Unexpected token :\"}"));


function isNumeric(val)
{
    if(typeof val === 'string') val = val.trim();
    var isnum = /^\d+$/.test(val);
    return isnum;
}

console.log("-------------------------");
console.log(isNumeric('123'));
console.log(isNumeric(123));
console.log(isNumeric(' 123'));
console.log(isNumeric('123 '));
console.log(isNumeric('123q '));
console.log("-------------------------");