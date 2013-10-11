
function fishOut(parameters) {

	// These are the categories of possible data sent in

	// For query building from wids
	var queParams = {};
		// For getting relationships
	var relParams = {};
	// For doing math on the result set
	var aggParams = {};
	// For adjusting the output from the query
	var addParams = {};
	// Loose params that can be applied to the query
	var xtrParams = {};

	var mongoQueryWid =  ""; // String
    if (isParameterLower(parameters, "mongoQueryWid")) {
        mongoQueryWid = parameters["mongoQueryWid"];
        queParams['mongoQueryWid'] = mongoQueryWid;
        remove(parameters, "mongoQueryWid");
 	    }
	var singlemongoquery = ""; // String I don't think we need this one
    if (isParameterLower(parameters, "singlemongoquery")) {
        singlemongoquery = parameters["singlemongoquery"];
        queParams['singlemongoquery'] = singlemongoquery;
        remove(parameters, "singlemongoquery");
        }
	var multiplemongoquery = ""; // String 
    if (isParameterLower(parameters, "multiplemongoquery")) {
        multiplemongoquery = parameters["multiplemongoquery"];
        queParams['multiplemongoquery'] = multiplemongoquery;
        remove(parameters, "multiplemongoquery");
        }
	var mongorelationshipdirection = ""; // String
    if (isParameterLower(parameters, "mongorelationshipdirection")) {
        mongorelationshipdirection = parameters["mongorelationshipdirection"];
        relParams['mongorelationshipdirection'] = mongorelationshipdirection;
        remove(parameters, "mongorelationshipdirection");
        }
	var mongorelationshiptype = ""; // String
    if (isParameterLower(parameters, "mongorelationshiptype")) {
        mongorelationshiptype = parameters["mongorelationshiptype"];
        remove(parameters, "mongorelationshiptype");
        relParams['mongorelationshiptype'] = mongorelationshiptype;
        }
	var mongorelationshipmethod = ""; // String
    if (isParameterLower(parameters, "mongorelationshipmethod")) {
        mongorelationshipmethod = parameters["mongorelationshipmethod"];
        remove(parameters, "mongorelationshipmethod");
        addParams['mongorelationshipmethod'] = mongorelationshipmethod;
        }
	var mongorelationshiprawquery = ""; // String
    if (isParameterLower(parameters, "mongorelationshiprawquery")) {
        mongorelationshiprawquery = parameters["mongorelationshiprawquery"];
        remove(parameters, "mongorelationshiprawquery");
        relParams['mongorelationshiprawquery'] = mongorelationshiprawquery;
        }
	var mongorelationshipquery = ""; // String
    if (isParameterLower(parameters, "mongorelationshipquery")) {
        mongorelationshipquery = parameters["mongorelationshipquery"];
        remove(parameters, "mongorelationshipquery");
        relParams['mongorelationshipquery'] = mongorelationshipquery;
       }
	var mongoToken = ""; // String
    if (isParameterLower(parameters, "mongoToken")) {
        mongoToken = parameters["mongoToken"];
        remove(parameters, "mongoToken");
        // -------------------------------------TODO: assign this to Params group
		}
	var mongosetfieldsinclude = ""; // String
    if (isParameterLower(parameters, "mongosetfieldsinclude")) {
        mongosetfieldsinclude = parameters["mongosetfieldsinclude"];
        remove(parameters, "mongosetfieldsinclude");
        addParams['mongosetfieldsinclude'] = mongosetfieldsinclude;
        }
	var mongosetfieldsexclude = ""; // String
    if (isParameterLower(parameters, "mongosetfieldsexclude")) {
        mongosetfieldsexclude = parameters["mongosetfieldsexclude"];
        remove(parameters, "mongosetfieldsexclude");
        addParams['mongosetfieldsexclude'] = mongosetfieldsexclude;
        }
	var mongosetlimit = ""; // String
    if (isParameterLower(parameters, "mongosetlimit")) {
        mongosetlimit = parameters["mongosetlimit"];
        remove(parameters, "mongosetlimit");
        addParams['mongosetlimit'] = mongosetlimit;
        }
	var mongosetskip = ""; // String
    if (isParameterLower(parameters, "mongosetskip")) {
        mongosetskip = parameters["mongosetskip"];
        remove(parameters, "mongosetskip");
        addParams['mongosetskip'] = mongosetskip;
        }
	var mongosethint = ""; // String
    if (isParameterLower(parameters, "mongosethint")) {
        mongosethint = parameters["mongosethint"];
        remove(parameters, "mongosethint");
        addParams['mongosethint'] = mongosethint;
        }
	var mongoSetMax = ""; // String
    if (isParameterLower(parameters, "mongosetmax")) {
        mongosetmax = parameters["mongosetmax"];
        remove(parameters, "mongosetmax");
        addParams['mongosetmax'] = mongosetmax;
        }
	var mongosetsortby = ""; // String
    if (isParameterLower(parameters, "mongosetsortby")) {
        mongosetsortby = parameters["mongosetsortby"];
        remove(parameters, "mongosetsortby");
        addParams['mongosetsortby'] = mongosetsortby;
        }
	var mongoreturncount = ""; // String
    if (isParameterLower(parameters, "mongoreturncount")) {
        mongoreturncount = parameters["mongoreturncount"];
        remove(parameters, "mongoreturncount");
        addParams['mongoreturncount'] = mongoreturncount;
        }
	var mongoexplain = ""; // String
    if (isParameterLower(parameters, "mongoexplain")) {
        mongoexplain = parameters["mongoexplain"];
        remove(parameters, "mongoexplain");
        addParams['mongoexplain'] = mongoexplain;
        }
	var mongosize = ""; // String
    if (isParameterLower(parameters, "mongosize")) {
        mongosize = parameters["mongosize"];
        remove(parameters, "mongosize");
        addParams['mongosize'] = mongosize;
        }
	var mongosetsortorder = ""; // String
    if (isParameterLower(parameters, "mongosetsortorder")) {
        mongosetsortorder = parameters["mongosetsortorder"];
        remove(parameters, "mongosetsortorder");
        addParams['mongosetsortorder'] = mongosetsortorder;
        }
	var mongoaggregation = ""; // String
    if (isParameterLower(parameters, "mongoaggregation")) {
        mongoaggregation = parameters["mongoaggregation"];
        remove(parameters, "mongoaggregation");
        aggParams['mongoaggregation'] = mongoaggregation;
    	}
	var mongodtotype = ""; // String
    if (isParameterLower(parameters, "mongodtotype")) {
        mongodtotype = parameters["mongodtotype"];
        remove(parameters, "mongodtotype");
        relParams['mongodtotype'] = mongodtotype;
    	}
		var mongorelquery = ""; // String
    if (isParameterLower(parameters, "mongorelquery")) {
        mongorelquery = parameters["mongorelquery"];
        remove(parameters, "mongorelquery");
        relParams['mongorelquery'] = mongorelquery;
      }
		var mongoaggquery = ""; // String
    if (isParameterLower(parameters, "mongoaggquery")) {
        mongoaggquery = parameters["mongoaggquery"];
        remove(parameters, "mongoaggquery");
        aggParams['mongoaggquery'] = mongoaggquery;
      }

    // Gather the left over params	
    for (i in parameters) {
    	xtrParams[i] = parameters[i];
    }

    // Slap all the groups into an array and return them
    var p = [];
    p[0] = queParams;
    p[1] = relParams;
    p[2] = aggParams;
    p[3] = addParams;
    p[4] = xtrParams;
    return p;
}

