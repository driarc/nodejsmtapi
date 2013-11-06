
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
exports.updatetomongo = updatetomongo = function(queryObject,updatedObject,callback){
	
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
exports.getfrommongo = getfrommongo = function(objToFind,targetfunction,callback){ 

	delete objToFind['executethis'];

	var widName = objToFind['wid'];
	console.log(' ****** getFromMongo method in dao ' + JSON.stringify(objToFind));
	// Check to see if the wid name exists
    db.collection(schemaToLookup).findOne({"wid":widName}, function(err, result) {
    	if (!result) {
			callback({"error":"error in getting from mongo"});
	    }
	    else{
		    console.log('Found! '+ JSON.stringify(result));
	    	callback(result);
	    }
	 }); 
	
};

// DAO method to fetch unique an entry to specified collection:: the entry to be fetched is also specified :: 

// the callback function on succesful addition is also specified
exports.mongoquery = mongoquery = function(objToFind,targetfunction,callback){
	delete objToFind['executethis'];

	if(!objToFind){
		callback({});
	}

	console.log(' ****** mongoquery method in dao ' + JSON.stringify(objToFind));
    db.collection(schemaToLookup).findOne(objToFind, function(err, res) {
    	console.log(' ****** mongoquery method in dao -- res ' + JSON.stringify(res));
	  	if(err){
	  		callback({'error':'error'});
	  		throw err;
	  	}else{
	  		callback(res);
	  	}
	  });
	
};

// DAO method to fetch unique an entry to specified colelction:: the entry to be fetched is also specified :: 
// the callback function on successful addition is also specified
exports.getmultiplefrommongo = getmultiplefrommongo = function(objToFind,targetfunction,callback){
	console.log(' ****** getMultipleFromMongo method in dao '+JSON.stringify(objToFind));
	db.collection(schemaToLookup).find(objToFind).toArray(function(err, result) {
		if (err) {
			console.error('Error '+err);
	    	// throw err;
	    	callback({'error':'error in getting multiple records from mongo.'});
	    }
	    else{
	    	console.log('Found! '+ JSON.stringify(result));
    		callback(result);
        }
	});
};


// DAO method to fetch unique an entry to specified colelction:: the entry to be fetched is also specified :: 
// the callback function on successful addition is also specified
exports.getmultiple100frommongo = getmultiple100frommongo = function(objToFind,targetfunction,callback){
	console.log(' ****** getMultipleFromMongo method in dao '+JSON.stringify(objToFind));
	db.collection(schemaToLookup).find(objToFind).limit(100).toArray(function(err, result) {
		if (err) {
			console.error('Error '+err);
	    	// throw err;
	    	callback({'error':'error in getting multiple records from mongo.'});
	    }
	    else{
	    	console.log('Found! '+ JSON.stringify(result));
    		callback(result);
        }
	});
};




// DAO method to add an entry to specified schema:: the entry to be added is also specified :: 
// the callback function on succesful addition is also specified
exports.addtomongo =  addtomongo  = function(objToAdd,targetfunction,callback){
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


exports.addorupdate =  addorupdate = function(entityToAdd,targetfunction,callback){
    console.log(JSON.stringify(entityToAdd));
	if(entityToAdd instanceof Array){

			
        db.collection('maincollection').insert(entityToAdd,targetfunction,function(addedObj){
            console.log(" >>>> addOrUpdate ::: After adding   node  to Mongo - "+ JSON.stringify(addedObj));
            callback({'added objects':addedObj});
        });
		
		
	}else{
		console.log('individual addOrUpdate');

	    var widVal = (entityToAdd['wid']);
	    if(!widVal){
	    	widVal = (entityToAdd['Wid']);
	    }
	    console.log('addOrUpdate :::: widVal is >>> '+widVal);
		getfrommongo({"wid":widVal},targetfunction,function(returnedObject){
	        console.log(' >>>> addOrUpdate ::: Default case >>> DB returns >>>  '+ JSON.stringify(returnedObject));
	        // check if object is found
	        if(returnedObject){ 
	            updatetomongo(returnedObject,targetfunction,function(updatedObj){
	                console.log(" >>>> addOrUpdate ::: After updating   node  to Mongo - "+ JSON.stringify(updatedObj));
	                callback(updatedObj);
	            });
	        }else{	
	            addtomongo(entityToAdd,targetfunction,function(addedObj){
	                console.log(" >>>> addOrUpdate ::: After adding   node  to Mongo - "+ JSON.stringify(addedObj));
	                callback(addedObj);
	            });
	        }
	    });

	}

    
};





function get_first_property(ob) {
    for (var props in ob) {
        return props;
    }
}
