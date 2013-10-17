	
// Starting of securityCheck function
// LM: I think this section is turned off and not used since it was breaking the code, but it 
// should be saved and implemented later
function securityCheck(widParameter, accessToken){ // accountwid and transactionType for future use
	printToDiv('Function securityCheck() in : ', 'before' );
	return true;
	var widInput= { wid:widParameter, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
	var accessTokenInput= { wid:accessToken, mongorelationshiptype:'attributes', mongorelationshipmethod:'last' , mongowidmethod:'dtotype', mongorelationshipdirection:'forward', convertmethod:'convertmethod'};
	var widOutput=queryWid(widInput);
	printToDiv('Function queryWid() out with  output : ', widOutput );	
	var accessTokenOutput=queryWid(accessTokenInput);
	printToDiv('Function queryWid() out with  output : ', accessTokenOutput );	
	var securityCheckOutput = widOutput['security']>accessTokenOutput['security'];
	printToDiv('Function securityCheck() out with  output : ', securityCheckOutput );
	return securityCheckOutput;
}// End of queryWid function



// Cycles through local storage looking for a match to the query
function simpleQuery(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, dtotype){

	var returnfromSimpleQuery=[];
	var enhancedreturn=[];

	printToDiv('Function simpleQuery in : mongowidmethod',  mongowidmethod);

	if(mongorelationshipdirection == "forward") {
		// step through local storage looking for
	   for (var key in localStorage){
			var myvalue = JSON.parse(localStorage.getItem(key));

			//printToDiv('Function simpleQuery in : myvalue',  myvalue);

			if ((key.indexOf(widMasterKey) == 0) && (myvalue["primarywid"] == widInput)) {
               var widName = myvalue["primarywid"];
			   var key = myvalue["secondarywid"];
			   var value = getFromMongo({wid:key}); // , dtotype:mongowidmethod
               delete value.wid;
               var resultObj = {};
			   resultObj[key]= value;

			   	//printToDiv('Function simpleQuery in : resultObj I',  resultObj);		  
				if ((value["metadata.method"] === undefined) || (value["metadata.method"] == "")) {	
					widdto = "";
				}else {
					widdto = value["metadata.method"]
				}

				// changed 10/30 if ((mongowidmethod !== undefined) && (mongowidmethod == widdto)) {
				if (((mongowidmethod !== undefined) && (mongowidmethod == widdto)) || (mongowidmethod=="")) {
					//printToDiv('Function simpleQuery in : resultObj',  resultObj);
					returnfromSimpleQuery.push(resultObj);
				}
			 }
		}
	}
	//printToDiv('Function simpleQuery in : returnfromSimpleQuery',  returnfromSimpleQuery);
    returnfromSimpleQuery=returnfromSimpleQuery.sort(function(aObj, bObj) {
   		var a = getAttributeByIndex(aObj, 0);
   		var b = getAttributeByIndex(bObj, 0);     
   		if (a < b) return -1;
   		if (a > b) return 1;
    	return 0;
 		});
    if (returnfromSimpleQuery.length>0) {
    	if (mongorelationshipmethod='first') {enhancedreturn=returnfromSimpleQuery[0]};
   	 	if (mongorelationshipmethod='last') {enhancedreturn=returnfromSimpleQuery[returnfromSimpleQuery.length]};
		if (mongorelationshipmethod='all') {enhancedreturn=returnfromSimpleQuery};
		}
	printToDiv('Function simpleQuery in : enhancedreturn',  enhancedreturn);
	return enhancedreturn;
}

// Prepares an object to be recorded in local storage and puts it there
function MongoAddEditPrepare(Indto, InList, widid, widdto) {
	/* 	Indto = [{"key":"e","value":"onetomany"}];

					InList = [{"key":"e","value":"f"}]; */
			// printToDiv('Function MongoAddEditPrepare, Indto : ', Indto);
			// printToDiv('Function MongoAddEditPrepare, InList : ', InList);
			// printToDiv('Function MongoAddEditPrepare, widid : ', widid);
			// printToDiv('Function MongoAddEditPrepare, widdto : ', widdto);

    var InListObj = {};
    var rawobject = {};
    var rawlist = [];
    InListObj = listToObject(InList);

    if ((InListObj["wid"]===undefined) || (InListObj["wid"] == "")){
	    if ((widid!==undefined) || (widid!="")) {InListObj["wid"] = widid};
		}
 	if ((InListObj["wid"] === undefined) || (InListObj["wid"] == "")) {
    	potentialwid=potentialwid+1;
     	InListObj["wid"] = potentialwid.toString();
    	} 
    	else 
    	{ // if the wid existed, read the contents of the previous wid, we want to update not add.
    	//Debug='true';
		rawobject = getFromMongo({"wid":InListObj["wid"]}); 
		InListObj =  jsonConcat(InListObj,rawobject); // this will be the new contents concat with old stuff in wid
		// rawobject = getWidMongo(InListObj["wid"],"",widdto, "","dto",Indto, ""})
		rawobject={};  // if the dto had inherit then we only want to save what in herit does not have 
		var item;
		for (item in Indto) {   // load all data related to inherit
			if (item.value=='inherit') {
				rawobject = getFromMongo({"wid":item.key}); 	
				rawobject =  jsonConcat(rawobject,rawobject);
				}
			}
		for (item in rawobject) {  // for all data in inherit, delete it from being added
			if (InListObj[item]==rawobject[item]) {
				delete InListObj[item]
				}
			}
		}
	if ((InListObj["metadata.method"]===undefined) || (InListObj["metadata.method"] == "")) {
	    if ((widdto!==undefined) || (widdto!="")) {InListObj["metadata.method"] = widdto};
		}
 	if ((InListObj["metadata.method"] === undefined) || (InListObj["metadata.method"] == "")) {
     	InListObj["metadata.method"] = 'defaultdto';
    	} 
		//printToDiv('Function MongoAddEditPrepare InListObj before : ', InListObj);
		//printToDiv('Function MongoAddEditPrepare rawobject from get : ', rawobject);

		// step through dto look for inherit parameters, then delete them from save

		//printToDiv('Function MongoAddEditPrepare InListObj after : ', InListObj);

		//Debug='false';


	InListObj["wid"]=InListObj["wid"].toLowerCase();
	addtomongo(InListObj["wid"], InListObj)
	//addToLocalStorage(widMasterKey + InListObj["wid"], InListObj);
	//olddebug=Debug;
	//Debug='true';

	printToDiv('Function MongoAddEditPrepare, ******************* Mongo record added : ', InListObj);

	//Debug=olddebug;				
	//InListObj["LOG"]="LOG";
	//addtomongo(InListObj["wid"], InListObj)
	// addToLocalStorage(widMasterKey + "add_"+InListObj["wid"], InListObj);
	return InListObj;
}

function AddMongoRelationship(ParentWid,ChildWid,attr){
	relationshipdto={'primarywid':'string','secondarywid':'string', 'relationshiptype':'string','metaddata.method':'string'};
	// note above should be list but does not matter
	InList = [];
	InList.push({"key":"primarywid","value":ParentWid.toLowerCase()});
	InList.push({"key":"secondarywid","value":ChildWid.toLowerCase()});
	InList.push({"key":"relationshiptype","value":attr.toLowerCase()});
	InList.push({"key":"metadata.method","value":"relationshipdto"});

	for (var key in localStorage){				// search for duplicate
		var myvalue = JSON.parse(localStorage.getItem(key));
		if ((myvalue['primarywid']==ParentWid) && (myvalue['secondarywid']==ChildWid)) {
			InList.push({"key":"wid","value":myvalue['wid']});
			}
		}

	AddedObject = MongoAddEditPrepare([], InList, "", attr );
}


// know issue -- cannot save blank parameter if jsonconcat (inherit)

function getWidMaster(parameters){

	var parameters = tolowerparameters(parameters, {'wid':'add', 'metadata.method':'add', 'command.dtotype':'add', 'command.convertmethod':'add', 'command.checkflag':'add', 'command.inherit':'add', 'command.accesstoken':'add'});

	printToDiv('Function getWidMaster() incoming parameters, now go to getWidMasterLevel ' , parameters);

	var wid = parameters.wid;
	var resultObj = {};	
	printToDiv('Function getWidMasterLevel() incoming parameters, to getWidMongo' , parameters);

/*	var dtotype="";
	if(isParameterLower(parameters, "command.dtotype")){
		dtotype=parameters["command.dtotype"];
	}
	
	var inherit="";
	if(isParameterLower(parameters, "command.inherit")){
		inherit=parameters["command.inherit"];
	}

	var accesstoken="";
	if(isParameterLower(parameters, "command.accesstoken")){
	accesstoken=parameters["command.accesstoken"];
	}

	var checkflag="";
	if(isParameterLower(parameters, "command.checkflag")){
		accesstoken=parameters["command.checkflag"];
	}


	var convertMethod="";
	if(isParameterLower(parameters, "command.convertmethod")){
		convertMethod=parameters["command.convertmethod"];
	}
*/

	var dtotype=parameters["command.dtotype"];
	var inherit=parameters["command.inherit"];
	var accesstoken=parameters["command.accesstoken"];
	var checkflag=parameters["command.checkflag"];
	var convertMethod=parameters["command.convertmethod"];
	var resultObj = {};  
	
	resultObj = getWidMongo(wid, convertMethod, accesstoken);

	if(inherit) { // inherit points to wid with more datan- Grab the params from mongo(local storage)
		moreParameters = getFromMongo({'wid':inherit}); // if we find some, add them to the return object
		if(moreParameters) {
			resultObj = jsonConcat(resultObj, moreParameters);  // if duplicates then currentLevelObject{} wins
			} 
		}

	if (checkflag!="") { // see if right side of output needs to be made mongo compatible
		dtoList=objectToList(dtoGlobalParameters);
		resultList = objectToList(resultObj);
		resultList = CleanBasedOnCheckflagList(checkflag, resultList, dtoList);
		resultObj = listToObject(resultList);
		}

	olddebug=Debug;
	Debug=olddebug;
	printToDiv('Function getWidMasterLevel() ** before ' , resultObj);
	if (Object.keys(resultObj).length !== 0) {
		resultObj=cleanparameters(resultObj, dtotype, accesstoken, "remove", convertMethod);
		}
	resultObj=resultObj.parms;   // ************

	printToDiv('Function getWidMasterLevel() ** after ' , resultObj);
	if (convertMethod=="nowid") {
		delete resultObj["wid"];
		delete resultObj["metadata.method"];
	}
	Debug=olddebug;
	Debug=olddebug;

	return resultObj
}



// 	//if (dtotype=="") {dtotype=resultObj["metadata.method"]}; // if no dtotype sent in, then adopt method
// 	if ((resultObj["metadata.method"]===undefined) || (resultObj["metadata.method"] == "")) {
// 			resultObj["metadata.method"] = "defaultdto";
// 			} // note this should not have ever happened
// 	if ((dtotype ===undefined) || (dtotype == "")) {dtotype=resultObj["metadata.method"]}; // if no dtotype sent in, then adopt method

// 	if (resultObj["metadata.method"] != dtotype) {	// we are primarly concernted if they do not match

// 		if (cleanmethod=="add") { 	// if add, then find the preamble by reading a pristine dto record and looking
// 			//dtoobject=aggressivedto(dtotype, resultObj);
// 			dtoobject=getWidMongo(dtotype, "dto", accesstoken);
// 			for (item in dtoobject) {
// 				if ((item==dtotype) &&
// 					((dtoobject[item] == 'onetomany') || (dtoobject[item] == 'onetoone'))) {
// 		 			preAmble = item;
// 					}
// 				}
// 			}		


// 	else { // if resultObj["metadata.method"] = dtotype) 
// 		if (cleanmethod=="add") { 
// 			dtoobject = getWidMaster({'wid':dtotype, 'command.dtotype':dtotype, 'command.convertmethod':'dto'});
// 			outputparameters=resultObj;
// 			}
// 		if (cleanmethod=="remove") { 
// 			dtoobject = resultObj; // note this should not even be necessary
// 			outputparameters=resultObj;
// 			}
// 		}	
	
// 	printToDiv('Function cleanparameters()  outputparameters II' , outputparameters);	
// 	printToDiv('Function cleanparameters()  cleanmethod II' , cleanmethod);
// 	return {
// 		parms : outputparameters,
// 		dto : dtoobject 
// 		};
// }


function aggressivedto(widInput, preamble) { // returns a made up dto base on maximum number of relationships, etc
	//Debug='true';
	printToDiv('Function aggressivedto()  widInput' , widInput);
	var moreDTOParameters={};
	var dtoGlobalParameters={};
	var targetwid="";
	var eachresult="";
	var key="";
	var rightparameters={};
	var parameterObject=getFromMongo({'wid':widInput});
	//var parameterObject=getFromMongo(widInput);
	if (preamble === undefined) {preamble = ""};
	if (preamble != "") {preamble = "." + preamble};
	printToDiv('Function aggressivedto()  parameterObject' , parameterObject);
	if (parameterObject['metadata.method'] != "") {targetwid = parameterObject['metadata.method']};
	if (targetwid == "") {targetwid = parameterObject['wid']}; // should probably be taken out
	if (targetwid != "") {
		printToDiv('Function aggressivedto()  targetwid' , targetwid);
		moreDTOParameters = simpleQuery(targetwid, "attributes", "all", "forward", "", "", "");
		for (eachresult in moreDTOParameters) {
			for (key in moreDTOParameters[eachresult]) {
				rightparameters=moreDTOParameters[eachresult][key];	
				}
			printToDiv('Function getWidMongo() left- ', key);	
			printToDiv('Function getWidMongo() right ', rightparameters);
			targetwid=rightparameters['metadata.method'];
			printToDiv('Function getWidMongo() targetwid+preamble ', targetwid+preamble);
			dtoGlobalParameters[targetwid + preamble] = 'onetomany'
			dtoGlobalParameters = jsonConcat(dtoGlobalParameters, aggressivedto(targetwid, key));
			}
		for (eachresult in parameterObject) {
			printToDiv('Function getWidMongo() eachresult+preamble ', eachresult+preamble);
			if ((eachresult != 'wid') && (eachresult != 'metadata.method')) {
				dtoGlobalParameters[eachresult + preamble] = 'string';
				}
			}	
	}
	printToDiv('Function aggressivedto()  dtoGlobalParameters' , dtoGlobalParameters);
	//Debug='false';
	return dtoGlobalParameters
	}


/*function addclean (resultObj, dtotype, accesstoken, cleanmethod, convertmethod) {
	olddebug=Debug;
	Debug=olddebug;
	if (cleanmethod == "add") {
	var inputParametersObject = {};
	var metadata = "";
	var dtoobject = {};
	inputParametersObject = resultObj;
	printToDiv('Function cleanparameters()  inputParametersObject' , inputParametersObject);

	 if ((inputParametersObject['metadata.method'] !== "") && (dtotype=="")) {
		metadata = inputParametersObject['metadata.method']
		dtoobject=getWidMaster({'wid':metadata, 
								'command.convertmethod':'dto',
								'command.dtotype':metadata});
		};
	if (dtotype!=="") { // first read the wid, then figure out its method, then get the dto object based on it
    	printToDiv('Function AddWidParameters()  dtotype : II ',  dtotype);
    	parameterObject=getFromMongo({"wid":inputParametersObject["wid"]});
		dtoobject=getWidMaster({'wid':parameterObject["metadata.method"], 
								'command.convertmethod':'dto',
								'command.dtotype':'defaultdto'});
		}

	printToDiv('Function cleanparameters()  outputparameters ' , resultObj);
	printToDiv('Function cleanparameters()  dtoobject ' , dtoobject);
	Debug=olddebug;
		return {
		parms : resultObj,
		dto : dtoobject 
		};
	};
}*/


function cleanparameters(resultObj, dtotype, accesstoken, cleanmethod, convertmethod) {
	printToDiv('Function cleanparameters() resultObj' , resultObj);
	printToDiv('Function cleanparameters()  dtotype' , dtotype);
	printToDiv('Function cleanparameters()  accesstoken' , accesstoken);
	printToDiv('Function cleanparameters()  cleanmethod' , cleanmethod);
	var outputparameters = {};
	var dtoloc = 0;
	var proposedLeft = "";
	var proposedRight = "";
	var dtoobject = {};
	var inputParametersObject = {};
	var metadata = "";
	var preAmble="";

	if (cleanmethod == "add") {

	inputParametersObject = resultObj;
	printToDiv('Function cleanparameters()  inputParametersObject' , inputParametersObject);

	 if ((inputParametersObject['metadata.method'] !== "") && (dtotype=="")) {
		metadata = inputParametersObject['metadata.method']
		dtoobject=getWidMaster({'wid':metadata, 
								'command.convertmethod':'dto',
								'command.dtotype':metadata});
		};
	if (dtotype!=="") { // first read the wid, then figure out its method, then get the dto object based on it
    	printToDiv('Function AddWidParameters()  dtotype : II ',  dtotype);
    	parameterObject=getFromMongo({"wid":inputParametersObject["wid"]});
		dtoobject=getWidMaster({'wid':parameterObject["metadata.method"], 
								'command.convertmethod':'dto',
								'command.dtotype':'defaultdto'});
		}

	printToDiv('Function cleanparameters()  outputparameters ' , resultObj);
	printToDiv('Function cleanparameters()  dtoobject ' , dtoobject);

		// return {
		// parms : resultObj,
		// dto : dtoobject 
		// };
	};

	if (dtotype=="") {dtotype=resultObj["metadata.method"]}; 
//	if (cleanmethod=="remove") {
	if (resultObj["metadata.method"] != dtotype) {
		//dtoobject=getWidMongo(dtotype, "dto", accesstoken);

		// "adddto.0.palettedto":"onetomany" -- adddto.0.palettedto.0.subcategory
		if (cleanmethod=="add") { 	// if add, then find the preamble by reading a pristine dto record and looking
			printToDiv('Function cleanparameters()  resultObj' , resultObj);
			dtoobject=aggressivedto(resultObj['wid']);
			printToDiv('Function cleanparameters()  dtoobject inside ' , dtoobject);
			//dtoobject=getWidMongo(dtotype, "dto", accesstoken);
			for (item in dtoobject) {
				dtoloc=item.indexOf(dtotype)
				if ((dtoloc!=-1) &&
					((dtoobject[item] == 'onetomany') || 
					(dtoobject[item] == 'onetoone'))) {
					preAmble=item;
					}
				}
				printToDiv('Function cleanparameters()  preAmble ' , preAmble);
			}	
		
		for (item in resultObj) {  // now step through each record that could be changed
			proposedLeft=item;
			proposedRight=resultObj[item];
			if ((item!='wid') && (item!='metadata.method')) {
				printToDiv('Function cleanparameters()  item' , item);
				proposedLeft=""; // work on left first...check if add or remvove
				if ((cleanmethod=="add") && (preAmble!="")) {proposedLeft=preAmble + "." + item}
				if (cleanmethod=="remove"){ 
					dtoloc=item.indexOf(dtotype+".")
					printToDiv('Function cleanparameters()  dtoloc' , dtoloc);
					if (dtoloc!=-1) {
						proposedLeft=item.substring(dtoloc+dtotype.length+3 ,item.length);
						// assume record looks like this authordto.booksdto.0.name
						// if dtotype = booksdto default will convert that to name
						// dtonum to booksdto.0.name
						// num to 0.name
						if (convertmethod=="dtonum") { 
							proposedLeft=item.substring(dtoloc ,item.length);
							}
						if (convertmethod=="num") { 
							proposedLeft=item.substring(dtoloc+dtotype.length+1 ,item.length);
							}
						}
					}
				}	
			printToDiv('Function cleanparameters()  proposedLeft' , proposedLeft);
			printToDiv('Function cleanparameters()  proposedRight' , proposedRight);
			if (proposedLeft!="") {outputparameters[proposedLeft]=proposedRight};
			printToDiv('Function cleanparameters()  outputparameters' , outputparameters);	
			}
//		}
/*			for (var item in resultObj) {
				printToDiv('Function cleanparameters()  item' , item);
				dtoloc=item.indexOf(dtotype+".")
				printToDiv('Function cleanparameters()  dtoloc' , dtoloc);
				if (dtoloc!=-1) {
					proposedLeft=item.substring(dtoloc+dtotype.length+3 ,item.length);
					if (convertmethod=="dtonum") { 
						proposedLeft=item.substring(dtoloc ,item.length);
						}
					if (convertmethod=="num") { 
						proposedLeft=item.substring(dtoloc+dtotype.length+1 ,item.length);
						}
					proposedRight=resultObj[item];
					printToDiv('Function cleanparameters()  proposedLeft' , proposedLeft);
					printToDiv('Function cleanparameters()  proposedRight' , proposedRight);
					outputparameters[proposedLeft]=proposedRight;
					printToDiv('Function cleanparameters()  outputparameters' , outputparameters);	
					}
				}
			}*/
			}
		else { // if resultObj["metadata.method"] = dtotype) 
			outputparameters=resultObj;
			}	
	printToDiv('Function cleanparameters()  outputparameters II' , outputparameters);	
	printToDiv('Function cleanparameters()  cleanmethod II' , cleanmethod);
//	if (cleanmethod=="add") { 
//		outputparameters=resultObj;
//		}
	printToDiv('Function cleanparameters()  outputparameters end' , outputparameters);	
	printToDiv('Function cleanparameters()  dtoobject end' , dtoobject);
	return {
		parms : outputparameters,
		dto : dtoobject
		};
}
/*
		// This will hold the relationship dto if found
		var preAmble = "";
		var splitarray = [];
		// read dto defintion of the method, convertmethod=dto does not reutrn wid and method
		var dtoobject = getWidMongo(resultObj["metadata.method"], "dto", accesstoken);
		printToDiv('Function cleanparameters()  dtoobject result *******' , dtoobject);
		// Itereate through the hashes of the method object
		for (item in dtoobject) { 		// go through DTO looking for fields that finish with DTOtype 
										// and are one to one or one tomany
			splitarray = item.split("."); // and are one to one or one tomany
			if ((splitarray[splitarray.length - 1] == dtotype) && // if last item in split
			 ((dtoobject[item] == 'onetomany') || (dtoobject[item] == 'onetoone'))) {
			 		// If a relationship is found in the method, set the preamble to that dto
			 	preAmble = item;
				}			
			}
		printToDiv('Function cleanparameters() preAmble' , preAmble);
		// if preamble is still "", we will do all this agaianst an empty string...maybe not a good idea	
		// we are assuming that a method and dtotype exist, but we don't know for sure if the method
		// dto is in the database. If it is not...then what?
		
		// 	Look for the dto in the object we have so far
		printToDiv('Function cleanparameters() inputlist I ' , resultObj);

		if (cleanmethod=="remove") {
			var inputlist = MatchPrefix(resultObj, preAmble);
			// Develope a list of only those parameters that match the relationship dto
			printToDiv('Function cleanparameters() inputlist II' , inputlist);
			var inputlistmatch = inputlist.match;
			// Strip off the relationship dto from the parameter key
			printToDiv('Function cleanparameters() inputlist III' , inputlist);
			inputlist = DeletePrefix(inputlistmatch, preAmble);
			// Set the list as the object to return
			printToDiv('Function cleanparameters() inputlist IV' , inputlist);
			resultObj = listToObject(inputlist);
			}

		if ((cleanmethod=="add") && (preAmble!="")) {
				for (item in resultObj) {
					resultObj[preAmble+"."+item]=resultObj[item];
					delete  resultObj[item];
				}
				// step through result object paramters and add preamble
			}

		printToDiv('Function cleanparameters() resultObj outfrom call' , resultObj);
		}
*/

function getWidMongo(widInput, convertMethod, accessToken) {

var olddebug=Debug;
Debug=olddebug;
	printToDiv('Function getWidMongo() in widInput: ', widInput);
	printToDiv('Function getWidMongo() convertmethod', convertMethod);

	if (!widInput) {
		return;
	}
    var dtoGlobalParameters = {};
	var attr = "";	
	var nextLevelParameters = {};
	var outgoingParameters = {};
    var moreDTOParameters = {};
	var moreParameters = {};
	var currentLevelObjectList = [];
	var dtoGlobalParametersList = [];
	var addedobject = {}; 
	var eachresult = "";
	var createdto ='false';
	var createrelationships = 'false';
	var savedto = 'false';
	var createid = widInput;
	var dtotype = "";

	var currentLevelObject = getFromMongo({'wid': widInput});

	printToDiv('Function getWidMongo() currentLevelObject ++++++ top level object ', currentLevelObject);

	// if dtotype not sent in, then figure it out -- dto type will be blank at all 1+ levels
	// first choide for dto is its method
	if ((currentLevelObject["metadata.method"]!==undefined) && 
	   	(currentLevelObject["metadata.method"]!=="")) {
		dtotype=currentLevelObject["metadata.method"]
		// Get the wid from mongo(local storage)
		dtoGlobalParameters = getFromMongo({'wid':dtotype});
		}
	if (Object.keys(dtoGlobalParameters).length === 0) {
		//if (dtotype!="") {createid=dtotype}
		//dtotype='defaultdto'
		moreDTOParameters = simpleQuery(widInput, "attributes", "all", "forward", "", "", "");
		for (eachresult in moreDTOParameters) {
			for (key in moreDTOParameters[eachresult]) {
				printToDiv('Function getWidMongo()eachresult[0] ',key);	
				dtoGlobalParameters[key] = 'onetomany'
				}
			}
		for (eachresult in currentLevelObject) {
			dtoGlobalParameters[eachresult] = 'string'
			}	
		
		}

	printToDiv('Function getWidMongo() dtoGlobalParameters IV ', dtoGlobalParameters);	

	currentLevelObjectList = objectToList(currentLevelObject);
	dtoGlobalParametersList = objectToList(dtoGlobalParameters);


	printToDiv('Function getWidMongo() dtoGlobalParameters near start', dtoGlobalParameters);	
	printToDiv('Function getWidMongo() currentLevelObject II ', currentLevelObject);		

	currentLevelObjectList = SplitObjectList(currentLevelObjectList, dtoGlobalParametersList);
	currentLevelObjectList = currentLevelObjectList.match;
	currentLevelObject = listToObject(currentLevelObjectList);

	printToDiv('Function getWidMongo() currentLevelObject ----about to start relationships----', currentLevelObject);		


	outgoingParameters=currentLevelObject;

	for (var item in dtoGlobalParameters) {
		printToDiv('Function getWidMongo() step through dto ', (item + ' ' + dtoGlobalParameters[item]));
		nextLevelParameters = {};
		attr = dtoGlobalParameters[item];
		if ((attr == "onetoone")  || (attr == "onetomany")  || (attr == "inherit"))  {
			if (attr == "onetoone") { // if dto states 'onetoone' then search for related records that match property
				nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "last", "forward", item, convertMethod, accessToken); // removed inherit dtoGlobalParameters
				}; // 10-5 took away dtotype
			if (attr == "onetomany") { // if dto states 'onetomany' then search for related records that match property
				nextLevelParameters = getAndFormatNextLevel(widInput, "attributes", "all", "forward", item, convertMethod, accessToken, "inherit"); //removed dtoGlobalParameters
				}; // 10-5 took away dtotype
			if ((attr == "inherit") && (convertMethod != 'dto')) { 	// added 10/4 add to parameters whatever is to left side of inherit
				nextLevelParameters = getWidMaster({'wid':item, 'command.convertmethod':'nowid'});
				};
			if (nextLevelParameters=="") {AddMongoRelationship(widInput,item,"attributes")}; // if DTO existed, but no relationship at place hoder
			printToDiv('Function getWidMongo() came back from getAndFormatNextLevel, nextLevelParameters= ', nextLevelParameters);
	        printToDiv('Function getWidMongo() step through dto ', (item+' '+dtoGlobalParameters[item]));
	        outgoingParameters = jsonConcat(outgoingParameters, nextLevelParameters);
	        printToDiv('Function getWidMongo() outgoingParameters ', outgoingParameters);
   			 } // if
        //printToDiv('Function getWidMongo() outgoingParameters ', outgoingParameters);
        } // for
    printToDiv('Function getWidMongo() end of relationsips---------------- : ', outgoingParameters);
    Debug=olddebug;
    return outgoingParameters
}