//Starting of queryWid function
function MongoDataQuery(parameters) {
	// If you see BugsBunny, you know you have a problem.
	var output = 'BugsBunny'
	mQueryString = "";

	// Fish out params
	p = fishOut(parameters);

	var queParams = p[0];
	var relParams = p[1];
	var aggParams = p[2];
	var addParams = p[3];
	var xtrParams = p[4];
		var ListOfLists = [];

		// Start logic
	
	// Use single to set up a query with the params of 1 wid
	if (queParams['singlemongoquery'] && !xtrParams) { 
  		output = "";
		var wid = queParams['singlemongoquery'];
		var widObject = getFromMongo({'wid':wid});
		delete widObject['wid'];
		output = BuildSingleQuery(widObject);
  		mQueryString = output.substring(0, output.length -1);
  		output = mQueryString;
	}
	
	// Use multiple if you want to use a list of wids as $OR groups
	// of a query to mongo
	if (queParams['multiplemongoquery']) {
		output = "";
		var paramList = {};
		var wid = queParams['multiplemongoquery'];
		var listOfWids = getFromMongo({'wid':wid});
		delete listOfWids["wid"];
		printToDiv('Function MongoDataQuery listOfWids : ', listOfWids);

    	var i = 0;
  		ListOfLists = [];
		for (w in listOfWids) {
			var tempwid = getFromMongo({'wid':w});
			delete tempwid["wid"];
			for (t in tempwid) {
				paramList[t] = tempwid[t];
			}
    		ListOfLists.push(paramList);
    		paramList = {};
		}
 		if (xtrParams) {
    		ListOfLists.push(xtrParams);
  		}
		mQueryString = BuildMultipleQuery(ListOfLists);
  		output = mQueryString;
	}

    // If there is no single or multiple, make a $OR group out of the extra params
    if (!queParams['singlemongoquery'] && !queParams['multiplemongoquery'] && getObjectSize(relParams) == 0 ){
        ListOfLists.push(xtrParams);
        mQueryString = BuildMultipleQuery(ListOfLists);
        output = mQueryString;
    }

    // Relationship Section **********
    // Skip if there are no relParams
    if (getObjectSize(relParams) != 0) {
        mQueryString = relationShipQuery(relParams);
        output = mQueryString;
    }

    // Aggregation Section **********
    // Skip if there are no aggParams
    if (getObjectSize(aggParams) != 0) {
        if (mQueryString != "") {
        	aggParams['mongoaggquery'] = mQueryString;
        }
        output = aggregationQuery(aggParams);
    }

    // Hard coding addons Section **********
    // Skip if there are no aggParams
    if (getObjectSize(addParams) != 0) {
        if (mQueryString != ""){
	        // Since addonQuery will execute a query, it needs the mQueryString to work with
	        addParams['query'] = mQueryString;
	        var data_From_Mongo = addonQuery(addParams);
	        output = data_From_Mongo;
        }
    }
	printToDiv('Function MongoDataQuery mQueryString : ', mQueryString);
	return output; // whatever happens, return the output
} // End of MongoDataQuery

