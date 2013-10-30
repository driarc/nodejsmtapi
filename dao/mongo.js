
var config = require('../config.js')
,SkinStore = require('connect-mongoskin')
, mongoskin = require('mongoskin')
,db = mongoskin.db(config.MONGODB_URL, config.MONGODB_OPTIONS);


var TABLE_NAME,schemaToLookup = config.TABLE_NAME;



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



// DAO method to remove an entry from specified collection
exports.updatetomongo = updatetomongo = function(queryObject,callback){
	
	delete updatedObject.wid;
	for (var props in queryObject.data) {
		for(var updatedProps in updatedObject){
			var containedEarlier = false;

			if(updatedProps === props){
				containedEarlier = true;
				break;
			}
			
			if(!containedEarlier){
				updatedObject[props]=queryObject.data[props];
				console.log('updatedProps '+ updatedProps);
				console.log('props '+ props);
			}
		}
	}

	delete queryObject.wid;
	
	db.collection(schemaToLookup).update(queryObject, {$set: {"data":updatedObject}}, function(err, result) {
		if (err) {
			console.error(err);
	    	callback({'error':'error '});
	    }
	    else{
		    console.log('Updated! '+ JSON.stringify(result));
		    db.collection(schemaToLookup).findOne(updatedObject, function(o){
		    	callback(getfrommongo({"_id":queryObject._id}));
			});
	    }
	});
};



// the callback function on succesful addition is also specified
exports.getfrommongo = getfrommongo = function(objToFind,callback){ 
	console.log(' ****** getFromMongo method in dao ' + JSON.stringify(objToFind));
	// Check to see if the wid name exists
    db.collection(schemaToLookup).findOne(objToFind['wid'], function(err, result) {
    	console.log(" >>> "+JSON.stringify(objToFind));
    	if (!result) {
			callback({});
	    }
	    else{
		    console.log('Found! '+ JSON.stringify(result));
	    	callback(result);
	    }
	 }); 
	
};

// DAO method to fetch unique an entry to specified collection:: the entry to be fetched is also specified :: 

// the callback function on succesful addition is also specified
exports.mongoquery = mongoquery = function(objToFind,callback){
	if(!objToFind){
		callback({});
	}
	console.log(' ****** mongoquery method in dao ' + JSON.stringify(objToFind));
	// Check to see if the wid name exists
    db.collection(schemaToLookup).findOne(objToFind, function(err, result) {
    	if (err  || (!result)) {
			console.error(err);
	    	 callback({'error':'error occurred in mongoquery'});
	    	// throw err;
	    }
	    else{
		    console.log('Found! '+ JSON.stringify(result));
	    	 callback(result);
	    }
	 }); 
	
};

// DAO method to fetch unique an entry to specified colelction:: the entry to be fetched is also specified :: 
// the callback function on successful addition is also specified
exports.getmultiplefrommongo = getmultiplefrommongo = function(objToFind,callback){
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
exports.addtomongo =  addtomongo  = function(objToAdd,callback){
	console.log(' ****** addToMongo method in dao' + JSON.stringify(objToAdd));

	for(var attr in objToAdd){
    	if(attr && attr !== 'wid' && attr !== 'data' && attr !== 'Wid' && attr !== 'data' && attr.toLowerCase() !== '_id' ){
    		if(!objToAdd.data){
    			objToAdd.data = {};
    		}
    		objToAdd.data[attr] = objToAdd[attr];
    		delete objToAdd[attr];
    	}
    }

	db.collection(schemaToLookup).insert(objToAdd, function(err, result) {
	    if (err) {
			console.error(">>>>>> ::: addToMongo ::: error" + err);
	    	callback({">>>>>> ::: addToMongo ::: error":err});
	    }
	    if (result){
	    	console.log('>>>>>> ::: addToMongo ::: Added! '+ JSON.stringify(result));
	    	callback(result);
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