// Starting of getAndFormatNextLevel function
function getAndFormatNextLevel(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, accesstoken) {

			printToDiv('Function getAndFormatNextLevel() arriving widInput', widInput);
			// printToDiv('-------Function getAndFormatNextLevel() in : mongowidmethod', mongowidmethod);
			// printToDiv('-------Function getAndFormatNextLevel() in : convertmethod', convertmethod);
			// printToDiv('-------Function getAndFormatNextLevel() in : dtotype', dtotype);
			// printToDiv('-------Function getAndFormatNextLevel() in : dtoGlobalParameters', dtoGlobalParameters);	

	var relatedParameters = simpleQuery(widInput, mongorelationshiptype, mongorelationshipmethod, mongorelationshipdirection, mongowidmethod, convertmethod, ""); // removed dto type from end
	var drillDownParameters = {};
	var rowresult = ""
	var nextLevelParameters = [];
	var nextLevelParametersObject = {};
	var proposedLeft = "";
	var proposedRight = "";
	var item = "";
	var iteration = 0 

	printToDiv('Function getAndFormatNextLevel() in : relatedParameters  after simpleQuery++++ starting related ++++', relatedParameters);
	// printToDiv('-------Function getAndFormatNextLevel() in : relatedParameters.length', relatedParameters.length);

	if (relatedParameters == "") {
		return;
	}

	//for (var rowresult in relatedParameters) { // for this iteration: wid1: {a:b, c:d}
	for(iteration = 0 ; (iteration< relatedParameters.length ) ; iteration++ ) {
	rowresult=relatedParameters[iteration];

			printToDiv('Function getAndFormatNextLevel() in : iteration in going through results from simpleQuery', iteration);		
			//printToDiv('Function getAndFormatNextLevel() in : current row', rowresult);
			
			//var rowObject = relatedParameters[rowresult];
			//for (item in rowObject) {
			//	var proposedLeft = item;
			//	var proposedRight = rowObject[item];
			//}
		for (key in rowresult) {
		proposedLeft = key;
		proposedRight = rowresult[key];
		}

				//iteration++; // proposedRight = {a:b, c:d}
		
				printToDiv('Function getAndFormatNextLevel() in : proposedLeft', proposedLeft);
				printToDiv('Function getAndFormatNextLevel() in : proposedRight', proposedRight);

				// LM: Found commented. Should delete?
				// ************
				//if (dtotype == 'onetomany') {
				//	proposedLeft == proposedLeft + "<" + iteration + ">"; // if dtotype=x then proposedLeft x<1>
				//}

				//if (convertmethod = "" && relatedParameters.length == 1) {
				//	proposedLeft = dtotype; // proposedLeft=x if only one related and convertmethod="" -- change it to just widdto
				//}
				// ************
				//var proposedObject ={};

		if (convertmethod == "wid") {

					//printToDiv('Function getAndFormatNextLevel() convertmethod', convertmethod);
					//proposedRight = item; // proposedRight = wid1
					//printToDiv('Function getAndFormatNextLevel() item', proposedRight);
					//proposedObject[mongowidmethod] = proposedLeft;
					//nextLevelParameters.push({"key":proposedLeft,"value":proposedRight}); // NextLevelParameters =  x<1>: wid1

			nextLevelParameters.push({"key":mongowidmethod,"value":proposedLeft});

					//		printToDiv('----------Function getAndFormatNextLevel() proposed wid object', proposedObject);

			};
					//alert(convertmethod);
		if (convertmethod == "json") {

					//proposedObject[proposedLeft] = proposedRight;
					//nextLevelParameters.push({"key":proposedLeft,"value":proposedRight}); // NextLevelParameters =  x<1>: {a:b, c:d}

			nextLevelParameters.push({"key":mongowidmethod,"value":proposedRight});

					//		printToDiv('----------Function getAndFormatNextLevel() proposed json object', proposedObject);

			};

		if ((convertmethod == "") || (convertmethod == "dto") || 
			(convertmethod == "num") || (convertmethod == "dtonum")) {	
			printToDiv('Function getAndFormatNextLevel() in convertmethod=blank, about to get drilldown: ', mongowidmethod);			
			drillDownParameters = getWidMongo(proposedLeft, convertmethod, accesstoken); //dtoGlobalParameters, mongowidmethod);
			printToDiv('Function getAndFormatNextLevel() after drillDown object: ', drillDownParameters);
			//printToDiv('----------Function getAndFormatNextLevel() mongowidmethod: ', mongowidmethod);

			for(item in drillDownParameters) {
					// LM: original line
				if ((convertmethod == "dto") && ((item=="wid") || (item=="metadata.method"))) {
					} // left empty by design
					// ** do we need to replicate at top level?
				else {
					proposedLeft = mongowidmethod + "." + String(iteration) + "." + item;  // removed +1
					if ((convertmethod == "dto") && (relatedParameters.length == 1)) { 
						proposedLeft = mongowidmethod+"."+item; 
						}
					// this should not put brackets if only one child

					proposedRight = drillDownParameters[item];
					}
					//printToDiv('Function getAndFormatNextLevel() in : proposedLeft - drilldown loop', proposedLeft);
					//printToDiv('Function getAndFormatNextLevel() in : proposedRight - drilldown loop', proposedRight);

					nextLevelParameters.push({"key":proposedLeft,"value":proposedRight});

					printToDiv('Function getAndFormatNextLevel() forloop nextLevelParameters as it grows', nextLevelParameters);				
					//printToDiv('Function getAndFormatNextLevel() drillDown aftr dot: ', drillDownParameters);
					//printToDiv('Function getAndFormatNextLevel() nextLevelParameters after dot : ', nextLevelParameters);	
							//nextLevelParameters = jsonConcat(nextLevelParameters, drillDownParameters);
					//printToDiv('Function getAndFormatNextLevel() nextLevelParameters after concat : ', nextLevelParameters);	
					};			
			};

			//printToDiv('Function getAndFormatNextLevel() nextLevelParameters list result : ', nextLevelParameters);
	}
	nextLevelParametersObject=listToObject(nextLevelParameters);

	printToDiv('Function getAndFormatNextLevel() nextLevelParametersObject +++++++finishing realted : ', nextLevelParametersObject);

	return nextLevelParametersObject;
}