// LM: TODO -- most likely delete the queryWid function
//Starting of queryWid function
function queryWid(parameters) {
	printToDiv('Function queryWid() Constant input : ', parameters );
	
	/*--- region Variable Bullpen ---*/
	var returnValues = [];
	var listOfWidNames = [];
	var listOfKVP = []
	var tempListOfKVP = [];
	
	var listsOfOrGroups = [];
	
	//var qb = new MongoQBuilder();
	
	//var connectionString = ConfigurationManager.AppSettings["MongoDBConnection"]; // String
	//var dataBaseName = ConfigurationManager.AppSettings["MongoDB"] // String
	//var collectionName = ConfigurationManager.AppSettings["MongoDBCollection"];
	var mongoQueryWid =  ""; // String
	var mongoQueryType = ""; // String
    var mQueryString = ""; // String
	
	var mongoRelationshipDirection = ""; // String
	var mongoRelationshipType = ""; // String
	var mongoRelationshipMethod = ""; // String
	var mongoRelationshipRawQuery = ""; // String
	var mongoRelationshipQuery = ""; // String
	var mongoToken = ""; // String
	
	var mongoSetFieldsInclude = ""; // String
	var mongoSetFieldsExclude = ""; // String
	var mongoSetLimit = ""; // String
	var mongoSetSkip = ""; // String
	var mongoSetHint = ""; // String
	var mongoSetMax = ""; // String
	var mongoSetSortBy = ""; // String
	var mongoReturnCount = ""; // String
	var mongoExplain = ""; // String
	var mongoSize = ""; // String
	var mongoSetSortOrder = ""; // String
	var mongoAggregation = ""; // String
	var mongodtotype = ""; // String
	
	var tempDataModeldto = [];
	/*---  end of the region ---*/
	
	var output ={};

	/*---  region Fishing Out Parameter Keywords ---*/
	// Fish out the keywords from the parameterdto's Set to GME
	if (isParameterLower(parameters, "mongodtotype")) {
		var first = firstOrDefault(parameters, "mongodtotype");
		mongodtotype = first.ParameterValue;
		remove(parameters, "mongodtotype");
	}
	if (isParameterLower(parameters, "mongoaggregation")) {
		var first = firstOrDefault(parameters, "mongoaggregation");
		mongoAggregation = first.ParameterValue;
		remove(parameters, "mongoaggregation");
	}
		
	var output = getFromMongo(parameters);

	/*if(!parameters.hasOwnProperty("relationshiprawmongoquery") && !parameters.hasOwnProperty("relationshipsinglemongoquery") && !parameters.hasOwnProperty("relationshipmultiplemongoquery")){
		var txt ="";
		txt += "Error Description: " + "Invalid Parameters in queryWid" + "\n\n";
		txt += "Click OK to continue. \n\n";
		alert(txt);
		return output;
	}*/
	
	if (isParameterLower(parameters, "relationshiprawmongoquery")) {
		if(parameters.hasOwnProperty("relationshiprawmongoquery")){
			output = parameters.relationshiprawmongoquery;			
		}
	}
	
	if (isParameterLower(parameters, "relationshipsinglemongoquery")) {
		if(parameters.hasOwnProperty("relationshipsinglemongoquery")){
			var wid = parameters.relationshipsinglemongoquery;
			var widObject = getFromMongo({'wid':wid});
			delete widObject["wid"];
			output = BuildSingleQuery(widObject);
		}
	}	
	
	if (isParameterLower(parameters, "relationshipmultiplemongoquery")) {
		if(parameters.hasOwnProperty("relationshipmultiplemongoquery")){
			var wid = parameters.relationshipmultiplemongoquery;
			var widObject = getFromMongo({'wid':wid});
			delete widObject["wid"];
			output = BuildMultipleQuery(widObject);
		}
	}	

	printToDiv('Function queryWid() output : ', output );
	return output;
}//End of queryWid function

