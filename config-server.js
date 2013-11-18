
if(!exports){
    var exports = {};
}

var config123 = function() {
    var configuration = {};

    configuration.environment='server';

    configuration.preexecute = [];
    configuration.preexecute[0] = {};
    configuration.preexecute[0].executeorder = 0;
    configuration.preexecute[0].tryorder = 0;
    configuration.preexecute[0].dothis = 'executeFn';
    configuration.preexecute[1] = {};
    configuration.preexecute[1].executeorder = 0;
    configuration.preexecute[1].tryorder = 0;
    configuration.preexecute[1].dothis = 'executeParam';
    configuration.preexecute[2] = {};
    configuration.preexecute[2].executeorder = 0;
    configuration.preexecute[2].tryorder = 0;
    configuration.preexecute[2].dothis = 'executeDefault';

    configuration.midexecute = [];
    configuration.midexecute[0] = {};
    configuration.midexecute[0].executeorder = 1;
    configuration.midexecute[0].tryorder = 2;
    configuration.midexecute[0].dothis = 'executeFn';
    configuration.midexecute[1] = {};
    configuration.midexecute[1].executeorder = 1;
    configuration.midexecute[1].tryorder = 1;
    configuration.midexecute[1].dothis = 'executeParam';
    configuration.midexecute[2] = {};
    configuration.midexecute[2].executeorder = 1;
    configuration.midexecute[2].tryorder = 1;
    configuration.midexecute[2].dothis = 'executeDefault';

    configuration.postexecute = [];
    configuration.postexecute[0] = {};
    configuration.postexecute[0].executeorder = 0;
    configuration.postexecute[0].tryorder = 0;
    configuration.postexecute[0].dothis = 'executeFn';
    configuration.postexecute[1] = {};
    configuration.postexecute[1].executeorder = 0;
    configuration.postexecute[1].tryorder = 0;
    configuration.postexecute[1].dothis = 'executeParam';
    configuration.postexecute[2] = {};
    configuration.postexecute[2].executeorder = 0;
    configuration.postexecute[2].tryorder = 0;
    configuration.postexecute[2].dothis = 'executeDefault';

    return {
        "configuration": configuration
    }
};

exports.this  = config =  config123();


// exports.configuration=configuration;
// Primary execute function called after doThis
exports.test21 = global.test21 = function test21(params, callback){
    console.log(" test  21" );
    callback({"test":"test21 on local called"});
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