// This tears apart an object with properties that are objects.
// It opens up all the nested objects to create a flat list of properties
// of an object. Then AddWidParameters is called, which in turn calls
// AddMaster to get the wid placed into the db or local storage. Note that 
// nothing calls this except the test. This is the highest level of the adding
// process for DOT notation.
function AddWidObject(inputObject) {
	var OutParameters = ConvertToDOTdri(inputObject); 
	//OutParameters = tolowerparameters(OutParameters, OutParameters['command.convertmethod']);
	Wid = AddWidParameters(OutParameters);
	return Wid;
	
			//printToDiv('Function AddWidObject() Constant input : ', input );
			//printToDiv('Function AddWidObject() ConstandtdtoobjectDOT : ', dtoobjectDOT );
			//printToDiv('Function AddWidObject() Received into addWidObject inputObject : ', inputObject );
			//printToDiv('Function AddWidObject() Sent out from OutParameters : ', OutParameters );
}

// Sets up call to addwidmaster (to add a parameter to the DTO ?)
function AddWidParameters(parameterObject) {

				//printToDiv('Function AddWidParameters()  parameterObject : ',  parameterObject);

	// obj sets up the match and nomatch arrays
	var obj = MatchPrefix(parameterObject, "command");
	// inputParametersList is the part of the DOT that does not match the DTO
	var inputParametersList = obj.nomatch;
	// commandList is the part of the DOT that matches the DTO
	var commandList = obj.match;
	// commandobject makes an object out of the commandlist
	var commandobject = listToObject(commandList);
	var inputParametersObject = listToObject(inputParametersList);


	printToDiv('Function AddWidParameters()  inputParametersObject : ',  inputParametersObject);
	//printToDiv('Function AddWidParameters()  commandList : ',  commandobject);
	
	var parameterObject={};
	var dtoobject ={};
	var metadata = "";

	commandobject = tolowerparameters(commandobject, {'command.dtotype':'add', 'command.convertmethod':'add', 'command.checkflag':'add', 'command.inherit':'add', 'command.accesstoken':'add'});
	inputParametersObject = tolowerparameters(inputParametersObject, {'metadata.method':'add','metadata.style':'true', 'wid':'add', 'primarywid':'true', 'secondarywid':'true', 'relationshiptype':'true'});
	if (inputParametersObject["wid"]===undefined) {inputParametersObject["wid"]=""};
	//printToDiv('Function AddWidParameters()  commandList : ',  commandobject);
	olddebug=Debug;
   	Debug=olddebug;
	var checkflag = commandobject["command.checkflag"];
	var accesstoken = commandobject["command.accesstoken"];
	var inherit = commandobject["command.inherit"];
	var dtotype = commandobject["command.dtotype"];
	var convertmethod = commandobject["command.convertmethod"];

    printToDiv('Function AddWidParameters()  checkflag ',  checkflag);
    printToDiv('Function AddWidParameters()  accesstoken : I ',  accesstoken);
    printToDiv('Function AddWidParameters() inherit : I ',  inherit);
		
    printToDiv('Function AddWidParameters()  dtotype : dtotype ',  dtotype);
  	Debug=olddebug;

	//***************
/*  	if ((inputParametersObject['metadata.method'] !== "") && (dtotype=="")) {
		metadata = inputParametersObject['metadata.method']
		dtoobject=getWidMaster({'wid':metadata, 
								'command.convertmethod':'dto',
								'command.dtotype':metadata});
		};
	if (dtotype!=="") { // first read the wid, then figure out its method, then get the dto object based on it
    	printToDiv('Function AddWidParameters()  dtotype : II ',  dtotype);
    	parameterObject=getFromMongo({"wid":inputParametersObject["wid"]});
		dtoobject=getWidMaster({'wid':parameterObject["metadata.method"], 
								'command.convertmethod':'dto',
								'command.dtotype':'defaultdto'});
		}*/
		//****************/

/*	if ((inputParametersObject['metadata.method'] !== "") && (dtotype=="")) {
		metadata = inputParametersObject['metadata.method'];
		
		//inputParametersObject['metadatamethod'] = dtotypeindex;
		//delete inputParametersObject['metadata.method'];
		dtoobject=getWidMaster({'wid':metadata, 'command.convertmethod':'dto'});
		}
	olddebug=Debug;
   	Debug='false';
	printToDiv('Function AddWidParameters()  dtoobject I : ',  dtoobject);
	Debug=olddebug;
	if (dtotype!=="") { // first read the wid, then figure out its method, then get the dto object based on it
    	printToDiv('Function AddWidParameters()  dtotype : II ',  dtotype);
    	parameterObject=getFromMongo({"wid":inputParametersObject["wid"]});
		dtoobject=getWidMaster({'wid':parameterObject["metadata.method"], 
								'command.convertmethod':'dto',
								'command.dtotype':'defaultdto'});
		olddebug=Debug;
   		Debug='true';
		printToDiv('Function AddWidParameters() dtoobject return: ',  dtoobject);
		Debug=olddebug;
		}
*/
		olddebug=Debug;
		Debug=olddebug;
		printToDiv('Function addWidParameters ** before ' , inputParametersObject);
    	printToDiv('Function AddWidParameters() convertmethod ',  convertmethod);
    	printToDiv('Function AddWidParameters()  dtotype : dtotype ',  dtotype);


    	parameterObject = cleanparameters(inputParametersObject, dtotype, accesstoken, "add", convertmethod);
    	printToDiv('Function AddWidParameters()  inputParametersObject ',  inputParametersObject);
    	inputParametersObject = parameterObject.parms; // ************ prob dont need this
    	dtoobject = parameterObject.dto;   // ************

    	// not sure if this is important
    	if ((inputParametersObject['metadata.method'] !== "") && (dtotype=="")) {
			metadata = inputParametersObject['metadata.method'];
			}

// clean parameters should filter parameters based on dtotype
// if dtotype <> inputparmeterobject[method] then add preamble to all parameters
// ((inputParametersObject['metadata.method'] !== "") && (dtotype=="")) 
// (dtotype!=="") 


		printToDiv('Function addWidParameters ** after ' , inputParametersObject);
		//if (convertMethod=="nowid") {
		//	delete resultObj["wid"];
		//	delete resultObj["metadata.method"];
		//}
		Debug=olddebug;

	printToDiv('Function AddWidParameters() dtoobject return: ',  dtoobject);
	//printToDiv('Function AddWidParameters() metadata : ',  metadata);

	if (inherit) {
		var moreParameters = getFromMongo({'wid':inherit});
		if (moreParameters) {
			inputParametersObject = jsonConcat(inputParametersObject,moreParameters);  // if duplicates then currentLevelObject{} wins
		} 
	}
								
	var inputList = objectToList(inputParametersObject);
	var dtoList=objectToList(dtoobject);	

	//printToDiv('Function AddWidParameters()  inputList : ',  inputList);
	//printToDiv('Function AddWidParameters()  metadata : ',  metadata);
	olddebug=Debug;
   	Debug=olddebug;
	printToDiv('Function AddWidParameters()  all parms to addmaster : ',  {"dtolist":dtoList, "inputlist":inputList, "metadata": metadata});
	Debug=olddebug;
	if (inputParametersObject["wid"]===undefined) {inputParametersObject["wid"]=""};
	Wid = AddMaster(dtoList, inputList, inputParametersObject["wid"], metadata);

	printToDiv('Function AddWidParameters() came back from addmaster : ',  Wid);		

	return Wid;
}

