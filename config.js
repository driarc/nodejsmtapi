
exports.TABLE_NAME = 'maincollection';

exports.MONGODB_URL = 'mongodb://trugate:tempalte-77@ds045627.mongolab.com:45627/wikiwallettesting';

// exports.MONGODB_URL = 'mongodb://localhost:27017/nodejsmtapi'

exports.MONGODB_OPTIONS = {'safe':true,'server':true,'auto_reconnect': true, 'pool': 5} ;
exports.LOOKUP_DIR = '../dripoint/';
// exports.LOOKUP_DIR = '../html/';// for testing
exports.SERVICE_URL = 'http://localhost:3000/';


var configuration = {};
configuration.preExecute = [];
configuration.preExecute[0] = {};
configuration.preExecute[0].order = 0;
configuration.preExecute[0].doThis = 'doThis';
configuration.preExecute[1] = {};
configuration.preExecute[1].order = 0;
configuration.preExecute[1].doThis = 'executeVariable';
configuration.preExecute[2] = {};
configuration.preExecute[2].order = 0;
configuration.preExecute[2].doThis = 'executeParameter';
configuration.preExecute[3] = {};
configuration.midexecute = configuration.midexecute[0] = {};
configuration.midexecute[0].order = 0;
configuration.midexecute[0].doThis = 'doThis';
configuration.midexecute[1] = {};
configuration.midexecute[1].order = 0;
configuration.midexecute[1].doThis = 'executeVariable';
configuration.midexecute[2] = {};
configuration.midexecute[2].order = 0;
configuration.midexecute[2].doThis = 'executeParameter';
configuration.midexecute[3] = {};
configuration.postExecute = [];
configuration.postExecute[0] = {};
configuration.postExecute[0].order = 0;
configuration.postExecute[0].doThis = 'doThis';
configuration.postExecute[1] = {};
configuration.postExecute[1].order = 0;
configuration.postExecute[1].doThis = 'executeVariable';
configuration.postExecute[2] = {};
configuration.postExecute[2].order = 0;
configuration.postExecute[2].doThis = 'executeParameter';
configuration.postExecute[3] = {};
configuration.getWid = [];
configuration.getWid[0] = {};
configuration.getWid[0].order = 0;
configuration.getWid[0].doThis = 'getFromMongo';
configuration.querywid = [];
configuration.querywid[0] = {};
configuration.querywid[0].order = 0;
configuration.querywid[0].doThis = 'mongoquery';
configuration.updateWid = [];
configuration.updateWid[0] = {};
configuration.updateWid[0].order = 0;
configuration.updateWid[0].doThis = 'addToMongo';
exports.configuration=configuration;
configuration.login = [];
configuration.login[0] = {};
configuration.login[0].order = 0;
configuration.login[0].doThis = 'getdatadri';
     