// Pulls data out of something...in this case, local storage. At some point, 
// this needs to point to either local storage
// or mongo; based on a flag maybe.?.


//Starting of mongo function
function mongo(mquerystring) {
	printToDiv('Function mongo() Constant input : ', mquerystring );
	
	var output={};
	
	var widSet=[];
	switch(mquerystring){
		case 'set1':
			widSet =  ['1', '2', '3'];
			break;
		case 'set2':
			widSet =  ['wid200', 'wid300'];
			break;
		case 'set3':
			widSet=  ['wid100', 'wid100'];
			break;
	}

	for(wid in widSet){
		var widName = widSet[wid];
		var widObject = getFromMongo({'wid':widName});
		output[widName]=widObject;
	}
	
	printToDiv('Function mongo() out with  output : ', output );	
	return output;
}//End of mongo function

//Starting of relationShipQuery function
function relationShipQuery(parameters) {
	printToDiv('Function relationShipQuery() Constant input : ', parameters );
	
	var output ={};

	// Simply checking to make sure all the data is here
	if(!(parameters.hasOwnProperty("mongorelationshipdirection") && parameters.hasOwnProperty("mongorelationshiptype") && parameters.hasOwnProperty("mongorelationshipmethod"))){
		var txt ="";
		txt += "Error Description: " + "Invalid Parameters in relationShipQuery" + "\n\n";
		txt += "Click OK to continue. \n\n";
		alert(txt);
		return output;
	}
    // Pull out the correct vars
    if (isParameterLower(parameters, "mongorelationshipdirection")) {
        var direction = parameters["mongorelationshipdirection"];
        remove(parameters, "mongorelationshipdirection");
    }
    if (isParameterLower(parameters, "mongorelationshiptype")) {
        var type = parameters["mongorelationshiptype"];
        remove(parameters, "mongorelationshiptype");
    }
    if (isParameterLower(parameters, "mongorelationshipmethod")) {
        var method = parameters["mongorelationshipmethod"];
        remove(parameters, "mongorelationshipmethod");
    }
    if (isParameterLower(parameters, "mongodtotype")) {
        var dtotype = parameters["mongodtotype"];
        remove(parameters, "mongodtotype");
    }
    if (isParameterLower(parameters, "query")) {
        var query = parameters["query"];
        remove(parameters, "query");
    }
    // Here is where you would execute the query
    // Instead, the dummy call to mongo will return a few wids to work with
    parameters = mongo('set1');

    var parametersCount = countKeys(parameters);
    // Maybe there was no match...
    if (parametersCount == 0) {
    	return 'No records to find relationships of.'
	}
    // There are always multiple sections to a relationship query
    // So the string must start with $and 
    MQueryString = "{$and:[" ;
    var returnValues = parameters;

	var queryParameters=[] ;
	for(p in returnValues) {
		var widName = p;
		var obj = {};
		if(direction == 'forward'){
			obj = {'secondarywid':widName};
		}else{
			obj = {'primarywid':widName};
		}
		queryParameters.push(obj);
	}
	
	    // Section 1 is using the widnames as the first $or group
	var q1 = RelationshipBuildSingleQuery(queryParameters);
	if (q1) {
        q1 = q1.substring(0, q1.length -1);
		MQueryString += q1 + ",";
	}	

    /*
    		var q2 = queryWid(parameters);
    		if(q2){
    			MQueryString+= "[" + q2 + "],";
    		}
    */
		 // This section addes the dtoType to the string
	if (dtotype) {
		var q3 = "{method:" + dtotype + "}," ;
		if (q3) {
			MQueryString += q3;
		}
	}
	// This section is typically 'attribute', but could really be anything.
	if (type) {
		var q4 = "{relationshiptype:" + type + "}," ;
		if (q4) {
			MQueryString += q4;
		}
	}

    MQueryString = MQueryString.substring(0, MQueryString.length -1) + "]}";
		// The string is now built and ready to return.
	printToDiv('Relationship MQueryString : ', MQueryString );
    return MQueryString;
} //End of relationShipQuery function

