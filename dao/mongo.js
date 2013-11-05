
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
exports.updatetomongo = updatetomongo = function(queryObject,targetfunction,callback){
	
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
			throw err;
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
global.getfrommongo = getfrommongo = function(objToFind,targetfunction,callback){ 
	var widName = objToFind['wid'];
	console.log(' ****** getFromMongo method in dao ' + JSON.stringify(widName));
	// Check to see if the wid name exists
    db.collection(schemaToLookup).findOne(widName, function(err, result) {
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
global.mongoquery = mongoquery = function(objToFind,targetfunction,callback){
	delete objToFind['executethis'];

	if(!objToFind){
		callback({});
	}
	
	  // Check to see if the wid name exists
	  
	    	      
    db.collection(schemaToLookup).findOne(objToFind, function(err, res) {
		console.log(' ****** mongoquery method in dao ' + JSON.stringify(objToFind));
	  	if(err){
	  		callback({'error':'error'});
	  	}else{
	  		var result = undefined;
	  		while(result===undefined){
	  			if(res!=undefined){
	  				result=res;
	  				// console.log(' ****** got it');
	  			}else{
	  				result =undefined;
	  				// console.log(' ****** waiting');
	  			}
	  			if(result){
	  				break;
	  			}
	  		}
	  		callback(result);
	  	}
	  });
	
};

global.mongoquery2 = mongoquery2 = function (objToFind, targetfunction, callback) {
    delete objToFind['executethis'];

    if (!objToFind) {
        callback({});
    }

    // Check to see if the wid name exists


    db.collection(schemaToLookup).findOne(objToFind, function (err, res) {
        console.log(' ****** mongoquery2 method in dao ' + JSON.stringify(objToFind));
        if (err) {
            callback({ 'error': 'error' });
        } else {
                    var result = undefined;
                    result = res;
                }
            });
            callback(result);
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
global.addtomongo =  addtomongo  = function(objToAdd,targetfunction,callback){
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


exports.addorupdate = function(entityToAdd,targetfunction,callback){
    
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
