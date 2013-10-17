function Hello_World() {
	alert('Hello world!');
}


function lukesroger123(resultwid){
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

function luke1() {
	clearLocalStorage();
	execute("AddWidObject", {"wid":"authordto", "first":"string", "last":"string", "age":"string", "metadata.method":"authordto"}, "", "");
	execute("AddWidObject", {"wid":"mary_jane", "first":"Mary", "last":"Jane", "age":"25", "metadata.method":"authordto"}, "", "");
	//execute("getWidMaster", {"wid":"mary_jane", "command.convertmethod":"nowid", "command.dtotype":"authordto"}, "result_of_get");
	execute("getWidMaster", {"wid":"mary_jane"}, "result_of_get");

	logverify("lukestest_test1", "my_resultwid", "result_of_get", "", "", {"metadata.method":"authordto","wid":"mary_jane","first":"Mary","last":"Jane","age":"25"});

	execute("getWidMaster", {"wid":"mary_jane","command.convertmethod":"nowid"}, "result_of_get2");

	logverify("lukestest_test2", "my_resultwid", "result_of_get2", "", "", {"first":"Mary","last":"Jane","age":"25"});


			// Will display if all tests passed in page output area
			verifysummary("my_resultwid");
			// Make sure the local storage is displayed
			displayAllWids();
			$('#divwidsdisplay').show('slow');
}

function luke1a() {
	clearLocalStorage();
	execute("AddWidObject", {"wid":"authordto", "first":"string", "last":"string", "age":"string", "bookdto":"onetomany", "metadata.method":"authordto"}, "", "");
	execute("AddWidObject", {"wid":"mary_jane", "first":"Mary", "last":"Jane", "age":"25", "metadata.method":"authordto"}, "", "");
	execute("AddWidObject", {"wid":"bookdto", "title":"string", "pages":"string", "ISBN":"string", "metadata.method":"bookdto"}, "", "");

	// Put in the relationship
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_authordto_bookdto","primarywid":"authordto","secondarywid":"bookdto", "relationshiptype":"attribute"}, "", "");

	// Add ISBN to mary with bookdto
	execute("AddWidObject", {"wid":"mary_jane", "ISBN":"111111fkdjsd", "command.dtotype":"bookdto"}, "", "");

	// Get with striped down params...nowid
	execute("getWidMaster", {"wid":"mary_jane","command.convertmethod":"nowid"}, "result_of_get2");
	logverify("lukestest_test2", "my_resultwid", "result_of_get2", "", "", {"first":"Mary","last":"Jane","age":"25"});


			// Will display if all tests passed in page output area
			verifysummary("my_resultwid");
			// Make sure the local storage is displayed
			displayAllWids();
			$('#divwidsdisplay').show('slow');
}

function luke2() {
	clearLocalStorage();
	execute("AddWidObject", {"wid":"authordto", "first":"string", "last":"string", "age":"string", "metadata.method":"authordto"}, "", "");
	execute("AddWidObject", {"wid":"mary_jane", "first":"Mary", "last":"Jane", "age":"25", "metadata.method":"authordto"}, "", "");
	execute("getWidMaster", {"wid":"mary_jane", "command.convertmethod":"nowid"}, "result_of_get_mary");
		// Place the result of the test in 'my_resultwid.' 
		logverify("lukestest_test1", "my_resultwid", "result_of_get_mary", "", "", {"first":"Mary", "last":"Jane", "age":"25"});

	execute("getWidMaster", {"wid":"authordto", "command.convertmethod":"nowid"}, "result_of_get_author");
		// Add the results of the new test to 'my_resultwid.'
		logverify("lukestest_test2", "my_resultwid", "result_of_get_author", "", "", {"first":"string", "last":"string", "age":"string"});
	
			// Will display if all tests passed in page output area
			verifysummary("my_resultwid");
			// Make sure the local storage is displayed
			displayAllWids();
			$('#divwidsdisplay').show('slow');
}

function luke3() {
	clearLocalStorage();
	// Create an author definition
	execute("AddWidObject", {"wid":"authordto", "first":"string", "last":"string", "age":"string", "metadata.method":"authordto", "bookdto":"onetomany"}, "", "");
	// Create a book definition
	execute("AddWidObject", {"wid":"bookdto", "title":"string", "year":"string"}, "", "");

	// Create an author
	execute("AddWidObject", {"wid":"mary_jane", "first":"Mary", "last":"Jane", "age":"25", "metadata.method":"authordto"}, "", "");
	// Create an actual book
	execute("AddWidObject", {"wid":"Manatuska", "title":"Manatuska Blues", "year":"1992", "metadata.method":"bookdto" });


	// Try to get the authordto
	execute("getWidMaster", {"wid":"authordto", "command.convertmethod":"nowid"}, "result_of_get_author");

		// Add the results of the new test to 'my_resultwid.'
		logverify("lukestest_test2", "my_resultwid", "result_of_get_author", "", "", {"first":"string", "last":"string", "age":"string", "bookdto":"onetomany"});

	// Try to get the book
	execute("getWidMaster", {"wid":"Manatuska", "command.convertmethod":"nowid"}, "result_of_get_book");

		// Add the results of the new test to 'my_resultwid.'
		logverify("lukes_test3", "my_resultwid", "result_of_get_book", "", "", {"title":"Manatuska Blues", "year":"1992"});

	// Create the relationship between the mary_jane and manatuska



	// Try to get the author mary_jane
	execute("getWidMaster", {"wid":"mary_jane", "command.convertmethod":"nowid"}, "result_of_get_mary");

		// Place the result of the test in 'my_resultwid.' 
		logverify("lukestest_test1", "my_resultwid", "result_of_get_mary", "", "", {"first":"Mary", "last":"Jane", "age":"25"});

			// Will display if all tests passed in page output area
			verifysummary("my_resultwid");
			// Make sure the local storage is displayed
			displayAllWids();
			$('#divwidsdisplay').show('slow');
}

function luke4() {
	// Create an author definition
	execute("AddWidObject", {"wid":"adddto", "onreadactions":"string", "last":"string", "age":"string", "metadata.method":"authordto", "actiondto":"onetomany"}, "", "");





}





function lukestest(){
// enter a list into seqList of what keystorkes you want to send to system
// seq and command.action are test realted only
// support actions add, get, verify and ...
	//var sequenceObjList=[];
	//var seqList = ["seq440"];	

	// SEQ440 To test the add wid and verify success
	// Clear the db
	//sequenceObjList.push({"seq":"seq450","command.action":"clear"});
	clearLocalStorage();
	// Create class description of author by creating authordto1
	//sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	execute("AddWidObject", {"wid":"authordto", "first":"string", "last":"string", "age":"string", "metadata.method":"authordto"}, "", "");
	// Create the author with the authordto1
	//sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});
	execute("AddWidObject", {"wid":"mary_jane", "first":"Mary", "last":"Jane", "age":"25", "metadata.method":"authordto"}, "", "");
	// Generate a get call for mary_jane1
	//sequenceObjList.push({"seq":"seq440","command.action":"get","wid":"mary_jane1", "command.dtotype":"authordto"});
	execute("getWidMaster", {"wid":"mary_jane", "command.convertmethod":"nowid"}, "result_of_get");
	// Verify the get call for mary_jane1
	//sequenceObjList.push({"seq":"seq440","command.action":"verify","verifywid":"get_mary_jane1","metadata.method":"author_dto","thisfield":"isextra","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1","LOG":"LOG"});
	logverify("lukestest_test1", "my_resultwid", "result_of_get", "", "", {"first":"Mary", "last":"Jane", "age":"25"});
	//sequenceObjList.push({"seq":"seq440","command.action":"Hello_World"});

	//testSequeceObjList(sequenceObjList, seqList);
}

function Your_function_name_here(){

	var sequenceObjList=[];
	var seqList = ["seq999"];	

	// SEQ999 Test function template
	// Clear the db
	sequenceObjList.push({"seq":"seq999","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq999","command.action":"add","wid":"person","first":"string","last":"string","age":"string","metadata.method":"person"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq999","command.action":"add","wid":"ricky_bobby","first":"ricky","last":"bobby","metadata.method":"person"});
	// Generate a get call for mary_jane1
	sequenceObjList.push({"seq":"seq999","command.action":"get","wid":"ricky_bobby", "command.dtotype":"person"});
	// Refresh the output window of local storage
	sequenceObjList.push({"seq":"seq999","command.action":"displayAllWids"});
	// To call a function simply enter the function name into command.action
	sequenceObjList.push({"seq":"seq999","command.action":"Hello_World"});

	testSequeceObjList(sequenceObjList, seqList);
}

function aaa(){
// enter a list into seqList of what keystorkes you want to send to system
// seq and command.action are test realted only
// support actions add, get, verify and ...
	var sequenceObjList=[];
	var seqList = ["seq440"];	

	// SEQ440 To test the add wid and verify success
	// Clear the db
	sequenceObjList.push({"seq":"seq450","command.action":"clear"});
	// Create class description of author by creating authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1"});
	// Create the author with the authordto1
	sequenceObjList.push({"seq":"seq440","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","metadata.method":"authordto1"});

	for (var i = 1; i< 20000; i++){
		var dummy = {"seq":"seq440","command.action":"add","metadata.method":"authordto1"}
		dummy["wid"] = 'wid' + i;
		sequenceObjList.push(dummy);
	}
 	sequenceObjList.push({"seq":"seq999","command.action":"updateMemory"});

	testSequeceObjList(sequenceObjList, seqList);
}