function AddMaster(dtoList, parameterList, widName, dtotype) {
	//Debug='true';
	// printToDiv('Function AddMaster : dtoList ', dtoList);	
	// printToDiv('Function AddMaster : parameterList', parameterList);	
	// printToDiv('Function AddMaster : widName ', widName);	
	// printToDiv('Function AddMaster : dtotype', dtotype);	
	printToDiv('Function AddMaster : inbound parms all ', {"dtolist":dtoList, "parameterList":parameterList, "widName":widName, "dtotype":dtotype});	
    var ChildrenListobj = {}; // go through list of incoming parameters to generate a list of childrent dtos
    var dtoobject = listToObject(dtoList); // generate a copy of dtolist that is an object        
    for (key in dtoobject) { // go through each parameter
        if ((dtoobject[key] == 'onetomany') || (dtoobject[key] == 'onetoone')) {
            // see if dto list tells us is a child
            ChildrenListobj[key] = dtoobject[key]; // add it to children object list
        	}
    	}
	printToDiv('Function AddMaster the childrent DTOs of this object: ChildrenListobj: ', ChildrenListobj);

    var ParentdtoList = dtoList; // now go through childrent list and delete from copy of incoming parameters
    var ParentList = parameterList; // anything related to these children

    for (currentparameter in ChildrenListobj) {
        ParentList = MatchDelete(ParentList, currentparameter);
        ParentdtoList = MatchDelete(ParentdtoList, currentparameter);
   		}	

    var ParentObject = {}; // add survivors -- that is the parent
    var ParentWid = '';

    ParentObject = MongoAddEditPrepare(ParentdtoList, ParentList, widName, dtotype);
    ParentWid = ParentObject["wid"];

	//olddebug=Debug;
	//Debug='true';

    var RelatedListParameters = SplitObjectList(parameterList, ParentList); // figure out what the left over parameters are
    	RelatedListParameters = RelatedListParameters.nomatch;
    var RelatedListdto = SplitObjectList(dtoList, ParentdtoList);
    	RelatedListdto = RelatedListdto.nomatch;
	printToDiv('Function AddMaster : RelatedListParameters, after adding parent, now add these children parameters', RelatedListParameters);	
	printToDiv('Function AddMaster : RelatedListdto, , after adding parent, now add these children dto', RelatedListdto);	

    var attrtype = "";							// onetoone we will search for only one realted (last), onetomany (all)
    var editflag = "";					// do we need to read (find out widnames) before add
    var attr = "";
    var dtotype = "";
    var ParametersToAdd=[];
    var SplitParameters=[];
    var ChildrendtoList=[];
    var ChildWid='';
    var widtoadd='';
    var widlist = [];
    var parameterindexobj = {};
	var currentparameter='';
 	var splitkey =''
 	var currentNumber=0;
 	var sortable=[];
 	var currentitem='';
 	var childrentype=''
    for(childrentype in ChildrenListobj) { 	// step through all direct children
    	editflag='false';
        attr = ChildrenListobj[childrentype]; 	// onetoone or onetomany?  -left side of ChildrenListobj is the dto name
        printToDiv('Function AddMaster : process this child object childrentype + attr', childrentype+' '+attr);
        //printToDiv('Function AddMaster : attr', attr);
        //printToDiv('Function AddMaster : parameterindexobj', parameterindexobj);

        // this was moved insdie child

	    //if (RelatedListParameters!==[]) {}
	    parameterindexobj = {}; // create a list of (children) parameters that start with number 
	    for (currentcount in RelatedListParameters) {
	    	//printToDiv('Function AddMaster : currentcount', currentcount);	
	  		currentparameter = RelatedListParameters[currentcount].key;
	  		//printToDiv('Function AddMaster : currentparameter', currentparameter);
	        splitkey = currentparameter.split(".");
	        //printToDiv('Function AddMaster : splitkey', splitkey);
	        if (splitkey[0]==childrentype) {
	        	currentNumber = 0;
	       	 	if (splitkey[1]!==undefined) {currentNumber = Number(splitkey[1])};
	        	//printToDiv('Function AddMaster : currentNumber', currentNumber);	
	        	if (currentNumber>=0) {
	            	//printToDiv('Function AddMaster : currentNumber II ', currentNumber);
	            	parameterindexobj[splitkey[1]] = splitkey[0];	
	        		}
	    		}
	    	//printToDiv('Function AddMaster : parameterindexobj, sorted, which children have dots ', parameterindexobj);	
	    	//printToDiv('Function AddMaster : parameterindexobj I  ', parameterindexobj);
	    	}

	    	sortable=[];
	    	for (currentitem in parameterindexobj) {
	    		sortable.push([currentitem, parameterindexobj[currentitem]]);
	    		}
			printToDiv('Function AddMaster : parameterindexobj II  ', sortable);	
	    	// code below added 10/2 sort parameterindexobj	

	    	if (Object.keys(parameterindexobj).length !== 0) {
		    	sortable=sortable.sort(function(aObj, bObj) {
		   			var a = getAttributeByIndex(aObj, 0);
		   			var b = getAttributeByIndex(bObj, 0);     
		   			if (a < b) return -1;
		   			if (a > b) return 1;
		    		return 0;
		 			});	
				}

			parameterindexobj=sortable;
			
		printToDiv('Function AddMaster : parameterindexobj, sorted, which children have dots ', parameterindexobj);	
		
		// ** note there will be issues with sort


        if (Object.keys(parameterindexobj).length !== 0) {	// for this children, any parameters with number?
            editflag = 'true'					// if we had parameterindex, then edit must be true
        	} 
        	
        //printToDiv('Function AddMaster : editflag', editflag);        	
        if (attr == 'onetoone') {
            editflag = 'true'; 					// onetoone is alway edit true
            attrtype = 'last';					// onetoone -- read last record
        	}
        if (attr == 'onetomany') {
            attrtype = 'all'					// onetomany --- read all records
       		} 
       	widlist = [];
        if (editflag == 'true') {				// edit means read wids before write -- to get wid names
        										// get list of related wids								
            var widlist = simpleQuery(ParentWid, "attributes", attrtype, "forward", childrentype, "", "");
            printToDiv('Function AddMaster : widlist, these are the wids related to parent and current child', widlist);	
        	}

        // do children with numbers first

        SplitParameters = MatchPrefixDelete(RelatedListdto, childrentype);
 	       	ChildrendtoList = SplitParameters.match;
    	    RelatedListdto = SplitParameters.nomatch; 

          // save copy for next iteration
        printToDiv('Function AddMaster : ChildrendtoList - 111, parameters for current child', ChildrendtoList);	
        printToDiv('Function AddMaster : RelatedListdto - 111, dto for current child, now determine if number or not A/B' , RelatedListdto);	

        if (Object.keys(parameterindexobj).length !== 0) {
            for (var currentchild in parameterindexobj) {
            	printToDiv('Function AddMaster : childrenttype.currentchild - 222, process this number first, look up in widlist', childrentype+'.'+currentchild);				
                SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype+'.'+currentchild);	// separate parameters to those that start with curr number
                	ParametersToAdd = SplitParameters.match;
                	RelatedListParameters = SplitParameters.nomatch;		// each iteration relatedlistparameter will become smaller
                //printToDiv('Function AddMaster : editflag', editflag);
                if (ParametersToAdd.length!==0) {		
	                widtoadd='';              
	                if ((editflag='true') && (widlist!="")) {
	                	if (widlist[currentchild]!==undefined) {   // removed -1
	                		for (var widName in widlist[currentchild]) {  // removed -1
		               			widtoadd=widName;
		               			}
		               		}
		               	};
	                printToDiv('Function AddMaster : ChildrendtoList - 222 wid+childdto A-', {"widtoadd":widtoadd, "ChildrendtoList":ChildrendtoList});	
	                printToDiv('Function AddMaster : ParametersToAdd - 222, childdto+childparameters A- ', {"childrentype":childrentype, "ParametersToAdd": ParametersToAdd});	
	                ChildWid = AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype);
	                printToDiv('Function AddMaster : came back ChildWid -- 222, child added, now call addrelationship A-', ChildWid);	
	                AddMongoRelationship(ParentWid, ChildWid, "attributes");
	                //printToDiv('Function AddMaster : came back add relationship -- 222', ChildWid);	
	            	}
            	}
       		}

       	SplitParameters = MatchPrefixDelete(RelatedListParameters, childrentype); // split parameters based on childtype
        	ParametersToAdd = SplitParameters.match;						// do right now
        	RelatedListParameters = SplitParameters.nomatch;   				// do next iteration
        	printToDiv('Function AddMaster : ParametersToAdd 333 parameters for current child B and not numbers', ParametersToAdd);
            printToDiv('Function AddMaster : RelatedListParameters 333 dto for current child B', RelatedListParameters);	


        //if (ParametersToAdd!=='') {	
        if (ParametersToAdd.length!==0) {	
        	widtoadd='';   // this is to catch onetoone case
            if ((attr=='onetoone') && (widlist!="")) {
            	if (widlist[0]!==undefined) {
            		for (var widName in widlist[0]) {
               			widtoadd=widName;
               			}
               		}
               	};
            printToDiv('Function AddMaster : ChildrendtoList - 444 wid+childdto B- ', {"widtoadd":widtoadd, "ChildrendtoList":ChildrendtoList});	
	        printToDiv('Function AddMaster : ParametersToAdd - 444, childdto+childparameters B-', {"childrentype":childrentype, "ParametersToAdd": ParametersToAdd});	
            ChildWid = AddMaster(ChildrendtoList, ParametersToAdd, widtoadd, childrentype);
            printToDiv('Function AddMaster : came back ChildWid -- 444, now call addrelationship B-', ChildWid);	
            AddMongoRelationship(ParentWid, ChildWid, "attributes");
            //printToDiv('Function AddMaster : came back add relationship -- 444', ChildWid);	

        	}	
    }
    return ParentWid
    //Debug=olddebug;
}

