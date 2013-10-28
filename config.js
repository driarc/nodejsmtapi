
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
configuration.preexecute[1] = {};
configuration.preexecute[1].order = 0;
configuration.preexecute[1].dothis = 'server';
configuration.midexecute = [];
configuration.midexecute[0] = {};
configuration.midexecute[0].order = 0;
configuration.midexecute[0].dothis = 'executeFn';
configuration.midexecute[1] = {};
configuration.midexecute[1].order = 0;
configuration.midexecute[1].dothis = 'server';
configuration.postexecute = [];
configuration.postexecute[0] = {};
configuration.postexecute[0].order = 0;
configuration.postexecute[0].dothis = 'executeFn';
configuration.postexecute[1] = {};
configuration.postexecute[1].order = 0;
configuration.postexecute[1].dothis = 'server';
configuration.a = [];
configuration.a[0] = {};
configuration.a[0].order = 0;
configuration.a[0].dothis = 'updateWid';
configuration.b = [];
configuration.b[0] = {};
configuration.b[0].order = 0;
configuration.b[0].dothis = 'randomColors';
exports.configuration=configuration;

// Primary execute function called after doThis
exports.test3 = function(params, target,  callback){
    callback({"test":"test3 on server called"});
}