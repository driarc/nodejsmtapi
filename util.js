util = function(){
	
	// Utility function to return json with all keys in lowercase
	var toLowerKeys = function(obj){
	    var key, keys = Object.keys(obj);
	    var n = keys.length;
	    var newobj={}
	    while (n--) {
	      key = keys[n];
	      newobj[key.toLowerCase()] = obj[key];
	    }
	    return newobj;
	};

	// Utility function to return json attr count
	var jsonLength = function(obj) { 

		return Object.keys(obj).length; 
	};



// function mergeParameters(c1,c2){
//     var mergedMap = c1;

//     for(key in c2 && (!c1[key])){
//         c1[key] = c2[key];
//     };

//     return c1;
// } 




// Utility function to cleanup mentioned attr:val pairs from JSON passed in
	var cleanupParameters = function(inboundParameters,paramsToClean){
	    var outBoundParameters = inboundParameters;
	    
	    for(var i=0;i<paramsToClean.length;i++){
	        if(outBoundParameters[paramsToClean[i]]){
	            delete outBoundParameters[paramsToClean[i]];
	        }
	    } 
	    return outBoundParameters;
	}

	// utility function to merge two JSON objects
	// var mergeParameters = function(c1,c2){
	//     var mergedMap = c1;
	//     for(var attr in c2){
	//     	mergedMap[attr] = c2[attr];
	//     } 
	    

	//     return mergedMap;
	// } 
	
	var getParamArray = function(data){
		var returnArray = new Array();

		for(var attr in data){
			returnArray.push({"ParameterName":attr,"ParameterValue":data[attr]});
		} 

		return returnArray;
	}


	return {
		"toLowerKeys" : toLowerKeys,
		"jsonLength" : jsonLength,
		"cleanupParameters" : cleanupParameters,
		"mergeParameters" : mergeParameters,
		"getParamArray" : getParamArray
	}
}();