function aggregationQuery(parameters) {

	var mongoAggregation = ""; // String
	var query;

		 // Fish out the parameters
	if (isParameterLower(parameters, "mongoaggregation")) {
		mongoAggregation = parameters["mongoaggregation"];
		remove(parameters, "mongoaggregation");
	}
    if (isParameterLower(parameters, "mongoaggquery")) {
      mongoaggquery = parameters["mongoaggquery"];
      remove(parameters, "mongoaggquery");
    }
		    printToDiv('THE QUERY AGGREGATION WOULD RUN IS : ', mongoaggquery );

    // Here is where you would execute the mongoaggquery
    // Instead, the dummy call to mongo will return a few wids to work with
    parameters = mongo('set1');

	// Pull out widnames anb build aggregate string
	var originalQuery = "{\"$match\":{\"wid\":{\"$in\":[";
	// Build the array to match records in.
	for (p in parameters){
			originalQuery += " 'wid':'" + p + "',";
	}
	    // Strip off the last comma and close the string
	originalQuery = originalQuery.substring(0, originalQuery.length - 1);
	originalQuery += "]}}";
		
    // An array is the variable that gets set to the aggregation call.
	var pipelineQuery = [originalQuery, mongoAggregation];
	printToDiv('pipelineQuery : ', pipelineQuery );
	return pipelineQuery;
}