// Adds a wid to the database and returns the parent wid (to demonstrate success?)  
// The DTOList and the inputList consist of an input list, index list, and original input list.

function MatchDelete(TargetList, TargetParameter) {      // delete all parameters starting with targetparameter
	var output = [];
	//printToDiv('Function MatchDelete : TargetList ', TargetList);	
	//printToDiv('Function MatchDelete : TargetParameter ', TargetParameter);	
	for (var item in TargetList) {
		//printToDiv('Function MatchDelete item', TargetList[item].key);	
		if ((TargetParameter+'.')!==(TargetList[item].key.substring(0,TargetParameter.length+1))) {
			output.push(TargetList[item]);
			}
		}
		// only items that are not equal to the '.' survive
	printToDiv('Function MatchDelete : output ', output);	
	return output;
}

function MatchPrefixDelete(TargetList, TargetParameter) {
	var targetobject=listToObject(TargetList);
	var split=MatchPrefix(targetobject,TargetParameter);
	var out1=DeletePrefix(split.match, TargetParameter)
	var out2=split.nomatch;
	return {
		match : out1,
		nomatch : out2 
		};
}

function DeletePrefix(arr, kw ) {
	if (kw=="") {return arr}
		else{

	var result = [];

						//printToDiv('Function DeletePrefix arr : ',  arr);   
						//printToDiv('Function DeletePrefix kw : ',  kw);  

	if (arr.length>0  && (kw.length>0)) {           
		for (i = 0; i < arr.length; i++) {
			var obj = arr[i];                
			var objvalue = obj["value"];
			var objkey = obj["key"];

						//printToDiv('Function DeletePrefix objvalue : ',  objvalue); 
						//printToDiv('Function DeletePrefix objkey : ',  objkey);  

			if (objkey != kw) {

						//printToDiv('Function DeletePrefix length.objkey : ',  objkey.length);  
						//printToDiv('Function DeletePrefix length.kw : ',  kw.length); 
						// seems to have big if kw = e and a.x=y then x=y 

				if (objkey.length > kw.length){
					partial = objkey.substring(0,kw.length+1);

						//printToDiv('Function DeletePrefix partial : ',  partial);  

					kwdot=kw+'.';

						//printToDiv('Function DeletePrefix kwdot : ',  kwdot);  

					if (kwdot == partial) {
						afterdot=kw.length+1;

						//printToDiv('Function DeletePrefix afterdot : ',  afterdot);  

						beforekey = objkey;
						objkey = beforekey.substring(afterdot);

						//printToDiv('Function DeletePrefix objkey after substring : ',  objkey);  
					}   
				} 
						//printToDiv('Function DeletePrefix obkey before push : ',  objkey);   

				if (objkey.length > 0) {

						//printToDiv('Function DeletePrefix objkey push : ',  objkey);  

					result.push({"key" : objkey , "value" :  objvalue });

						//printToDiv('Function DeletePrefix objkey push : ',  objkey);	
				}
			}
		} 
	} 
						//printToDiv('Function DeletePrefix result : ',  result);       
	return result;    
}}

