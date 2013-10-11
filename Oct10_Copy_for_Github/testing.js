// This code is the functionality of the testing environment.

// testSequeceObjList calls SequenceWidObjectCommandActions
// it will then process commands, including calling verifyAddGetWids
// when the verification of the test is called for.
	// when html starts it will call starttest
// different calls in starttest can be modified to do different things
// this is a good place to pre enter data or to do random tests
//
// Debug = 'true' will make printdivs work

Debug = 'false';
widMasterKey = "widmaster_";

function bootprocess(){
	clearLocalStorage();
	//testAddWids();
	//displayAllWids();
}

function execute_function (myfunc) {
		if (typeof window[myfunc] == 'function') {
	 	   alert("I found the function...let's go run it!");
	 	   result = window[myfunc]();
		} else {
			alert('I could not find your function');
		}
}


function roger123(resultwid){
	clearLocalStorage();
	execute("AddWidObject", {"wid":"resulta","a":"b"}, "resultabc", "storeabc")
	// myfunc--what to execute, inputparameters--what parameters to send, outwidname--
	// where to store results, inputwidname--where to store inputparamters
	execute("getWidMaster", {"wid":"resulta", "command.convertmethod":"nowid"}, "resultb");
	logverify("rogertest123_test1", resultwid, "resultb", "", "", {"a":"b"});
	// logverify: (testname--what name should we give this test, resultwid--where to APPEND resutls by testname
	// parmwid1, parameterobj1,-- what to compare 1 -----what to compare2: parmwid2, parameterobj2){
	execute("getWidMaster", {"wid":"storeabc", "command.convertmethod":"nowid"}, "resultc");
	logverify("rogertest123_test2", "resultwid", "resultb", "", "resultc", "");
	verifysummary("resultwid");
	// where to look for pass fail
}

function debugon(){
	Debug='true';
}
function debugoff(){
	Debug='false';
}

function executelist(functionlist) {
	if (!functionlist) {functionlist=["roger123"]}
	//
	for (var fn in functionlist) {
		if (typeof window[fn] == 'function') {
			window[fn]();
			} 
		else {
			alert('I could not find your function');
		}
	}
	verifysummary("resultwid");
	updateMemory();
}

function execute(myfunc, inputparameters, outwidname, inputwidname){
	if (typeof window[myfunc] == 'function') {
		//Create the function call from function name and parameter.
		var funcCall = "";
		if (inputparameters) {funcCall = myfunc + "(" + JSON.stringify(inputparameters) + ");"}
			else {funcCall = myfunc + "();"};
		printToDiv('execute - funcCall',funcCall);
		var output = eval(funcCall); //Call the function		
		if (outwidname) {addtomongo(outwidname, output)};
		} 
	else {alert('I could not find your function');}
	if (inputwidname) {addtomongo(inputwidname, inputparameters)};
	printToDiv('execute - outwidname',outwidname);
	printToDiv('execute - output',output);
	updateMemory();
}

function verifysummary(resultwid) {
	var olddebug = Debug;
	var testfailflag = "false";
	Debug='true';
	if (resultwid===undefined) {
		printToDiv('Test Failed: testname:','test undefined');
		}
	else {
		var resultsobject = getFromMongo({'wid': resultwid});
		if (resultsobject!==undefined) {
			for (result in resultsobject) {
				if (resultsobject[result]=="FAIL") {
					testfailflag='true';
					printToDiv('Test Failed: testname:',result);
					}
				}
			}
		}
	if (testfailflag=='false') {printToDiv('Test passed',resultwid);}
	Debug=olddebug;
}

function logverify(testname, resultwid, parmwid1, parameterobj1, parmwid2, parameterobj2){
	var resultsobject = {};
	olddebug=Debug;
	Debug='false';
	if (resultwid===undefined) {resultwid="resultwid"};
	if (testname===undefined) {testname="defaulttest"};
	printToDiv('logverify - parmwid1',parmwid1);	
	printToDiv('logverify - parmwid2',parmwid2);	
	if (parmwid1.length!=0) {parameterobj1=getFromMongo({'wid': parmwid1})};
	if (parmwid2.length!=0) {parameterobj2=getFromMongo({'wid': parmwid2})};
	printToDiv('logverify - parameterobj1',parameterobj1);
	printToDiv('logverify - parameterobj2',parameterobj2);
	var result = compareJSON(parameterobj1, parameterobj2);
	printToDiv('logverify - result',result);
	printToDiv('logverify - result.length',Object.keys(result).length);
	var testresults = "PASS";
	if (Object.keys(result).length!==0) {testresults="FAIL"}
	printToDiv('logverify - testresults',testresults);
	printToDiv('logverify - resultwid',resultwid);
	resultsobject=getFromMongo({'wid': resultwid});
	printToDiv('logverify  - resultsobject',resultsobject);
	printToDiv('logverify - testname',testname);
	resultsobject[testname]=testresults;
	printToDiv('logverify  - resultsobject',resultsobject);
	addtomongo(resultwid, resultsobject);
	printToDiv('logverify  - resultsobject',resultsobject);
	Debug=olddebug;
}

function compareJSON(obj1, obj2) { 
	var ret = {}; 
	for(var i in obj2) { 
		if(!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) { 
			ret[i] = obj2[i]; 
			// start taking out the parameters of the verification object			
		} 
		delete obj1[i];
	} 
	// If there are any parameters left in the verify object(obj1), add it to the results
	if (getObjectSize(obj1) > 0) {
		ret['Extra_Fields'] = obj1;
	}
	return ret; 
	}




