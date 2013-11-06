

exports.TABLE_NAME = 'maincollection';

exports.MONGODB_URL = 'mongodb://trugate:tempalte-77@ds045627.mongolab.com:45627/wikiwallettesting';

// exports.MONGODB_URL = 'mongodb://localhost:27017/nodejsmtapi'

exports.MONGODB_OPTIONS = {'safe':true,'server':true,'auto_reconnect': true, 'pool': 5} ;
exports.LOOKUP_DIR = '../dripoint/';
// exports.LOOKUP_DIR = '../html/';// for testing
exports.SERVICE_URL = 'http://localhost:3000/';

var configuration = {};
configuration.preexecute = [];
configuration.preexecute[0] = {};
configuration.preexecute[0].order = 0;
configuration.preexecute[0].dothis = 'executeFn';

configuration.midexecute = [];
configuration.midexecute[0] = {};
configuration.midexecute[0].order = 0;
configuration.midexecute[0].dothis = 'executeFn';


configuration.executethis = [];
configuration.executethis[0] = {};
configuration.executethis[0].order = 0;
configuration.executethis[0].dothis = 'executeFn';

configuration.postexecute = [];
configuration.postexecute[0] = {};
configuration.postexecute[0].order = 0;
configuration.postexecute[0].dothis = 'executeFn';

configuration.a = [];
configuration.a[0] = {};
configuration.a[0].order = 0;
configuration.a[0].dothis = 'updateWid';
configuration.b = [];
configuration.b[0] = {};
configuration.b[0].order = 0;
configuration.b[0].dothis = 'randomColors';
configuration.getWid = [];
configuration.getWid[0] = {};
configuration.getWid[0].tryOrder = 0;
configuration.getWid[0].dothis = 'getfrommongo';
configuration.updateWid = [];
configuration.updateWid[0] = {};
configuration.updateWid[0].tryOrder = 0;
configuration.updateWid[0].dothis = 'addorupdate';



// callback sets the received data to a global var
var asynccallback = global.asynccallback = function asynccallback(d) {
  global.data = d;
}


// Primary execute function called after doThis
var test3 = global.test3 = function(params, target, callback){
	console.log('from test3 method');
	callback({"test":"test3 on server called"});
}


require('./dao/mongo.js');
// var test99 = global.test99 = function(params, target, callback){
// 	console.log('from test99 method');
// 	return mongoquery({"wid":"test1"},"mongoquery",function(data){
// 		console.log(JSON.stringify(data));
// 		console.log('from callback of test99 method');
// 		callback(data);
// 	});
// }

function testquery(parameters) {
parameters["IAMALIVE"]="hello";
proxyprinttodiv('testquery parameters',parameters, true);
return parameters;
}



//Starting of querywid function...formerly MongoDataQuery
//exports.querywid = querywid = function(parameters,target,callback) {
exports.processadd100 = processadd100 = function(parameters, targetfunction, callback) { // can change to call back

	console.log(' *** from process100 >> ');
	delete parameters['executethis']; //
	// add 100 record and get 100 record
	var arr = [];

	// add to mongo 100 records
	for(var c=0;c<5;c++){
		var rec = {"wid":c,"text":"text","data": Math.random()};
		arr.push(rec);
	}
	addorupdate(arr,'',function(data){
		console.log(JSON.stringify(data));
		callback({'updated records':JSON.stringify(data)});
	});



}


exports.processget100 = processget100 = function(parameters, targetfunction, callback) { // can change to call back

	// get 100 records
	var ret = {"style" : "default"};
	var records = {};
	getmultiple100frommongo(ret,'',function(data){
		records = data;
		console.log(' *** from process100 >> '+ JSON.stringify(records));
		callback(records);
	});
}

exports.test99 = test99 = function(params, target, callback){
	delete params['executethis'];
	console.log('from test99 method');
	mongoquery({"wid":"test1"},"mongoquery",callback);
}


exports.proxyprinttodiv = proxyprinttodiv = function(text, obj, debugone){
    // printToDiv(text, obj, debugone);    // comment this in server version
}

exports.configuration=configuration;