// Add all the parameters of b to a. This is the exact same function as
// jsonConcat around line 550-650. Since extend is not used yet, it would be 
// a good idea to just use jsonConcat as it is already in use elsewhere.
function extend(a, b){
	for(var key in b){
		if(b.hasOwnProperty(key)){
			a[key] = b[key];
		}
	}
	return a;
}

// Splits a list of parameters. If the value of a parameter
// is not attr, it will be put into the ParentdtoList. As soon
// as the first parameter of 'onetomany' is found, the rest of 
// the list will be put into the childDTOlist.
function SplitKeywordSet(list, attr ){
	if(typeof(attr) == undefined){
		attr = 'onetomany';
	}

	var ParentdtoList = [];
	var ChildrendtoList = [];
	var attrFoundFlag  = 0;
	
	for(var i= 0;  i < list.length ; i++ ){
		item = list[i];
		if((attrFoundFlag == 0) && (item["value"] != attr )){
			ParentdtoList.push(item);
		}else{
			ChildrendtoList.push(item);
			attrFoundFlag = 1;
		}
	}
	
	var objChildParentdtoList = {
		"parentlist" : ParentdtoList,
		"childrenlist" : ChildrendtoList
	};					
	return objChildParentdtoList;
}

// Sorts a list of arrays based on the length of the array
// The sort will be ascending (a,b as opposed to b,a) unless
// the function returns a value other than 1. To see more
// goto: http://www.javascriptkit.com/javatutors/arraysort2.shtml#.UkF_G4b2qSo
function Sortonetomanys(list, attr){
	printToDiv('Function Sortonetomanys()  list : ',  list);
	printToDiv('Function Sortonetomanys()  attr : ',  attr);
	if(typeof(attr) == undefined){
		attr = 'onetomany'
	}
	output = list.sort(function(a,b) {
		if (a.key.split('.').length < b.key.split('.').length){
			return -1;
		}
		else if (a.key.split('.').length > b.key.split('.').length ){
			return 1;
		}
		else if(a.value == attr){
			return 1;
		}
		else if(b.value == attr){
			return -1;
		}
		else{
			return 0;
		}
	});
	printToDiv('Function Sortonetomanys()  output : ',  output);
	return output;
}

