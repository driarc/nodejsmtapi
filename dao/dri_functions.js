// function(window){


    

function executelocal(configuration,parameters,returnCallback){
    // logic for local execute
    parameters = JSON.stringify(parameters);
    
    var result = undefined;
    if (typeof window[parameters["ExecuteThis"]] == 'function') {
        result = window[parameters["ExecuteThis"]]();
        // $("#resultDiv").html('<pre>' + result + '</pre>');
    }
    returnCallback(result);
}



// logic for local add/update
var addlocal = function(){
    console.log('addlocal being called');
};


// logic for local get
var getlocal = function(){
    console.log('getlocal being called');
};

// logic to interact with dri
var getdatadri = function(method, dataIn, callback) {

		var dataI = util.getParamArray(dataIn);
		var result;
	    var success = false;
	    result = "";

	    var url = '/getdata/';
	    var apiKey = '2FFA4085C7994016913F8589B765D4E5';// TODO :: move to constants
	    var method = method;

  	    url = url + method + '?apiKey=' + apiKey;

	    $.ajax({
	        type: 'PUT',
	        dataType: 'json',
	        url: url,
	        headers: {'content-type':'Application/json'},
	        global: 'false',
	        cache: 'false',
	        async: 'false',
	        data: JSON.stringify(dataI),
	        success: function(data) {
	            if(data.error){
	                result = "<pre> APPLICATION ERROR: </pre>"+JSON.stringify(data);
	            }else{
	                if(Object.keys(data).length > 0) {
	                    result = "<pre> SUCCESS: </pre>"+JSON.stringify(data)[0];
	                } else {    
	                    result = "<pre> <<< No Data Returned >>> </pre>";
	                }
	            }
	            callback(data,callback);
	        },
	        error: function(data) {
	            result = "FAILED TO CALL EXECUTETHIS "+JSON.stringify(data);
	            callback(data,callback);
	        }
	    });

};  


function dripoint(configuration,parameters, callback){
    var methodToCall = parameters['executethis'];
    parameters = util.cleanupParameters(parameters,["executethis","configuration"]);
    var dataToPass = parameters;

    getdatadri(methodToCall,dataToPass,function(data){
        callback(data);
    });
}

function executedri(configuration,parameters, callback){
    // call executeInternal
    exeucteInternal(configuration,parameters,function(response){
        callback(response);
    }); 
}

function executeAjax(configuration,executeItem,returnCallback) {
    var result;
    var success = false;
    result = "";
        
    var a = [];
    a[0] = executeItem;
    executeItem = JSON.stringify(a);

    $.ajax({
        type: 'PUT',
        dataType: 'json',
        url: '/executethis',
        headers: {'content-type':'Application/json'},
        global: 'false',
        cache: 'false',
        async: 'false',
        data: executeItem,
        success: function(data) {
            if(data.error){
                result = "<pre> APPLICATION ERROR: </pre>"+JSON.stringify(data);
            }else{
                if(Object.keys(data).length > 0) {
                    result = "<pre> SUCCESS: </pre>"+JSON.stringify(data);
                } else {    
                    result = "<pre> <<< No Data Returned >>> </pre>";
                }
            }
            returnCallback(data);
        },
        error: function(data) {
            alert(JSON.stringify(data));
            result = "FAILED TO CALL EXECUTETHIS "+JSON.stringify(data);
            returnCallback(data);
        }
    });

    return success;

}


// 	return {
// 		"getdatadri" : getdatadri,
// 		"addlocal" : addlocal,
// 		"getlocal" : getlocal,
// 		"executelocal" : executelocal,
// 		"executeAjax" : executeAjax,
// 		"executedri" : executedri,
// 		"dripoint" : dripoint
// 	}
// }();