// Addon Section **********
// The main use of this seciton is to find the first or last of a result set.
// There are many other functions possible, but this is probably the most used.
// NOTE: The mongorelationshipmethod is actually an addParam, not a relationship param.
// It gets called a relationship param, but is in actuality and addParam. Really this
// is a result of implenting DRI type functions in stages to apply to mongo.
function addonQuery(parameters) {		

	var returnValues = {};

	// #region Query Addon defaults
	var mongoSetLimit = ""; // String
	var mongoSetSkip = ""; // String
	var mongoSetSortBy = ""; // String
	var mongoSetSortOrder = ""; // String
	var mongoSetMax = ""; // String
	var mongoSetHint = ""; // String
	var mongoReturnCount = ""; // String
	var mongoExplain = ""; // String
	var mongoSize = ""; // String
		var mongoRelationshipMethod = "all"

	if (isParameterLower(parameters, "mongosetlimit")) {
		mongoSetLimit = parameters["mongosetlimit"];
	}
	if (isParameterLower(parameters, "mongosetskip")) {
		mongoSetSkip = parameters["mongosetskip"];
	}
	if (isParameterLower(parameters, "mongosetsortby")) {
		mongoSetSortBy = parameters["mongosetsortby"];
	}
	if (isParameterLower(parameters, "mongosetsortorder")) {
		mongoSetSortOrder = parameters["mongosetsortorder"];
	}
	if (isParameterLower(parameters, "mongosetmax")) {
		mongoSetMax = parameters["mongosetmax"];
	}
	if (isParameterLower(parameters, "mongosethint")) {
		mongoSetHint = parameters["mongosethint"];
	}
	if (isParameterLower(parameters, "mongoreturncount")) {
		mongoReturnCount = parameters["mongoreturncount"];
	}
	if (isParameterLower(parameters, "mongoexplain")) {
		mongoExplain = parameters["mongoexplain"];
	}
	if (isParameterLower(parameters, "mongosize")) {
		mongoSize = parameters["mongosize"];
	}
    if (isParameterLower(parameters, "mongorelationshipmethod")) {
      mongoRelationshipMethod = parameters["mongorelationshipmethod"];
    }
		
    // Set up default values to set with query....change if data for them is present.
	var defaultLimit      = (mongoSetLimit == "") ? 999999999 : parseInt(mongoSetLimit);
	var defaultSkip       = (mongoSetSkip == "") ? 0 : parseInt(mongoSetSkip);
	var defaultSortBy     = (mongoSetSortBy == "") ? "_id" : mongoSetSortBy;
	var defaultSortOrder  = (mongoSetSortOrder == "") ? "ascending" : mongoSetSortOrder;
	var defaultSetMax     = (mongoSetMax == "") ? 999999999 : parseInt(mongoSetMax);
	var defaultHint       = (mongoSetHint == "") ? "_id" : mongoSetHint;
	var defaultCount      = (mongoReturnCount == "") ? false : true;
	var defaultExplain    = (mongoExplain == "") ? false : true;
	var defaultSize       = (mongoSize == "") ? false : true;
	
	var defaultFieldsInclude="";	
	if (isParameterLower(parameters, "mongosetfieldsinclude")) {
		defaultFieldsInclude = parameters["mongosetfieldsinclude"];
		// LM: This does not make sense
		    // defaultFieldsInclude = getFromMongo({'wid':mongoSetFieldsInclude});
	}
	var defaultFieldsExclude="";
	if (isParameterLower(parameters, "mongosetfieldsexclude")) {
		defaultFieldsExclude = parameters["mongosetfieldsexclude"];
	    // LM: This does not make sense
		// defaultFieldsExclude = getFromMongo({'wid':mongoSetFieldsExclude});
	}

    // LM: This is a mistake...TODO: Figure out what it was supposed to be
    // the method is taken care of following so??..I think it was left by accident 
    //
	// var mongoRelationshipMethod="";
	// if (isParameterLower(parameters, "mongorelationshipmethod")) {
	// 	var mongoSetFieldsExclude = parameters["mongorelationshipmethod"];
	// }
	// Dealing with method is setting the defaults accordingly
  
    // Applies the logic from the method
  	if (mongoRelationshipMethod == "first") {
			defaultLimit = 1;
		}
	if (mongoRelationshipMethod == "last") {
		defaultLimit = 1;
		defaultSortOrder = "descending";
	}
		
	// #region Executing Addons -- This is simply organizing
	// parameters at this point. All of the addOns still
	// need to be implemented.

	// Need different functions for ascending and descending
	// Ascending Section
	var mycursor="";
	if (defaultSortOrder != "descending") {
		// Count ignores the limit or skip, so it will return all the matching records.count regardless of limit or skip.
		if (defaultCount) {
			// LM: ?
    		//returnValues.length = 0;
			var key = "Number of documents found is";
			var value = "";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
			returnValues[key]=value;
		}
		// mongoExplain returns the statistics of the query, not the query itself.
		if (defaultExplain) {
   		    // LM: ?
			//returnValues.length = 0;
			var key = "The query statistics are as follows";
			var value = "";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
			returnValues[key]=value;
		}
		// mongoSize will return an int of the number of records, but unlike count, it takes into account the limit and skip
		if (defaultSize) {
    		// LM: ?
			//returnValues.length = 0;
			var key = "Number of documents found is";
			var value = "";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
    		value += "defaultSize: '" + defaultSize + "' , " ;
			returnValues[key]=value;
		}

		if (!defaultCount && !defaultExplain && !defaultSize) {
			var value = "";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
			mycursor=value;
		}
	}else {
		// Count ignores the limit or skip, so it will return all the matching records.count regardless of limit or skip.
		if (defaultCount) {
    	    // LM: ?
			//returnValues.length = 0;
			var key = "Number of documents found is";
			var value = "";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
			returnValues[key]=value;
		}
		// mongoExplain returns the statistics of the query, not the query itself.
		if (defaultExplain) {
    		// LM: ?
			//returnValues.length = 0;
			var key = "The query statistics are as follows";
			var value = "";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
			returnValues[key]=value;
		}
		// mongoSize will return an int of the number of records, but unlike count, it takes into account the limit and skip
		if (defaultSize) {
   		    // LM: ?
			//returnValues.length = 0;
			var key = "Number of documents found is";
			var value = "";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
    		value += "defaultSize: '" + defaultSize + "' , " ;
			returnValues[key]=value;
		}
		// The count, explain, and size are all calls that don't return records...
		// So don't use mycursor to get the records if you don't want them
		if (!defaultCount && !defaultExplain && !defaultSize) {
			var value = parameters["query"] + ",";
			value += "defaultFieldsInclude: '" + defaultFieldsInclude + "' , " ;
			value += "defaultFieldsExclude: '" + defaultFieldsExclude + "' , " ;
			value += "defaultHint: '" + defaultHint + "' , " ;
			value += "defaultLimit: '" + defaultLimit + "' , " ;
			value += "defaultSkip: '" + defaultSkip + "' , " ;
			value += "defaultSortBy: '" + defaultSortBy + "' , " ;
			mycursor=value;
		}
	}
	
	if (!defaultCount && !defaultExplain && !defaultSize) {
		returnValues = mycursor;
	}		
	printToDiv('Function Add On Query() output : ', returnValues );
	return returnValues;
}//End of addOnQuery function

