
exports.TABLE_NAME = 'maincollection';

exports.MONGODB_URL = 'mongodb://trugate:tempalte-77@ds045627.mongolab.com:45627/wikiwallettesting';

// exports.MONGODB_URL = 'mongodb://localhost:27017/nodejsmtapi'

exports.MONGODB_OPTIONS = {'safe':true,'server':true,'auto_reconnect': true, 'pool': 5} ;
exports.LOOKUP_DIR = '../dripoint/';
// exports.LOOKUP_DIR = '../html/';// for testing
exports.SERVICE_URL = 'http://localhost:3000/';


var configuration = {};
configuration.preExecuteThis = [];
configuration.preExecuteThis[0] = {};
configuration.preExecuteThis[0].order = 0;
configuration.preExecuteThis[0].doThis = 'executeFunction';
configuration.preExecuteThis[1] = {};
configuration.preExecuteThis[1].order = 0;
configuration.preExecuteThis[1].doThis = 'executeVariable';
configuration.preExecuteThis[2] = {};
configuration.preExecuteThis[2].order = 0;
configuration.preExecuteThis[2].doThis = 'executeParameter';
configuration.preExecuteThis[3] = {};
configuration.executeThis = [];
configuration.executeThis[0] = {};
configuration.executeThis[0].order = 0;
configuration.executeThis[0].doThis = 'executeFunction';
configuration.executeThis[1] = {};
configuration.executeThis[1].order = 0;
configuration.executeThis[1].doThis = 'executeVariable';
configuration.executeThis[2] = {};
configuration.executeThis[2].order = 0;
configuration.executeThis[2].doThis = 'executeParameter';
configuration.executeThis[3] = {};
configuration.postExecuteThis = [];
configuration.postExecuteThis[0] = {};
configuration.postExecuteThis[0].order = 0;
configuration.postExecuteThis[0].doThis = 'executeFunction';
configuration.postExecuteThis[1] = {};
configuration.postExecuteThis[1].order = 0;
configuration.postExecuteThis[1].doThis = 'executeVariable';
configuration.postExecuteThis[2] = {};
configuration.postExecuteThis[2].order = 0;
configuration.postExecuteThis[2].doThis = 'executeParameter';
configuration.postExecuteThis[3] = {};
configuration.getWid = [];
configuration.getWid[0] = {};
configuration.getWid[0].order = 0;
configuration.getWid[0].doThis = 'getFromMongo';
configuration.updateWid = [];
configuration.updateWid[0] = {};
configuration.updateWid[0].order = 0;
configuration.updateWid[0].doThis = 'addToMongo';
exports.configuration=configuration;
     