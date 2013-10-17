// for each in local storage



function execute(inputparameters){
    myfunc=inputparameters["ExecuteThis"];
    delete inputparameters["ExecuteThis"];
	printToDiv('execute - inputparameters',inputparameters);

	if (typeof window[myfunc] == 'function') {
		//Create the function call from function name and parameter.
		var funcCall = "";
		var myparameters = JSON.stringify(inputparameters)
		if (inputparameters) {funcCall = myfunc + "(" + myparameters + ");"}
			else {funcCall = myfunc + "();"};
		printToDiv('execute - funcCall',funcCall);
		var output = eval(funcCall); //Call the function	
		//if (outwidname) {addtolocal(outwidname, output)};
		} 
	else {alert('I could not find your function');}
	//if (inputwidname) {addtolocal(inputwidname, inputparameters)};
	printToDiv('execute - output',output);
	updateMemory();
}

function addtomongo(widName, widobject) {
	addToLocalStorage(widMasterKey+widName, widobject);
}


function getFromMongo(inputWidgetObject) {
	var output = {};
		if(inputWidgetObject["wid"]) {
			var widKey = inputWidgetObject["wid"].toLowerCase();

			output = getFromLocalStorage(widMasterKey + widKey);
			if (output == null) {output = {};}

		}
	
	return output;
}//End of getFromMongo function	



function getFromLocalStorage(key){
	return JSON.parse(localStorage.getItem(key));
}
function addToLocalStorage(key, value){
	localStorage.setItem(key, JSON.stringify(value));
}
function clearLocalStorage(){
	widMasterKey = "widmaster_";
	localStorage.clear();
	potentialwid = 0;
}
function removeFromLocalStorage(key){
	localStorage.removeItem(key);
}
function resetMasterKey(){
	widMasterKey = "widmaster_";
}