/// <summary>
/// Builds 1 $OR group of a mongo query
/// </summary>
/// <param name="parameters">List of kvpairs</param>
/// <returns>A string representing the $OR group of kvp</returns>
function BuildSingleQuery(parameters) { /// BuildSingleQuery(List<DataModeldto> parameters)
	var result;
	
	// seed result with the beginning of a mongo or query
	var parametersCount = countKeys(parameters);
	if (parametersCount > 1) {
		result = "{$or:[";
	} else {
		result = "";
	}
	// build a {key,"value"} for each parameter
	//foreach (var p in parameters)
	for (key in parameters) {
		result += BuildSimpleQuery(key, parameters[key]);
		result += ",";
	}
	
	// strip off the last comma and add the closing of OR
	result = result.substring(0, result.length - 1);
	if (parametersCount > 1) {
		result += "]},";
	} else {
		result += ",";
	}
	return result;
}

// Totally a legacy call used for testing only. Probably can
// be removed at this point.
function BuildSimpleQuery(key, value) {
	result = "{" + key + ":" + value + "}";  /// {key:value}
	return result;
}

/// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<    <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

/// <summary>
/// Mongo multiple query builder.
/// </summary>
/// <param name="Lists">A list of lists of dto's. If the list of dto's has a key = rawquery, the value is the raw query.</param>
/// <returns>A formatted mongo query string.</returns>
function BuildMultipleQuery(parameters) { 
	var returnString = ""; /// <<<<<<<<<<< check
	printToDiv('Function MongoDataQuery BuildMultipleQuery : ', parameters);
	var parametersCount = countKeys(parameters);
// If it turns out you only have 1 set of params, don't start out the string with $and
	if (parametersCount == 1){   
		//returnString += "{";
		returnString += "";
	}else{
		returnString += "{$and:[";
	}
		// Iterate through the params from each wid to get the $or groups built
	for (var i = 0; i < parametersCount; i++) {
        if (getObjectSize(parameters[i]) != 0) {
			returnString += BuildSingleQuery(parameters[i]);
        }
  	}
		
	// Chop off the last comma
	returnString = returnString.substring(0, returnString.length - 1);
	// Close the string based on the number of parameters
	if (parametersCount == 1){
		//returnString += "{";
		returnString += "";
	}else{
		returnString += "]}";
	}
	return returnString;          
}

// Similar to BuildSingleQuery, but different...let it be please.
function RelationshipBuildSingleQuery(parameters){
	var result;
	
	// seed result with the beginning of a mongo or query
	var parametersCount = countKeys(parameters);
	if (parametersCount > 1){
		result = "{$or:[";
	}else{
		result = "";
	}
	// build a {key,"value"} for each parameter
	//foreach (var p in parameters)
	for(key in parameters){
		result +=  JSON.stringify(parameters[key]);
		result += ",";
	}
	
	// strip off the last comma and add the closing of OR
	result = result.substring(0, result.length - 1);
	if (parametersCount > 1){
		result += "]},";
	}else{
		result += ",";
	}
	return result;	
}
