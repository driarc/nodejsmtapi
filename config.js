

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

var test99 = global.test99 = function(params, target, callback){
	console.log('from test99 method');
	callback( mongoquery({"wid":"test1"},"mongoquery",function(data){
		console.log(JSON.stringify(data));
		console.log('from callback of test99 method');
		return data;
	}));
}


exports.proxyprinttodiv = proxyprinttodiv = function(text, obj, debugone){
    // printToDiv(text, obj, debugone);    // comment this in server version
}

exports.configuration=configuration;

