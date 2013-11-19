
var SkinStore = require('connect-mongoskin')
, mongoskin = require('mongoskin')
, settings = require('../settings.js')
,db = mongoskin.db(settings.MONGODB_URL, settings.MONGODB_OPTIONS);


var TABLE_NAME,schemaToLookup = settings.TABLE_NAME;



// DAO method to remove an entry from specified collection
exports.removefrommongo = removefrommongo = function(objToRemove,callback){
	db.collection(schemaToLookup).remove(objToRemove, function(err) {
		if (err) {
			console.error(err);
	    	callback({'error':'error in removing'});
	    }
	    else{
		    console.log('Removed! '+ JSON.stringify(objToRemove));
	    	callback(objToRemove);
	    }
	});
};

exports.getfrommongo = getfrommongo = function(objToFind,callback){
	var widName = objToFind['wid']
      , returnData;
	// Check to see if the wid name exists
        console.log(' ****** getFromMongo method in dao ' + JSON.stringify(objToFind));
     db.collection(schemaToLookup).findOne({"wid":widName}, function (err, res) {
        if (err) {
            callback({ 'error': 'error in getfrommongo' });
        } else {
            var result = undefined;
            result = res;
            callback(res);
        }
    });
};

// DAO method to fetch unique an entry to specified collection:: the entry to be fetched is also specified :: 

// the callback function on succesful addition is also specified
exports.mongoquery = mongoquery = function(objToFind, callback){
        console.log(' ****** mongoquery method in dao ' + JSON.stringify(objToFind));
     db.collection(schemaToLookup).findOne(objToFind['rawmongoquery'], function (err, res) {
        if (err) {
            callback({ 'error': 'error' });
        } else {
            var result = undefined;
            result = res;
            callback(res);
        }
    });
};

// DAO method to fetch unique an entry to specified colelction:: the entry to be fetched is also specified :: 
// the callback function on successful addition is also specified
global.getmultiplefrommongo = getmultiplefrommongo = function(objToFind,targetfunction,callback){
	console.log(' ****** getMultipleFromMongo method in dao');
	db.collection(schemaToLookup).find(objToFind).toArray(function(err, result) {
		if (err) {
			console.error(err);
	    	// throw err;
            callback({'error':'error'});
	    }
	    else{
	    	console.log('Found! '+ JSON.stringify(result));
    		callback(result);
        }
	});
};




// DAO method to add an entry to specified schema:: the entry to be added is also specified :: 
// the callback function on succesful addition is also specified
exports.addtomongo = addtomongo = function (objToAdd, callback) {
    delete objToAdd['executethis'];
    console.log(' ****** addToMongo method in dao' + JSON.stringify(objToAdd));
    var widName = '';

    // for (var attr in objToAdd) {
    //     if (attr && attr !== 'wid' && attr !== 'data' && attr !== 'Wid' && attr !== 'data' && attr.toLowerCase() !== '_id') {
    //         if (!objToAdd.data) {
    //             objToAdd.data = {};
    //         }
    //         objToAdd.data[attr] = objToAdd[attr];
    //         delete objToAdd[attr];
    //     } else if (attr === 'wid' || attr === 'Wid') {
    //         widName = objToAdd[attr];
    //     }
    // }

    db.collection(schemaToLookup).update({"wid":widName}, objToAdd, {"upsert":true}, function (err, res) {
//        console.log(' ****** addtomongo method in dao ' + JSON.stringify(objToAdd));
        if (err) {
            console.error(">>>>>> ::: addToMongo ::: error" + err);
            callback({ " >>>>>> ::: addToMongo ::: error": err });
        }
        else {
            console.log('>>>>>> ::: addToMongo ::: Added! ' + JSON.stringify(res));
            callback({"success":true});
        }
    });

};


exports.addorupdate = function(entityToAdd,callback){
    
    var widVal = (entityToAdd['wid']);
    if(!widVal){
    	widVal = (entityToAdd['Wid']);
    }
    console.log('addOrUpdate :::: widVal is >>> '+JSON.stringify(entityToAdd));
	return getfrommongo({"wid":widVal},schemaToLookup,function(returnedObject){
        console.log(' >>>> addOrUpdate ::: Default case >>> DB returns >>>  '+ JSON.stringify(returnedObject));
        // check if object is found
        if(returnedObject){ 
            return updatetomongo(returnedObject,schemaToLookup,entityToAdd,function(updatedObj){
                console.log(" >>>> addOrUpdate ::: After updating   node  to Mongo - "+ JSON.stringify(updatedObj));
                callback(updatedObj);
            });
        }else{
            return addtomongo(entityToAdd,schemaToLookup,function(addedObj){
                console.log(" >>>> addOrUpdate ::: After adding   node  to Mongo - "+ JSON.stringify(addedObj));
                callback(addedObj);
            });
        }
    });

    
};


function get_first_property(ob) {
    for (var props in ob) {
        return props;
    }
}