var rerun_test_seq = "";
var did_all_pass = 1;


function RerunPassingTests() {
	var MasterTestList=["seq1"];
	for (var test in MasterTestList) {
		 execute(test)
		}

		var did_all_pass = testSequeceObjList(sequenceObjList, seqList);
	if (did_all_pass != -1) {
		alert ('All of the tests still passed');
	} else {
		alert ('Sorry...some of your tests failed.')
	}
	clearLocalStorage();
	RunPassingTests();
	displayAllWids();
}

// Here the que of tests is iterated through
function testSequeceObjList(sequenceObjList, seqList){
	did_all_pass = 1;
	if (seqList) {
		for (seqObjKey in sequenceObjList) {
			var sequenceObj = sequenceObjList[seqObjKey];		

			for (seqKey in seqList) {
				//$('#current_test').text('Current test: ' + seqList[seqKey]);

				var seq = seqList[seqKey];
				if (seq == sequenceObj['seq']) {
					SequenceWidObjectCommandActions(sequenceObj);
					break;
				}		
			}
		}
	} else {
		for (seqObjKey in sequenceObjList){
			var sequenceObj = sequenceObjList[seqObjKey];	
			SequenceWidObjectCommandActions(sequenceObj);
		}
	}
	return did_all_pass;
}

// This will process each command in the que
function SequenceWidObjectCommandActions(sequenceObj){
	switch(sequenceObj["command.action"]) {
		case 'add':
			//if(sequenceObj["seq"]){
			//	widMasterKey = sequenceObj["seq"];
			//}	
			if (sequenceObj["seq"]) {
				delete sequenceObj["seq"];
			}
			if (sequenceObj["command.action"]) {
				delete sequenceObj["command.action"];
			}	
			AddWidObject(sequenceObj);
			break;

		case 'get':
			if(sequenceObj["seq"]){
				delete sequenceObj["seq"];
			}
			if(sequenceObj["command.action"]){
				delete sequenceObj["command.action"];
			}
			var widObject = getWidMaster(sequenceObj);

				printToDiv('Function SequenceWidObjectCommandActions() GET output : ',  widObject);

			break;
		case 'query':

			relationShipQuery(sequenceObj);
			break;

		case 'clear':
			clearLocalStorage();
			break;

		case 'verify':
			if(sequenceObj["seq"]){
				rerun_test_seq = sequenceObj["seq"];
				delete sequenceObj["seq"];
			}
			if(sequenceObj["command.action"]){
				delete sequenceObj["command.action"];
			}
			did_all_pass = verifyAddGetWids(sequenceObj);
			break;
		// In case the command.action does not fall into the above categories,
		// try to run the function defined in command.action
		default:
			var the_run_function = sequenceObj["command.action"];
			if (the_run_function.length > 0) {
				delete sequenceObj["seq"];
				delete sequenceObj["command.action"];
				execute_function(the_run_function);
			} else {
				alert('Problem with command.action function name. Maybe check spelling?');
			}	

	}
	//resetMasterKey();
}


// When the test is completed, a getwid is compared to an assertion
// The result of that comparison will determine if all the tests still 
// pass, or what has begun to fail.
function verifyAddGetWids(sequenceObj){
	var widName = sequenceObj['verifywid'];
	delete sequenceObj['verifywid'];

	var getWidObject = getFromMongo({'wid': widName});
	delete getWidObject['LOG']

			printToDiv('Function verifyAddGetWids : getWidObject',  getWidObject, 'true');	
			printToDiv('Function verifyAddGetWids : sequenceObj',  sequenceObj, 'true');

	addToLocalStorage(widMasterKey + "verify_" + widName, sequenceObj);
	
	if(!sequenceObj || !getWidObject){
		printToDiv('Function verifyAddGetWids result for test ' + rerun_test_seq + ' : <u>MATCH UNSUCCESSFULL</u> ...either the test is missing, or the results to test are missing. ',  false, 'true');
		alert ('Test: ' + rerun_test_seq + '\nYour test for verify_result_' + widName + ' has failed. ...either the test is missing, or the results to test are missing.');
		// By returning a value of -1, there will be no success alert.
		did_all_pass = -1;
		return did_all_pass;
	}
	
	var result = compareJSON(sequenceObj, getWidObject);

	// result will have left over fields
	
	if (JSON.stringify(result) == '{}'){// equal

			printToDiv('Function verifyAddGetWids result for test ' + rerun_test_seq + ' : <u>MATCH SUCCESSFULL</u> ',  true, 'true');

		result['result'] = "successful";
		addToLocalStorage(widMasterKey + "verify_result_" + widName, result);
	} else {// not equal

				printToDiv('Function testGetWidMaster result: <u>MATCH UNSUCCESSFULL</u> with below difference :- ',  result, 'true');

		result['result'] = "unsuccessful";
		addToLocalStorage(widMasterKey + "verify_result_" + widName, result);
		alert ('Test: ' + rerun_test_seq + '\nYour test for verify_result_' + widName + ' has failed. Review your recent changes to diagnose the sudden failure of this test.');
		// By returning a value of -1, there will be no success alert.
		did_all_pass = -1;
	}
	return did_all_pass;
}


