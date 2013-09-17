var mongoose = require('mongoose')
// var db = require('mongoskin').db('mongodb://odesk:password@ds041228.mongolab.com:41228/nodejsmtapi?auto_reconnect');
,SkinStore = require('connect-mongoskin')
, mongoskin = require('mongoskin')
// ,db = mongoskin.db('mongodb://localhost:27017/test', {safe:true});
,db = mongoskin.db('mongodb://odesk:password@ds041228.mongolab.com:41228/nodejsmtapi?auto_reconnect', {safe:true});

// DAO method to fetch unique an entry to specified colelction:: the entry to be fetched is also specified :: 
// the callback function on succesful addition is also specified
exports.getFromMongo = function(objToFind,schemaToLookup, callback){
	console.log(' ****** getFromMongo method in dao');
	db.collection(schemaToLookup).findOne(objToFind, function(err, result) {
		if (err) {
			console.error(err);
	    	throw err;
	    }
	    else{
		    console.log('Found! '+ JSON.stringify(result));
	    	callback(result);
	    }
	});
}

// DAO method to fetch unique an entry to specified colelction:: the entry to be fetched is also specified :: 
// the callback function on successful addition is also specified
exports.getMultipleFromMongo = function(objToFind,schemaToLookup, callback){
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
}

// DAO method to add an entry to specified schema:: the entry to be added is also specified :: 
// the callback function on succesful addition is also specified
exports.addToMongo = function(objToAdd,schemaToLookup, callback){
	console.log(' ****** addToMongo method in dao');
	db.collection(schemaToLookup).insert(objToAdd, function(err, result) {
	    if (err) 
			// callback(err);
	    	throw err;
	    if (result) 
	    	console.log('Added! '+ JSON.stringify(result));
	    	callback(result);
	});
}