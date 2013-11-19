
if(!exports){
    var exports = {};
}

var config123 = function() {
    var configuration = {};

    configuration.environment='server';

    configuration.preExecute = [];
    configuration.preExecute[0] = {};
    configuration.preExecute[0].executeorder = 0;
    configuration.preExecute[0].tryorder = 0;
    configuration.preExecute[0].dothis = 'executeFn';
    configuration.preExecute[1] = {};
    configuration.preExecute[1].executeorder = 0;
    configuration.preExecute[1].tryorder = 0;
    configuration.preExecute[1].dothis = 'executeFn';
    configuration.preExecute[2] = {};
    configuration.preExecute[2].executeorder = 0;
    configuration.preExecute[2].tryorder = 0;
    configuration.preExecute[2].dothis = 'executeGetWid';

    configuration.midExecute = [];
    configuration.midExecute[0] = {};
    configuration.midExecute[0].executeorder = 1;
    configuration.midExecute[0].tryorder = 2;
    configuration.midExecute[0].dothis = 'executeFn';
    configuration.midExecute[1] = {};
    configuration.midExecute[1].executeorder = 1;
    configuration.midExecute[1].tryorder = 1;
    configuration.midExecute[1].dothis = 'executeFn';
    configuration.midExecute[2] = {};
    configuration.midExecute[2].executeorder = 1;
    configuration.midExecute[2].tryorder = 1;
    configuration.midExecute[2].dothis = 'executeGetWid';

    configuration.postExecute = [];
    configuration.postExecute[0] = {};
    configuration.postExecute[0].executeorder = 0;
    configuration.postExecute[0].tryorder = 0;
    configuration.postExecute[0].dothis = 'executeFn';
    configuration.postExecute[1] = {};
    configuration.postExecute[1].executeorder = 0;
    configuration.postExecute[1].tryorder = 0;
    configuration.postExecute[1].dothis = 'executeFn';
    configuration.postExecute[2] = {};
    configuration.postExecute[2].executeorder = 0;
    configuration.postExecute[2].tryorder = 0;
    configuration.postExecute[2].dothis = 'executeGetWid';

    configuration.getwid = [];
    configuration.getwid[0] = {};
    configuration.getwid[0].order = 0;
    configuration.getwid[0].dothis = 'getwid';

    configuration.updatewid = [];
    configuration.updatewid[0] = {};
    configuration.updatewid[0].order = 0;
    configuration.updatewid[0].dothis = 'updatewid';

    configuration.querywid = [];
    configuration.querywid[0] = {};
    configuration.querywid[0].order = 0;
    configuration.querywid[0].dothis = 'querywid';

    return {
        "configuration": configuration
    }
};

exports.this  = config =  config123();


// exports.configuration=configuration;
// Primary execute function called after doThis
exports.test21 = global.test21 =  function test21(params, callback){
    console.log(" test  21" );
    callback({"test":"test21 on server called"});
}


// Utility function to return json with all keys in lowercase
function toLowerKeys(obj){
    var key, keys = Object.keys(obj);
    var n = keys.length;
    var newobj={}
    while (n--) {
      key = keys[n];
      newobj[key.toLowerCase()] = obj[key];
    }
    return newobj;
};