// Looks for the key word in the input and returns those fields that match the DTO in
// the match hash, and those that don't in the nomatch hash. This is used to filter out
// the parameters that the DTO is filtering for.
function MatchPrefix(input, kw) {
	var match = [];
	var nomatch = [];

	if (kw=="") {
		match = objectToList(input);
		return {match:match, nomatch:nomatch}
	}
		else {

				//printToDiv('Function MatchPrefix, kw: ',  kw);
				//printToDiv('Function MatchPrefix, input: ',  input);

	for (key in input) {
		partial = key.substring(0, kw.length + 1); 

		kwdot = kw + '.';
		if ((kwdot == partial) || (kw == key))

				// var arr = key.split('.');
				//var arr = key.substring(0,key.lastIndexOf('.'));
				//printToDiv('Function MatchPrefix arr: ',  arr);
				// if ((arr === kw) || (key === kw)) 

		{
			match.push({ "key": key, "value": input[key] });
		} else {
			nomatch.push({ "key": key, "value": input[key] });
		}
	};
	return {
		match: match,
		nomatch: nomatch
	};
}}


/* lib.js functions */

// Examine the object, if you find a value of 'object', look
// inside that object. If you find a value of 'object', look
// inside....and so on. In the meantime, add the values of the 
// onject into parameters of 'res' (result).
function ConvertToDOTdri(obj) {        //dotize
	var res = {};
	(function recurse(obj, current) {
		for (var key in obj) {
			var value = obj[key];
			var newKey = (current ? current + "." + key : key);  // joined key with dot
			if (value && typeof value === "object") {
				recurse(value, newKey);  // it's a nested object, so do it again
			} else {
				res[newKey] = value;  // it's not an object, so set the property
			}
		}
	} 
	(obj)
	);
	return res;
}

