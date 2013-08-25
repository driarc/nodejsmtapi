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
