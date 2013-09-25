var mongoose = require('mongoose')
,config = require('../config.js')
,SkinStore = require('connect-mongoskin')
, mongoskin = require('mongoskin')
,db = mongoskin.db(config.MONGODB_URL, config.MONGODB_OPTIONS);


var TABLE_NAME = config.TABLE_NAME;



// DAO method to remove an entry from specified colelction
exports.removeFromMongo = removeFromMongo = function(objToRemove,schemaToLookup, callback){
	db.collection(schemaToLookup).remove(objToRemove, function(err) {
		if (err) {
			console.error(err);
	    	throw err;
	    }
	    else{
		    console.log('Removed! '+ JSON.stringify(objToRemove));
	    	callback(objToRemove);
	    }
	});
};



// DAO method to remove an entry from specified collection
exports.updateToMongo = updateToMongo = function(queryObject,schemaToLookup, updatedObject, callback){
	db.collection(schemaToLookup).update(queryObject, {$set: updatedObject}, function(err, result) {
		if (err) {
			console.error(err);
	    	throw err;
	    }
	    else{
		    console.log('Updated! '+ JSON.stringify(result));
		    db.collection(schemaToLookup).findOne(updatedObject, function(o){
		    	callback(result);
			});
	    }
	});
};



// the callback function on succesful addition is also specified
exports.getFromMongo = getFromMongo = function(objToFind,schemaToLookup, callback){
	console.log(' ****** getFromMongo method in dao ' + JSON.stringify(objToFind));
	// Check to see if the wid name exists
    db.collection(schemaToLookup).findOne(objToFind, function(err, result) {
    	if (!result) {
			callback(null);
	    }
	    else{
		    console.log('Found! '+ JSON.stringify(result));
	    	callback(result);
	    }
	 }); 
	
};

// DAO method to fetch unique an entry to specified colelction:: the entry to be fetched is also specified :: 
// the callback function on successful addition is also specified
exports.getMultipleFromMongo = getMultipleFromMongo = function(objToFind,schemaToLookup, callback){
	console.log(' ****** getMultipleFromMongo method in dao');
	db.collection(schemaToLookup).find(objToFind).toArray(function(err, result) {
		if (err) {
			// console.error(err);
	    	throw err;
	    }
	    else{
	    	console.log('Found! '+ JSON.stringify(result));
    		callback(result);
        }
	});
};




// DAO method to add an entry to specified schema:: the entry to be added is also specified :: 
// the callback function on succesful addition is also specified
var addToMongo  = function(objToAdd,schemaToLookup, callback){
	console.log(' ****** addToMongo method in dao');
	db.collection(schemaToLookup).insert(objToAdd, function(err, result) {
	    if (err) {
			console.error(">>>>>> ::: addToMongo ::: error" + err);
			callback({">>>>>> ::: addToMongo ::: error":err});
	    	throw err;
	    }
	    if (result){
	    	console.log('>>>>>> ::: addToMongo ::: Added! '+ JSON.stringify(result));
	    	callback(result);
	    } 
	});

};


exports.addOrUpdate = function(entityToAdd,schemaToLookup, callback){
    
    var widVal = (entityToAdd['wid']);
    console.log('addOrUpdate :::: widVal is >>> '+widVal);
	getFromMongo({"wid":widVal},schemaToLookup,function(returnedObject){
        console.log(' >>>> addOrUpdate ::: Default case >>> DB returns >>>  '+ JSON.stringify(returnedObject));
        // check if object is found
        if(returnedObject){
            updateToMongo(returnedObject,schemaToLookup,entityToAdd,function(updatedObj){
                console.log(" >>>> addOrUpdate ::: After updating  processHtmlJson node  to Mongo - "+ JSON.stringify(updatedObj));
                callback(updatedObj);
            });
        }else{
            addToMongo(entityToAdd,schemaToLookup,function(addedObj){
                console.log(" >>>> addOrUpdate ::: After adding  processHtmlJson node  to Mongo - "+ JSON.stringify(addedObj));
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