// Deconstructs the dot.notation string into an object that has properties.
function ConvertFromDOTdri(input) {        //Expands to Real javascript object
	var keys = Object.keys(input);
	var result = {};

	for (var i = 0, l = keys.length; i < l; i++) {
		createObjects(result, keys[i].split('.'), input[keys[i]]);
	}
	return result;
}	

// Creates an object with a hash parent:value. If the chain array is more that 1, 
// recurse until there is only 1 chain so you get chain:value returned. This is called only 
// from ConvertFrom DOT, so you can see it part of the process of deconstructing the dot.notaion string.
function createObjects(parent, chainArray, value) {
	if (chainArray.length == 1) {
		parent[chainArray[0]] = value;
		return parent;
	}
	else {
		parent[chainArray[0]] = parent[chainArray[0]] || {};
		return createObjects(parent[chainArray[0]], chainArray.slice(1, chainArray.length), value);
	}
}

// Strips the numbers from hash keys. It returns 3 arrays: input list, index list, and original input list.
// Used by addWidParameters.
function RemoveIndex(input) {
	var result = [];

			//input = { 'a<1>': 'x', 'b<3>': 'y', 'c': 'z', 'd.e': 't', 'f<4>': 'y' };

	var list1 = [];
	var list2 = [];
	var list3 = [];
	
	for (key in input) {
		//case1
		var s1 = key;
		var re = /<(\d+)>/;
		s1 = s1.replace(re, '');

				//console.log(s1);

		var o1 = {};
		o1["key"] = s1;
		o1["value"] = input[key];
		list1.push(o1);

		//case2
		var s2 = key;
		s2 = s2.match(re);
		var o2 = {};
		if (s2) {
			o2["key"] = s1;
			o2["value"] = s2[1];
		} else {
			o2["key"] = s1;
			o2["value"] = '';
		}
		list2.push(o2);

		//case3
		var o3 = {};
		o3["key"] = key;
		o3["value"] = input[key];
		list3.push(o3);
	}

				//console.log(list1);
				//console.log(list2);
				//console.log(list3);

	result.push(list1);
	result.push(list2);
	result.push(list3);

	return result;
}

// Looks to move each item in the input into an object that
// has a match and nomatch hash to see what the DTO has 
// filtered out of the list as relevent fields.
function SplitObjectList(input, dto) {
	var match = [];
	var nomatch = [];
	for (i = 0; i < input.length; i++) {
		var item = input[i];
		var key = item["key"];        
		var found = false;
		for (j = 0; j < dto.length; j++) {
			var subitem = dto[j];
			var subkey = subitem["key"];            
			if (key === subkey) {                
				found = true;
			}
		}
		if (found) {
			match.push(item);
		} else {
			nomatch.push(item);
		}
	}
	return {
		match: match,
		nomatch: nomatch
	};
};

function SplitObject(input, dto) { // added 10-5 not used for anything yet
	var match = {};
	var nomatch = {};
	var item = "";
	for (item in input) {
		if (dto[item]==input[item]) {
			match[item]=input[item];
			}
		else {
			nomatch[item]=input[item];
			}
		}
	return {
		match: match,
		nomatch: nomatch
		};
};

// Returns an object made from an array
function listToObject(arrayOfObjects){
	var finalObject ={};
	if(arrayOfObjects){
		for (var i = 0; i < arrayOfObjects.length; i++) {
			var object = arrayOfObjects[i];
			finalObject[object["key"]] = object["value"];
		}
	}	
	return finalObject;
}

// Returns an array made from an object
function objectToList(object){
	var finalArray = [];
	for(key in object){
		finalArray.push({"key":key, "value":object[key]});
	}
	return finalArray;
}

// Counts the number of hashes in an object
function getObjectSize(parameters){
	var size = 0, key;
	for (key in parameters) {
		if (parameters.hasOwnProperty(key)) size++;
	}
	return size;
}

// Returns true if the parameter is lower case
function isParameterLower(parameters, str) {
	getObjectSize(parameters); 
	var length;
	if(parameters.length === undefined) {
		length = getObjectSize(parameters);
	}else {
		length = parameters.length
	}
	for (key in parameters) {	//rewritten
		if(key.toLowerCase()==str){
			return true;
		}
	}
}

// Finds the first key in parameters that matches the string, or nothing if none is found	
function firstOrDefault(parameters, str) {
	var length;
	if(parameters.length === undefined) {
		length = getObjectSize(parameters);
	}else {
		length = parameters.length
	}
	for (key in parameters) {	//rewritten
		if(key.toLowerCase()==str){
			return key;
		}
	}
}

// Deletes a hash from an object	
function remove(parameters, str){
	var length;
	if(parameters.length === undefined) {
		length = getObjectSize(parameters);
		for (key in parameters) {	//rewritten
			if(key.toLowerCase()==str){
				delete  parameters[key];
			}
		}
	}else {
		length = parameters.length
	}
}

// Creates output based on whether the flas is DTO or JSON. It formates
// the DTO strings with quotes around the values. For JSON, it checks to make sure that
// numbers are actual numbers, and strings have quotes around them.
function CleanBasedOnCheckflagList(flag, input, dto) {
	output  = input;

	if (flag === "dto") {
		for (i = 0; i < output.length; i++) {
			var item = output[i];
			var key = item["key"];            
			for (j = 0; j < dto.length; j++) {
				var subitem = dto[j];
				var subkey = subitem["key"];
				if (key === subkey) {
					if(subitem["value"].toLowerCase() == 'string' ){
						output[i]["value"] = '"' + output[i]["value"] + '"';
					} 
				}
			}            
		}
	}
	
	if (flag == "json") {
		for (i = 0; i < output.length; i++) {
			var item = output[i];
			var key = item["key"];            
		   for (j = 0; j < dto.length; j++) {
				var subitem = dto[j];
				var subkey = subitem["key"];
				if (key === subkey) {
					if((typeof(item["value"]) == 'object') && (item["value"]['number'] !== undefined)){
						output[i]["value"] = item["value"]['number'];
					}
					else{
						if(subitem["value"].toLowerCase() == 'string' ){
							output[i]["value"] = '"' + output[i]["value"] + '"';
						}
					}   
				} 
			}            
		}
	}
				//console.log(output);
	return output;
}

function tolowerparameters(parameters, rightparameters) {
 //printToDiv('Function tolowerparameters : input parameters',  parameters);
 //printToDiv('Function tolowerparameters : input rightparameters',  rightparameters);
 var outputparameters = {};
	for(eachparameter in rightparameters) {
		if ((rightparameters[eachparameter].length>0) && (rightparameters[eachparameter]=='add')) {
			outputparameters[eachparameter.toLowerCase()] = "";
		}
	}
  		
	for(eachparameter in parameters) {
		if ((rightparameters[eachparameter.toLowerCase()] == 'true') || (rightparameters[eachparameter.toLowerCase()] == 'add')) {
			// original line	
			//outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter].toLowerCase();
			// New version, simply checks to make sure that parameters[eachparameter] has a value that can be sent to .toLowerCase()
			if (parameters[eachparameter] != undefined && parameters[eachparameter] != "") {
				outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter].toLowerCase();
			}
		} else {
			outputparameters[eachparameter.toLowerCase()] = parameters[eachparameter];
		}
	}
 //printToDiv('Function tolowerparameters : output outputparameters',  outputparameters);
 return outputparameters;
}

//rightparameters && rightparameters[eachparameter] && 


function getAttributeByIndex(obj, index){
 var i = 0;
 for (var attr in obj){
  if (index === i){
   return  attr;
  }
  i++;
 }
 return null;
}

// Adds the key of object2 to object 1
function jsonConcat(o1, o2) {
	for (var key in o2) {
		if ((o1[key]===undefined) || (o1[key]=="")) {
			o1[key] = o2[key];
			}
	}
	return o1;
}

// Returns if o is a string or not
function isString(o) {
	return typeof o == "string" || (typeof o == "object" && o.constructor === String);
}

// Returns true if the val is an int, or false
function isInteger(val) {
  return val.match(/^[0-9]$/);
}

// Returns the number of hashes in an object
function countKeys(obj) {
	var size = 0, key;
	for (key in obj) {
		if (obj.hasOwnProperty(key)) size++;
	}
	return size;
}
