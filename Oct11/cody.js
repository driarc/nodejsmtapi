function cody() {
	alert('Cody says hello');
}

function cody1(){
	
	//execute("debugon");
	execute("AddWidObject",{"metadata.method":"actiondto","wid":"actiondto","action":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"palettedto","wid":"palettedto","widname":"string","category":"string","subcategory":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","addfielddefault":"inherit"}, "", "");
	
	
	//gojs object
	execute("AddWidObject",{"metadata.method":"gojsobject","wid":"gojsobject","class":"string","linkFromPortIdProperty":"string","linkToPortIdProperty":"string","nodeDataArray":"onetomany","linkDataArray":"onetomany"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"nodeDataArray","wid":"nodeDataArray", "key":"string", "loc":"string", "leftArray":"onetomany", "topArray":"onetomany", "bottomArray":"onetomany", "rightArray":"onetomany"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"leftArray","wid":"leftArray","class":"string","portColor":"string", "portId":"string"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"topArray","wid":"topArray","class":"string","portColor":"string", "portId":"string"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"bottomArray","wid":"bottomArray","portColor":"string", "portId":"string"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"rightArray","wid":"rightArray","portColor":"string", "portId":"string"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"linkDataArray","wid":"linkDataArray","from":"string", "to":"string", "fromPort":"string", "toPort":"string"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"gojsrel1","wid":"gojsrel1","primarywid":"gojsobject","secondarywid":"nodedataarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"gojsrel2","wid":"gojsrel2","class":"string","primarywid":"gojsobject","secondarywid":"linkdataarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"gojsrel3","wid":"gojsrel3","primarywid":"nodedataarray","secondarywid":"leftarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"gojsrel4","wid":"gojsrel4","primarywid":"nodedataarray","secondarywid":"toparray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"gojsrel5","wid":"gojsrel5","primarywid":"nodedataarray","secondarywid":"bottomarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"gojsrel6","wid":"gojsrel6","primarywid":"nodedataarray","secondarywid":"rightarray","relationshiptype":"attributes","metadata.method":"relationshipdto"}, "", "");
	
	//end gojs object
	
	
	execute("AddWidObject",{"metadata.method":"linkrules","wid":"linkrules","linkclass":"string","min":"string","max":"string"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"adddto","wid":"adddto","actiondto":"onetomany","palettedto":"onetomany","addfield":"onetomany","gojsobject":"onetoone","linkrules":"onetomany"}, "", "");
	
	//create adddto relationships
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_actiondto_adddto","primarywid":"adddto","secondarywid":"actiondto"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_palettedto_adddto","primarywid":"adddto","secondarywid":"palettedto"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_addfield_adddto","primarywid":"adddto","secondarywid":"addfield"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_gojsobject_adddto","primarywid":"adddto","secondarywid":"gojsobject"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_linkrules_adddto","primarywid":"adddto","secondarywid":"linkrules"}, "", "");
	
	
	//create book and author dtos
	//sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"booksdto","title":"string","pages":"string","metadata.method":"booksdto"});
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"reladddtotoauthor","primarywid":"authordto","secondarywid":"adddto"}, "", "");
	
	
	//create a default addfield record
	execute("AddWidObject",{"wid":"addfielddefault","fieldname":"name","display":"true","editable":"true","onreadactions":"none","oneditactions":"pop_up_alert"}, "", "");
	
	//add some authors and books
	execute("AddWidObject",{"metadata.method":"authordto","wid":"startwid","name":"start wid","age":"00","booksdto.title":"none","booksdto.pages":"00"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.title":"Hello World!","booksdto.pages":"40"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"sarah_jones","name":"Sarah Jones","age":"40","booksdto.title":"The Sands of Time","booksdto.pages":"378"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"mike_williams","name":"Mike Williams","age":"36","booksdto.title":"Attack on the Mainframe","booksdto.pages":"600"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"jerry_stone","name":"Jerry Stone","age":"41","booksdto.title":"Carpentry 101","booksdto.pages":"120"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"elizabeth_heart","name":"Elizabeth Heart","age":"50","booksdto.title":"The X Factor","booksdto.pages":"300"}, "", "");
	
	//add system info (adddto info) to those author wids
	execute("AddWidObject",{"metadata.method":"authordto","wid":"startwid","adddto.actiondto.action":"none","adddto.palettedto.0.widname":"joe_jamison","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"joe_jamison","adddto.actiondto.action":"{'color_screen':'blue'}","adddto.palettedto.0.widname":"joe_jamison","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"jessica_jamison","adddto.palettedto.1.category":"human","adddto.palettedto.1.subcategory":"wife","adddto.palettedto.2.widname":"mary_morris","adddto.palettedto.2.category":"human","adddto.palettedto.2.subcategory":"sister","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"sarah_jones","adddto.actiondto.action":"{'color_screen':'red'}","adddto.palettedto.0.widname":"sarah_jones","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"james_jones","adddto.palettedto.1.category":"human","adddto.palettedto.1.subcategory":"husband","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"mike_williams","adddto.actiondto.action":"none","adddto.palettedto.0.widname":"mike_williams","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"mister_scruffy","adddto.palettedto.1.category":"pet","adddto.palettedto.1.subcategory":"dog","adddto.palettedto.2.widname":"misses_fluffy","adddto.palettedto.2.category":"pet","adddto.palettedto.2.subcategory":"cat","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"jerry_stone","adddto.actiondto.action":"none","adddto.palettedto.0.widname":"jerry_stone","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.palettedto.1.widname":"lynne_stone","adddto.palettedto.1.category":"human","adddto.palettedto.1.subcategory":"wife","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"elizabeth_heart","adddto.actiondto.action":"{'play_sound':'trumpet.ogg'}","adddto.palettedto.0.widname":"elizabeth_heart","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");
	//execute("debugon")
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"palettedto"}, "startwid_get_result", "");
	execute("getWidMaster", {"wid":"startwid"}, "startwid_get_result", "");
	logverify("readstartwid","resultwid","startwid_get_result","","",{"metadata.method":"authordto","wid":"startwid","name":"start wid","age":"00","booksdto.0.title":"none","booksdto.0.pages":"00","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.action":"none","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.addfield.0.fieldname":"name","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.display":"true","adddto.0.addfield.0.editable":"true","adddto.0.addfield.0.onreadactions":"none","adddto.0.addfield.0.oneditactions":"pop_up_alert","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20"});

	//execute("debugoff")
	//logverify("cody1_test1", "resultwid", "startwid_get_result", "", "X", "Y");
	verifysummary("resultwid");
 
	//execute("getWidMaster", {"wid":"startwid","command.dtotype":"palettedto"}, "", "");
	//execute("getWidMaster", {"wid":"startwid"}, "", "");
	
	/*
	//get the new record
	sequenceObjList.push({"seq":"seq01","command.action":"debugon"});
	sequenceObjList.push({"seq":"seq01","command.action":"get","metadata.method":"authordto","wid":"startwid"});
	sequenceObjList.push({"seq":"seq01","command.action":"debugoff"});
	*/
}

function cody3(){
	clearLocalStorage();
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultforauthor":"inherit"}, "", "");
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"adddto","wid":"adddto","actiondto":"onetomany","palettedto":"onetomany","addfield":"onetomany"}, "", "");
	execute("AddWidObject",{"metadata.method":"actiondto","wid":"actiondto","action":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"palettedto","wid":"palettedto","widname":"string","category":"string","subcategory":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","addfielddefault":"inherit"}, "", "");
}

function codytest(){
	var sequenceObjList=[];
	var seqList = ["seq01"];

		// SEQ01 -- Create an author and books associated with the author.
	clearLocalStorage();

	execute("AddWidObject",{"wid":"booksdto1","metadata.method":"booksdto1","name":"string","ISBN":"string","publisher":"string"}, "", "");
	
	execute("AddWidObject",{"wid":"authordto1","metadata.method":"authordto1","first":"string","last":"string","age":"string","booksdto1":"onetomany"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_author_book","metadata.method":"relationshipdto","primarywid":"authordto1","secondarywid":"booksdto1"}, "", "");
	
	execute("AddWidObject",{"wid":"mary_sue","metadata.method":"authordto1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc."}, "", "");
	
	execute("AddWidObject",{"wid":"mary_sue","metadata.method":"authordto1","first":"BMary","last":"BSue","age":"B30","booksdto1.name":"BPawn of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc."}, "", "");
	
	execute("AddWidObject",{"wid":"mary_sue","metadata.method":"authordto1","first":"CMary","last":"CSue","age":"C30","booksdto1.name":"CThe Shining","booksdto1.ISBN":"C33003333319","booksdto1.publisher":"CPenguin Books Inc."}, "", "");
	
	execute("getWidMaster", {"wid":"mary_sue"}, "mary_sue_get", "");
	logverify("readmarysue","resultwid","mary_sue_get","","",{"metadata.method":"authordto1","wid":"mary_sue","first":"CMary","last":"CSue","age":"C30","booksdto1.0.name":"ATime and Terror","booksdto1.0.isbn":"A10001111419","booksdto1.0.publisher":"AMega Books Inc.","booksdto1.0.metadata.method":"booksdto1","booksdto1.0.wid":"1","booksdto1.1.name":"BPawn of Prophecy","booksdto1.1.isbn":"B33003222219","booksdto1.1.publisher":"BTor Books Inc.","booksdto1.1.metadata.method":"booksdto1","booksdto1.1.wid":"3","booksdto1.2.name":"CThe Shining","booksdto1.2.isbn":"C33003333319","booksdto1.2.publisher":"CPenguin Books Inc.","booksdto1.2.metadata.method":"booksdto1","booksdto1.2.wid":"5"});														

	verifysummary("resultwid");
	//testSequeceObjList(sequenceObjList, seqList);
}



function codytest3(){

	clearLocalStorage();
	execute("AddWidObject",{"wid":"authordto","metadata.method":"authordto","name":"string","age":"string","bookdto":"onetomany","bookdto1.title":"string","bookdto1.publisher":"string"}, "", "");
	//execute("AddWidObject",{"wid":"rel_author_book","metadata.method":"relationshipdto","primarywid":"authordto","secondarywid":"bookdto"}, "", "");
	
	execute("AddWidObject",{"wid":"mary_sue","metadata.method":"authordto","name":"Mary Sue","age":"34","bookdto.title":"Into the Blue","bookdto.publisher":"Mega Books LLC."}, "", "");
	
	execute("AddWidObject",{"wid":"mary_sue","metadata.method":"authordto","name":"Mary Sue","age":"34","bookdto.title":"Attack on Pearl Harbor","bookdto.publisher":"History Pub."}, "", "");
	
	execute("AddWidObject",{"wid":"mary_sue","metadata.method":"authordto","name":"Mary Sue","age":"34","bookdto.title":"Tower of Fright","bookdto.publisher":"Chills Inc."}, "", "");
	
	execute("getWidMaster", {"wid":"mary_sue"}, "mary_sue_get", "");
	logverify("readmarysue","resultwid","mary_sue_get","","",{"metadata.method":"authordto1","wid":"mary_sue","first":"CMary","last":"CSue","age":"C30","booksdto1.0.name":"ATime and Terror","booksdto1.0.isbn":"A10001111419","booksdto1.0.publisher":"AMega Books Inc.","booksdto1.0.metadata.method":"booksdto1","booksdto1.0.wid":"1","booksdto1.1.name":"BPawn of Prophecy","booksdto1.1.isbn":"B33003222219","booksdto1.1.publisher":"BTor Books Inc.","booksdto1.1.metadata.method":"booksdto1","booksdto1.1.wid":"3","booksdto1.2.name":"CThe Shining","booksdto1.2.isbn":"C33003333319","booksdto1.2.publisher":"CPenguin Books Inc.","booksdto1.2.metadata.method":"booksdto1","booksdto1.2.wid":"5"});														
	verifysummary("resultwid");
	//*****************
}

function codytest4(){
	//***************** SIMPLE ADD A PRIMARY WID AND THREE SECONDARY (ONE TO ONE) RELATED WIDS
	clearLocalStorage();
	//creates a new dto for a person and their driver's license. people have a "one-to-one" relationship with their license
	execute("AddWidObject",{"wid":"licensedto","metadata.method":"licensedto","Id":"string","state":"string"}, "", "");
	
	execute("AddWidObject",{"wid":"persondto","metadata.method":"persondto","name":"string","age":"string","gender":"string","licensedto":"onetoone"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_person_license","metadata.method":"relationshipdto","primarywid":"persondto","secondarywid":"licensedto"}, "", "");
	
	//adds three different driver's license for the person "John Everest" (note: each add should overwrite the previous as this is "one to one")
	execute("AddWidObject",{"wid":"john_everest","metadata.method":"persondto","name":"John Everest","age":"42","gender":"male","licensedto.Id":"27837584029","licensedto.state":"MI"}, "", "");
	
	execute("AddWidObject",{"wid":"john_everest","metadata.method":"persondto","name":"John Everest","age":"42","gender":"male","licensedto.Id":"45863930293","licensedto.state":"TX"}, "", "");
	
	execute("AddWidObject",{"wid":"john_everest","metadata.method":"persondto","name":"John Everest","age":"42","gender":"male","licensedto.Id":"10294483051","licensedto.state":"AZ"}, "", "");
	
	execute("getWidMaster", {"wid":"john_everest"}, "john_everest_get", "");
	logverify("readjohneverest","resultwid","john_everest_get","","",{"metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"42","gender":"male","licensedto.0.id":"10294483051","licensedto.0.state":"AZ","licensedto.0.metadata.method":"licensedto","licensedto.0.wid":"1"});														
	verifysummary("resultwid");
}


function codytest5(){
	clearLocalStorage();
	//creates a new dto for a person and their driver's license. people have a "one-to-one" relationship with their license
	execute("AddWidObject",{"wid":"licensedto","metadata.method":"licensedto","Id":"string","state":"string"}, "", "");
	
	execute("AddWidObject",{"wid":"persondto","metadata.method":"persondto","name":"string","age":"string","gender":"string","licensedto":"onetoone"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_person_license","metadata.method":"relationshipdto","primarywid":"persondto","secondarywid":"licensedto"}, "", "");
	
	//adds three different driver's license for the person "John Everest" (note: each add should overwrite the previous as this is "one to one")
	execute("AddWidObject",{"wid":"john_everest","metadata.method":"persondto","name":"John Everest","age":"42","gender":"male","licensedto.Id":"27837584029","licensedto.state":"MI"}, "", "");
	
	execute("AddWidObject",{"wid":"john_everest","metadata.method":"persondto","name":"John Everest","age":"42","gender":"male","licensedto.Id":"45863930293","licensedto.state":"TX"}, "", "");
	
	execute("AddWidObject",{"wid":"john_everest","metadata.method":"persondto","name":"John Everest","age":"42","gender":"male","licensedto.Id":"10294483051","licensedto.state":"AZ"}, "", "");
	
	execute("getWidMaster", {"wid":"john_everest"}, "john_everest_get", "");
	logverify("readjohneverest","resultwid","john_everest_get","","",{"metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"42","gender":"male","licensedto.0.id":"10294483051","licensedto.0.state":"AZ","licensedto.0.metadata.method":"licensedto","licensedto.0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest6(){
	// failed, children are not updated and mixed children are added to the parent
	//***************** ADDS A PRIMARY WID WITH TWO SECONDARY WIDS AND THEN UPDATES THOSE TWO SECONDARY WIDS
	clearLocalStorage();
	//creates a new dto for a company and its workers. companies have a "one-to-many" relationship with workers.
	execute("AddWidObject",{"wid":"workersdto","metadata.method":"workersdto","name":"string","position":"string"}, "", "");
	
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","address":"string","city":"string","state":"string","workersdto":"onetomany"}, "", "");
	
	//adds a company called with two workers and then updates these two workers
	//adding the two workers
	execute("AddWidObject",{"wid":"us_power","metadata.method":"companydto","name":"Us Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.name":"John Cole","workersdto.position":"electrician"}, "", "");
	
	execute("AddWidObject",{"wid":"us_power","metadata.method":"companydto","name":"Us Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.name":"Susan Grant","workersdto.position":"accountant"}, "", "");
	
	//updates "John Cole" to a new position of "Master Electrician"
	execute("AddWidObject",{"wid":"us_power","metadata.method":"companydto","name":"Us Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.0.name":"John Cole","workersdto.position":"Master Electrician"}, "", "");
	
	//updates "Susan Grant" to have a new name "Susan Willows" and a new positions as "auditor"
	execute("AddWidObject",{"wid":"us_power","metadata.method":"companydto","name":"Us Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.1.name":"Susan Cole","workersdto.1.position":"Auditor"}, "", "");
	
	//gets the "US Power Co." wid to show us the updated wids
	execute("getWidMaster", {"wid":"us_power"}, "us_power_get", "");
	logverify("readuspower","resultwid","us_power_get","","",{"metadata.method":"companydto","wid":"us_power","name":"Us Power Co.","address":"175 W. Thorsen St.","city":"Las Vegas","state":"NV","workersdto.0.name":"John Cole","workersdto.0.metadata.method":"workersdto","workersdto.0.wid":"1","workersdto.0.position":"Master Electrician","workersdto.1.name":"Susan Cole","workersdto.1.position":"Auditor","workersdto.1.metadata.method":"workersdto","workersdto.1.wid":"3"});														
	verifysummary("resultwid");
	//*****************
}

function codytest7(){
	//**** NOTE: Does not look like it's functioning correctly
	
	//***************** ADD A COMPLEX DTO, CREATE A WID WITH THAT DTO, AND THEN SEE THE WID (GET)
	clearLocalStorage();
	//creates a new dto for a school. The school is has a onetomany with departmentsdto. departmentsdto has a onetomany with classesdto. classesdto has a onetoone with teacherdto.
	//this model represents a school with many departments, each department having many classes, and each class having one teacher.
	//sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"teacherdto","wid":"teacherdto","name":"string","age":"string"});
	execute("AddWidObject",{"wid":"teacherdto","metadata.method":"teacherdto","name":"string","age":"string"}, "", "");
	
	//sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"classesdto","wid":"classesdto","name":"string","section":"string","teacherdto":"onetoone","teacherdto.name":"string","teacherdto.age":"string"});
	execute("AddWidObject",{"wid":"classesdto","metadata.method":"classesdto","name":"string","section":"string","teacherdto":"onetomany"}, "", "");
	
	//sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"departmentsdto","wid":"departmentsdto","name":"string","supervisor":"string","classesdto":"onetomany","classesdto.name":"string","classesdto.section":"string","classesdto.teacherdto":"onetoone","classesdto.teacherdto.name":"string","classesdto.teacherdto.age":"string"});
	execute("AddWidObject",{"wid":"departmentsdto","metadata.method":"departmentsdto","name":"string","supervisor":"string","classesdto":"onetomany"}, "", "");
	
	execute("AddWidObject",{"wid":"schooldto","metadata.method":"schooldto","name":"string","address":"string","departmentsdto":"onetomany"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_teachers_classes","metadata.method":"relationshipdto","primarywid":"classesdto","secondarywid":"teacherdto"}, "", "");
	execute("AddWidObject",{"Wid":"rel_classes_departments","metadata.method":"relationshipdto","primarywid":"departmentsdto","secondarywid":"classesdto"}, "", "");
	execute("AddWidObject",{"Wid":"rel_departments_school","metadata.method":"relationshipdto","primarywid":"schooldto","secondarywid":"departmentsdto"}, "", "");
	
	//sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"schooldto","wid":"schooldto","name":"string","address":"string","departmentsdto":"onetomany","departmentsdto.name":"string","departmentsdto.supervisor":"string","departmentsdto.classesdto":"onetomany","departmentsdto.classesdto.name":"string","departmentsdto.classesdto.section":"string","departmentsdto.classesdto.teacherdto":"onetoone","departmentsdto.classesdto.teacherdto.name":"string","departmentsdto.classesdto.teacherdto.age":"string"});
	
	//now let's add a school called MSU with a departments called Computer Science. This departments will have a class called Programming Logic & Design, and this class will be taught by Richard Smith.
	
	
	//sequenceObjList.push({"seq":"seq03","command.action":"add","metadata.method":"schooldto","wid":"msu_richard_smith","name":"MSU","address":"East Lansing","departmentsdto.name":"Computer Science","departmentsdto.supervisor":"The Todd","departmentsdto.classesdto.name":"Programming Logic & Design","departmentsdto.classesdto.section":"5303","departmentsdto.classesdto.teacherdto.name":"Richard Smith","departmentsdto.classesdto.teacherdto.age":"40"});
	execute("AddWidObject",{"wid":"msu_richard_smith","metadata.method":"schooldto","name":"MSU","address":"East Lansing","departmentsdto.name":"Computer Science","departmentsdto.supervisor":"The Todd","departmentsdto.classesdto.name":"Programming Logic & Design","departmentsdto.classesdto.section":"5303","departmentsdto.classesdto.teacherdto.name":"Richard Smith","departmentsdto.classesdto.teacherdto.age":"40"}, "", "");
	
	execute("getWidMaster", {"wid":"msu_richard_smith"}, "msu_richard_smith_get", "");
	logverify("readmsurichardsmith","resultwid","msu_richard_smith_get","","",{"metadata.method":"schooldto","wid":"msu_richard_smith","name":"MSU","address":"East Lansing","departmentsdto.0.name":"Computer Science","departmentsdto.0.supervisor":"The Todd","departmentsdto.0.metadata.method":"departmentsdto","departmentsdto.0.wid":"1","departmentsdto.0.classesdto.0.name":"Programming Logic & Design","departmentsdto.0.classesdto.0.section":"5303","departmentsdto.0.classesdto.0.metadata.method":"classesdto","departmentsdto.0.classesdto.0.wid":"2","departmentsdto.0.classesdto.0.teacherdto.0.name":"Richard Smith","departmentsdto.0.classesdto.0.teacherdto.0.age":"40","departmentsdto.0.classesdto.0.teacherdto.0.metadata.method":"teacherdto","departmentsdto.0.classesdto.0.teacherdto.0.wid":"3"});														
	verifysummary("resultwid");
	//*****************
}

function codytest8(){
	
	//***************** SIMPLE ADD A PRIMARY WID AND TWO SECONDARY (ONE TO MANY) WIDS
	clearLocalStorage();
	execute("AddWidObject",{"wid":"resworkersdto1","metadata.method":"resworkersdto1","name":"string","position":"string"}, "", "");
	execute("AddWidObject",{"wid":"restaurantdto1","metadata.method":"restaurantdto1","name":"string","address":"string","resworkersdto1":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_restaur_workers","metadata.method":"relationshipdto","primarywid":"restaurantdto1","secondarywid":"resworkersdto1"}, "", "");
	execute("AddWidObject",{"wid":"apple_bees1","metadata.method":"restaurantdto1","name":"Apple Bees","address":"TC","resworkersdto1.name":"John Carney","resworkersdto1.position":"cook"}, "", "");
	execute("AddWidObject",{"wid":"apple_bees1","metadata.method":"restaurantdto1","name":"Apple Bees","address":"TC","resworkersdto1.name":"Hailey Thompson","resworkersdto1.position":"waitress"}, "", "");
	execute("getWidMaster", {"wid":"apple_bees1"}, "apple_bees1_get", "");
	logverify("readapplebees1","resultwid","apple_bees1_get","","",{"metadata.method":"restaurantdto1","wid":"apple_bees1","name":"Apple Bees","address":"TC","resworkersdto1.0.name":"John Carney","resworkersdto1.0.position":"cook","resworkersdto1.0.metadata.method":"resworkersdto1","resworkersdto1.0.wid":"1","resworkersdto1.1.name":"Hailey Thompson","resworkersdto1.1.position":"waitress","resworkersdto1.1.metadata.method":"resworkersdto1","resworkersdto1.1.wid":"3"});														
	verifysummary("resultwid");
}

function codytest9(){
	
	//***************** SIMPLE ADD A PRIMARY WID AND TWO SECONDARY (ONE TO MANY) WIDS
	clearLocalStorage();
	execute("AddWidObject",{"wid":"resworkersdto1","metadata.method":"resworkersdto1","name":"string","position":"string"}, "", "");
	execute("AddWidObject",{"wid":"restaurantdto1","metadata.method":"restaurantdto1","name":"string","address":"string","resworkersdto1":"onetoone"}, "", "");
	execute("AddWidObject",{"wid":"rel_restaur_workers","metadata.method":"relationshipdto","primarywid":"restaurantdto1","secondarywid":"resworkersdto1"}, "", "");
	execute("AddWidObject",{"wid":"apple_bees1","metadata.method":"restaurantdto1","name":"Apple Bees","address":"TC","resworkersdto1.name":"John Carney","resworkersdto1.position":"owner"}, "", "");
	execute("AddWidObject",{"wid":"apple_bees1","metadata.method":"restaurantdto1","name":"Apple Bees","address":"TC","resworkersdto1.name":"Hailey Thompson","resworkersdto1.position":"owner"}, "", "");
	execute("getWidMaster", {"wid":"apple_bees1"}, "apple_bees1_get", "");
	logverify("readapplebees1","resultwid","apple_bees1_get","","",{"metadata.method":"restaurantdto1","wid":"apple_bees1","name":"Apple Bees","address":"TC","resworkersdto1.0.name":"John Carney","resworkersdto1.0.position":"cook","resworkersdto1.0.metadata.method":"resworkersdto1","resworkersdto1.0.wid":"1","resworkersdto1.1.name":"Hailey Thompson","resworkersdto1.1.position":"waitress","resworkersdto1.1.metadata.method":"resworkersdto1","resworkersdto1.1.wid":"3"});														
	verifysummary("resultwid");
}
	
function codytest11(){
	//************* NOT SURE IF THIS IS STILL VALID
	
	//************* SIMPLE TEST CONVERTMETHOD = WID
	clearLocalStorage();
	// add a notebook dto with a "one to many" relationship with notes. A notebook has an owner and a number of pages. A note has a page number and a comment.
	//sequenceObjList.push({"seq":"seq07","command.action":"add","metadata.method":"notebookdto","wid":"notebookdto","owner":"string","pages":"number","pagedto":"onetomany","pagedto.pagenumber":"number","pagedto.notes":"string"});
	execute("AddWidObject",{"wid":"pagedto","metadata.method":"pagedto","pagenumber":"number","notes":"string"}, "", "");
	execute("AddWidObject",{"wid":"notebookdto","metadata.method":"notebookdto","owner":"string","pages":"number","pagedto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_pages_notebook","metadata.method":"relationshipdto","primarywid":"notebookdto","secondarywid":"pagedto"}, "", "");
	// add a note to a notebook owned by Cody Priest
	//sequenceObjList.push({"seq":"seq07","command.action":"add","metadata.method":"notebookdto","wid":"notebook1","owner":"Cody Priest","pages":"200","pagedto.pagenumber":"30","pagedto.notes":"the unexamined life is not worth living"});
	execute("AddWidObject",{"wid":"notebook1","metadata.method":"notebookdto","owner":"Cody Priest","pages":"200","pagedto.pagenumber":"30","pagedto.notes":"the unexamined life is not worth living"}, "", "");
	// get the newly added notebook and note with convertmethod = wid
	execute("GetWidMaster",{"wid":"notebook1","command.convertmethod":"wid"}, "", "");
	//execute("getWidMaster", {"wid":"john_everest"}, "john_everest_get", "");
	//logverify("readjohneverest","resultwid","john_everest_get","","",{"metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"42","gender":"male","licensedto.0.id":"10294483051","licensedto.0.state":"AZ","licensedto.0.metadata.method":"licensedto","licensedto.0.wid":"1"});														
	//verifysummary("resultwid");
}

function codytest12(){
	//************* NOT SURE IF THIS IS STILL VALID

	//************* SIMPLE TEST CONVERTMETHOD = JSON
	clearLocalStorage();
	// add a textbook dto with a "one to many" relationship with chapters. A textbook has an author and a title. A chapter has a title and a page number.
	exeucte("AddWidObject",{"wid":"chapterdto","metadata.method":"chapterdto","title":"string","pagenumber":"number"}, "", "");
	execute("AddWidObject",{"wid":"textbookdto","metadata.method":"textbookdto","author":"string","title":"string","chapterdto":"onetomany"}, "", "");
	exeucte("AddWidObject",{"wid":"rel_chapt_text","metadata.method":"relationshipdto","primarywid":"textbookdto","secondarywid":"chapterdto"}, "", "");
	// add a note to a notebook owned8by Cody Priest
	execute("AddWidObject",{"wid":"microtext1","metadata.method":"textbookdto","author":"Jeffrey Perkins","title":"Microbiology","chapterdto.title":"Viruses","chapterdto.pagenumber":"120"}, "", "");
	// get the newly added notebook and note with convertmethod = wid
	//sequenceObjList.push({"seq":"seq08","command.action":"get","wid":"microtext1","command.convertmethod":"json"});
	execute("GetWidMaster",{"wid":"microtext1","command.convertmethod":"json"}, "", "");
	//execute("getWidMaster", {"wid":"john_everest"}, "john_everest_get", "");
	//logverify("readjohneverest","resultwid","john_everest_get","","",{"metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"42","gender":"male","licensedto.0.id":"10294483051","licensedto.0.state":"AZ","licensedto.0.metadata.method":"licensedto","licensedto.0.wid":"1"});														
	//verifysummary("resultwid");
}

function codytest13(){
	//************* NOT SURE IF THIS IS STILL VALID

	//************* SIMPLE TEST CHECKFLAG = DTO
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	//execute("getWidMaster", {"wid":"john_everest"}, "john_everest_get", "");
	//logverify("readjohneverest","resultwid","john_everest_get","","",{"metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"42","gender":"male","licensedto.0.id":"10294483051","licensedto.0.state":"AZ","licensedto.0.metadata.method":"licensedto","licensedto.0.wid":"1"});														
	//verifysummary("resultwid");
}

function codytest14(){
	//************* NOT SURE IF THIS IS STILL VALID

	//************* SIMPLE TEST CHECKFLAG = JSON
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Fruit Loops
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"json","wid":"kellog_fl","name":"{'string':'Kellogs'}","city":"{'string':'NY'}","productdto3.name":"{'string':'Fruit Loops'}","productdto3.calories":"{'number':'100'}"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	//execute("getWidMaster", {"wid":"john_everest"}, "john_everest_get", "");
	//logverify("readjohneverest","resultwid","john_everest_get","","",{"metadata.method":"persondto","wid":"john_everest","name":"John Everest","age":"42","gender":"male","licensedto.0.id":"10294483051","licensedto.0.state":"AZ","licensedto.0.metadata.method":"licensedto","licensedto.0.wid":"1"});														
	//verifysummary("resultwid");
}

function codytest15(){
	//************* LARGE POOL OF DATA FOR QUERYING
	clearLocalStorage();
	execute("AddWidObject",{"wid":"bookdto","metadata.method":"bookdto","title":"string","publisher":"string"}, "", "");
	execute("AddWidObject",{"wid":"spousedto","metadata.method":"spousedto","name":"string","age":"string"}, "", "");
	execute("AddWidObject",{"wid":"authordto","metadata.method":"authordto","name":"string","age":"string","bookdto":"onetomany","spousedto":"onetoone"}, "", "");
	execute("AddWidObject",{"wid":"rel_book_author","metadata.method":"relationshipdto","primarywid":"authordto","secondarywid":"bookdto"}, "", "");
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"relationshipdto","primarywid":"authordto","secondarywid":"spousedto"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"joe_parks","name":"Joe Parks","age":"34","bookdto.title":"The Great One","bookdto.publisher":"Mega Books LLC.","spousedto.name":"Kelly Parks","spousedto.age":"30"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"joe_parks","name":"Joe Parks","age":"34","bookdto.title":"Our Darkest Hour","bookdto.publisher":"Mega Books LLC."}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto.title":"Pearl Harbor","bookdto.publisher":"History Pub"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto.title":"World War I: Close-Up","bookdto.publisher":"History Pub"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto.title":"World War II: Hitler's Defeat","bookdto.publisher":"History Pub"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto.title":"Hotel Horror","bookdto.publisher":"Chills Inc."}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto.title":"Freaky Friday","bookdto.publisher":"Spooks R Us"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto.title":"Ghost in the Prism","bookdto.publisher":"Chills Inc."}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"stephen_queen","name":"Stephen Queen","age":"58","bookdto.title":"Mind Blender","bookdto.publisher":"Spooks R Us"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"grace_williams","name":"Grace Williams","age":"24","bookdto.title":"The Final Fantasy","bookdto.publisher":"Mega Books LLC","spousedto.name":"Ted Williams","spousedto.age":"28"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_spouse_author","metadata.method":"authordto","wid":"grace_williams","name":"Grace Williams","age":"24","bookdto.title":"The Knife at Her Throat","bookdto.publisher":"Del Ray"}, "", "");
	
	execute("getWidMaster", {"wid":"joe_parks"}, "joe_parks_get", "");
	logverify("readjoeparks","resultwid","joe_parks_get","","",{"metadata.method":"authordto","wid":"joe_parks","name":"Joe Parks","age":"34","bookdto.0.title":"The Great One","bookdto.0.publisher":"Mega Books LLC.","bookdto.0.metadata.method":"bookdto","bookdto.0.wid":"1","bookdto.1.title":"Our Darkest Hour","bookdto.1.publisher":"Mega Books LLC.","bookdto.1.metadata.method":"bookdto","bookdto.1.wid":"5","spousedto.0.name":"Kelly Parks","spousedto.0.age":"30","spousedto.0.metadata.method":"spousedto","spousedto.0.wid":"3"});														
	verifysummary("resultwid");
}

function codytest16(){
	// try to trick "one to one" relationships by creating two children with dot notation
	execute("AddWidObject",{"wid":"ownerdto","metadata.method":"ownerdto","name":"string","age":"string"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","ownerdto":"onetoone"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_owner","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"ownerdto"}, "", "");
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","name":"Kellogs","city":"NY","ownerdto.0.name":"John Smith","ownerdto.0.age":"60"}, "", "");
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","wid":"kellog","name":"Kellogs","city":"NY","ownerdto.1.name":"Carry Hale","ownerdto.1.age":"55"}, "", "");
	execute("getWidMaster", {"wid":"kellog_ff"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"NY","ownerdto.0.name":"John Smith","ownerdto.0.age":"60","ownerdto.0.metadata.method":"ownerdto","ownerdto.0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest17(){
	execute("AddWidObject",{"wid":"bookdto","metadata.method":"bookdto","title":"string","publisher":"string"}, "", "");
	execute("AddWidObject",{"wid":"authordto","metadata.method":"authordto","name":"string","age":"string","bookdto":"onetomany"}, "", "");
	//execute("AddWidObject",{"wid":"secretdto","metadata.method":"secretdto","creator":"string","create_date":"string","authordto":"onetoone"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_book_author","metadata.method":"relationshipdto","primarywid":"authordto","secondarywid":"bookdto"}, "", "");
	execute("AddWidObject",{"wid":"rel_author_secret","metadata.method":"relationshipdto","primarywid":"authordto","secondarywid":"secretdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto.title":"World War I: Close-Up","bookdto.publisher":"History Pub"}, "", "");
	execute("AddWidObject",{"command.dtotype":"secretdto","wid":"susan_thorough","creator":"DRI","create_date":"10/11/2013"}, "", "");
	execute("GetWidMaster",{"wid":"susan_thorough","command.dtotype":"authordto"}, "authortest", "");
	execute("GetWidMaster",{"wid":"susan_thorough","command.dtotype":"secretdto"}, "secrettest", "");
	logverify("readauthortest","resultwid","authortest","","",{"metadata.method":"authordto","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto.0.title":"World War I: Close-Up","bookdto.0.publisher":"History Pub","bookdto.0.metadata.method":"bookdto","bookdto.0.wid":"1","bookdto.1.title":"World War I: Close-Up","bookdto.1.publisher":"History Pub","bookdto.1.metadata.method":"bookdto","bookdto.1.wid":"3"});														
	logverify("readsecrettest","resultwid","secrettest","","",{"metadata.method":"secretdto","wid":"susan_thorough","creator":"DRI","create_date":"10/11/2013"});														
	verifysummary("resultwid");
}

function codytest18(){
	execute("AddWidObject",{"wid":"bookdto","metadata.method":"bookdto","title":"string","publisher":"string"}, "", "");
	execute("AddWidObject",{"wid":"authordto","metadata.method":"authordto","name":"string","age":"string","bookdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"secretdto","metadata.method":"secretdto","creator":"string","create_date":"string","authordto":"onetoone"}, "", "");
	
	execute("AddWidObject",{"wid":"rel_book_author","metadata.method":"relationshipdto","primarywid":"authordto","secondarywid":"bookdto"}, "", "");
	execute("AddWidObject",{"wid":"rel_author_secret","metadata.method":"relationshipdto","primarywid":"secretdto","secondarywid":"authordto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto.title":"World War I: Close-Up","bookdto.publisher":"History Pub"}, "", "");
	execute("GetWidMaster",{"wid":"susan_thorough","command.dtotype":"authordto"}, "authortest", "");
	execute("GetWidMaster",{"wid":"susan_thorough","command.dtotype":"secretdto"}, "secrettest", "");
	logverify("readauthortest","resultwid","authortest","","",{"metadata.method":"authordto","wid":"susan_thorough","name":"Susan Thorough","age":"43","bookdto.0.title":"World War I: Close-Up","bookdto.0.publisher":"History Pub","bookdto.0.metadata.method":"bookdto","bookdto.0.wid":"1","bookdto.1.title":"World War I: Close-Up","bookdto.1.publisher":"History Pub","bookdto.1.metadata.method":"bookdto","bookdto.1.wid":"3"});														
	logverify("readsecrettest","resultwid","secrettest","","",{"metadata.method":"secretdto","wid":"susan_thorough","creator":"DRI","create_date":"10/11/2013"});														
	verifysummary("resultwid");
}

function codytest19(){
//var dtoobjectDOT = {'departmentsdto':'attribute','\college':'string','\address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'}
//var input = {'\college':'NMC','\address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}
	execute("AddWidObject",{"wid":"departmentsdto","metadata.method":"departmentsdto","name":"string","supervisor":"string"}, "", "");
	execute("AddWidObject",{"wid":"collegedto","metadata.method":"collegedto","\name":"string","\address":"string","departmentsdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_college_depart","metadata.method":"relationshipdto","primarywid":"collegedto","secondarywid":"departmentsdto"}, "", "");
	
	execute("AddWidObject",{"wid":"FSU","metadata.method":"collegedto","\name":"FSU","\address":"Big Rapids, MI","departmentsdto.name":"Programming","departmentsdto.supervisor":"Todd"}, "", "");
	execute("GetWidMaster",{"wid":"FSU"}, "FSUget", "");
	logverify("readFSUget","resultwid","FSUget","","",{"metadata.method":"collegedto","wid":"fsu","\name":"FSU","address":"Big Rapids, MI","departmentsdto.0.name":"Programming","departmentsdto.0.supervisor":"Todd","departmentsdto.0.metadata.method":"departmentsdto","departmentsdto.0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest20(){
	//************* SIMPLE TEST CONVERTMETHOD = DTONUM
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dtonum"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","productdto.0.name":"Frosted Flakes","productdto.0.calories":"120","productdto.0.metadata.method":"productdto","productdto.0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest21(){
	//************* SIMPLE TEST CONVERTMETHOD = DTO
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest22(){
	//var dtoobjectDOT = {'departmentsdto':'attribute','"name':'string','"address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'}
	//var input = {'"name':'NMC','"address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"departmentsdto","metadata.method":"departmentsdto","name":"string","supervisor":"string"}, "", "");
	execute('AddWidObject',{'wid':'collegedto','metadata.method':'collegedto','"name':'string','"address':'string','departmentsdto':'onetomany'}, '', '');
	execute('AddWidObject',{'wid':'rel_college_depart','metadata.method':'relationshipdto','primarywid':'collegedto','secondarywid':'departmentsdto'}, '', '');
	
	execute('AddWidObject',{'wid':'FSU','metadata.method':'collegedto','"name':'FSU','"address':'Big Rapids, MI','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}, '', '');
	execute('GetWidMaster',{'wid':'FSU'}, 'FSUget', '');
	logverify('readFSUget','resultwid','FSUget','','',{'metadata.method':'collegedto','wid':'fsu','"name':'FSU','"address':'Big Rapids, MI','departmentsdto.0.name':'Programming','departmentsdto.0.supervisor':'Todd','departmentsdto.0.metadata.method':'departmentsdto','departmentsdto.0.wid':'1'});														
	verifysummary('resultwid');
}

function codytest23(){
	//var dtoobjectDOT = {'departmentsdto':'attribute','?name':'string','?address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'}
	//var input = {'?name':'NMC','?address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"departmentsdto","metadata.method":"departmentsdto","name":"string","supervisor":"string"}, "", "");
	execute('AddWidObject',{'wid':'collegedto','metadata.method':'collegedto','?name':'string','?address':'string','departmentsdto':'onetomany'}, '', '');
	execute('AddWidObject',{'wid':'rel_college_depart','metadata.method':'relationshipdto','primarywid':'collegedto','secondarywid':'departmentsdto'}, '', '');
	
	execute('AddWidObject',{'wid':'FSU','metadata.method':'collegedto','?name':'FSU','?address':'Big Rapids, MI','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'}, '', '');
	execute('GetWidMaster',{'wid':'FSU'}, 'FSUget', '');
	logverify('readFSUget','resultwid','FSUget','','',{'metadata.method':'collegedto','wid':'fsu','?name':'FSU','?address':'Big Rapids, MI','departmentsdto.0.name':'Programming','departmentsdto.0.supervisor':'Todd','departmentsdto.0.metadata.method':'departmentsdto','departmentsdto.0.wid':'1'});														
	verifysummary('resultwid');
}

function codytest24(){
	//var dtoobjectDOT = {'departmentsdto':'attribute','name':'string','address':'string','departmentsdto.name':'string','departmentsdto.supervisor':'string'};
	//var input = {'departmentsdto':'attribute','name':'NMC','address':'115 Nowhere St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Todd'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"departmentsdto","metadata.method":"departmentsdto","name":"string","supervisor":"string"}, "", "");
	execute('AddWidObject',{'wid':'collegedto','metadata.method':'collegedto','name':'string','"address':'string','departmentsdto':'onetomany'}, '', '');
	execute('AddWidObject',{'wid':'rel_college_depart','metadata.method':'relationshipdto','primarywid':'collegedto','secondarywid':'departmentsdto'}, '', '');
	
	execute('AddWidObject',{'wid':'NMC','metadata.method':'collegedto','"name':'NMC','"address':'115 E. Nowhere St.','departmentsdto.name':'Math','departmentsdto.supervisor':'Bruce Lee'}, '', '');
	execute('GetWidMaster',{'wid':'NMC'}, 'NMCget', '');
	logverify('readNMCget','resultwid','NMCget','','',{'metadata.method':'collegedto','wid':'NMC','name':'NMC','address':'115 E. Nowhere St.','departmentsdto.0.name':'Math','departmentsdto.0.supervisor':'Bruce Lee','departmentsdto.0.metadata.method':'departmentsdto','departmentsdto.0.wid':'1'});														
	verifysummary('resultwid');
}

function codytest25(){
	//var dtoobjectDOT = {'name':'string','address':'string','schooldto':'attribute','schooldto.name':'string','schooldto.address':'string','schooldto.schooldto':'attribute','schooldto.schooldto.name':'string','schooldto.schooldto.address':'string'};
	//var input = {'name':'NMC','address':'1000 W Front St.','schooldto.name':'NMC','schooldto.address':'1000 W Front St.','schooldto.schooldto.name':'NMC','schooldto.schooldto.address':'1000 W Front St.'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"schooldto","metadata.method":"productdto","name":"string","address":"string"}, "", "");
	
	execute("AddWidObject",{"wid":"nmc","metadata.method":"schhooldto",{'name':'NMC','address':'1000 W Front St.','schooldto.name':'NMC','schooldto.address':'1000 W Front St.','schooldto.schooldto.name':'NMC','schooldto.schooldto.address':'1000 W Front St.'}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest26(){
	//var dtoobjectDOT = {'name':'string','address':'string','schooldto':'attribute','schooldto.name':'string','schooldto.address':'string','schooldto.schooldto':'attribute','schooldto.schooldto.name':'string','schooldto.schooldto.address':'string'};
	//var input = {'name':'NMC','address':'1000 W Front St.','schooldto.name':'NMC','schooldto.address':'1000 W Front St.','schooldto.schooldto.name':'NMC','schooldto.schooldto.address':'1000 W Front St.'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest27(){
	//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string','departmentsdto.classesdto':'attribute','departmentsdto.classesdto.name':'string','departmentsdto.classesdto.size':'string'};
	//var input = {'name':'NMC','address':'1000 W Front St.','departmentsdto.classesdto.name':'Programming 101','departmentsdto.classesdto.size':'30'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest28(){
	//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string'};
	//var input = {};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest29(){
	//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string'};
	//var input = {'address':'1000 W Front St.','departmentsdto.name':'Programming','departmentsdto.supervisor':'Keith Kelly','departmentsdto.totalstaff':'30'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest30(){
	//var dtoobjectDOT = {'name':'string','address':'string','departmentsdto':'attribute','departmentsdto.name':'string','departmentsdto.supervisor':'string','departmentsdto.totalstaff':'string'};
	//var input = {'name':'NMC','address':'1000 W Front St.','phone':'231-995-1000','size':'small','departmentsdto.name':'Programming','departmentsdto.supervisor':'Keith Kelly','departmentsdto.totalstaff':'30','departmentsdto.size':'medium'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest31(){
	//var dtoobjectDOT = {'one':'string','bdto':'attribute','bdto.two':'string','cdto':'attribute','cdto.three':'string','ddto':'attribute','ddto.four':'string','edto':'attribute','edto.five':'string'};
	//var input = {'one':'first wid','bdto.two':'second wid','cdto.three':'third wid','ddto.four':'fourth wid','edto.five':'fifth wid'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest32(){
	//var dtoobjectDOT = {'name':'string','type':'string','categorydto':'attribute','categorydto.category':'string','categorydto.productsdto':'attribute','categorydto.productsdto.name':'string','categorydto.productsdto.price':'string','categorydto.productsdto.manufacturerdto':'attribute','categorydto.productsdto.manufacturerdto.name':'string'};
	//var input = {'name':'Bread Shop','type':'Bakery','categorydto.category':'Breads','categorydto.productsdto.name':'French Baguette','categorydto.productsdto.price':'$4.99','categorydto.productsdto.manufacturerdto.name':'Bay Bread'};

	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codytest33(){
	//var dtoobjectDOT = {'name':'string','address':'string','city':'string','state':'string','country':'string','phone':'string','workersdto':'attribute','workersdto.first':'string','workersdto.last':'string','workersdto.employment':'string','workersdto.yearsatcompany':'string','workersdto.position':'string','workersdto.notes':'attribute','workersdto.notes.comments':'string'};
	//var input = {'name':'Happy Stuff Inc.','address':'123 Henry St.','city':'Brooklyn','state':'NY','country':'US','phone':'555-555-5555','workersdto.first':'George','workersdto.last':'Carver','workersdto.employment':'full time','workersdto.yearsatcompany':'9','workersdto.position':'cashier','workersdto.notes.comments':'up for promotion'};
	clearLocalStorage();
	// add a companydto with product brands. In this case, Kellog and their Frosted Flakes
	execute("AddWidObject",{"wid":"productdto","metadata.method":"productdto","name":"string","calories":"number"}, "", "");
	execute("AddWidObject",{"wid":"companydto","metadata.method":"companydto","name":"string","city":"string","productdto":"onetomany"}, "", "");
	execute("AddWidObject",{"wid":"rel_comp_prod","metadata.method":"relationshipdto","primarywid":"companydto","secondarywid":"productdto"}, "", "");
	
	execute("AddWidObject",{"wid":"kellog_ff","metadata.method":"companydto","command.checkflag":"dto","name":"Kellogs","city":"MA","productdto.name":"Frosted Flakes","productdto.calories":"120"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff"}, "", "");
	execute("GetWidMaster",{"wid":"kellog_ff","command.dtotype":"companydto","command.convertmethod":"dto"}, "kellog_ff_get", "");
	logverify("readkellogff","resultwid","kellog_ff_get","","",{"metadata.method":"companydto","wid":"kellog_ff","name":"Kellogs","city":"MA","0.name":"Frosted Flakes","0.calories":"120","0.metadata.method":"productdto","0.wid":"1"});														
	verifysummary("resultwid");
}

function codymisc(){
// {"command.dtotype": "compositeteacherdto", "teachername": "roger", "degree": "basketweaving", "studentdto.studentname": "Joe", "studentdto.country": "Thailand"}
//{"wid":"studentmoe", "studentname": "moe"} 
//var input = { 'a.x': 'y', 'c': 'd', 'e': 'f', 'g.w': 'h', 'g.t': 'y', 'command.dtotype': 'dtoX', 'command.checkdatatypeflag': "dto" };
// { "a.x": "y", "c": "d", "e": "f", "g.w": "h", "g.t": "y", "command.dtotype": "wid103", "command.checkdatatypeflag": "dto" }
//var dtoobjectDOT = { 'a.x': 'string', 'c': 'string', 'e': 'attributes', 'g.w': 'string', 'g.t': 'string', 'a': 'attribute', 'g': 'attribute' };
//var input = {'h':'t','g':'r','f':'e','t':'qqq','t.a':'f','t.e':'j','t.c':'ddd','t.b':'aaa','t.d':'i','t.b.m':'g','t.b.z':'ccc','t.b.d':'c ','t.b.q':'r','t.c.t':'w','t.c.l':'q','t.c.z':'j','t.b.z.r':'s','t.b.z.t':'v','t.b.z.y':'bbb','t.b.z.x':'y','t.b.z.y.u':'j','t.b.z.y.s':'h','t.b.z.y.a':'i'};
//var dtoobjectDOT = {'h':'string','g':'string','f':'string','t':"json",'t.a':'string','t.e':'string','t.c':'attribute','t.b':'attribute','t.d':'string','t.b.m':'string','t.b.z':'attribute','t.b.d':'string','t.b.q':'string','t.c.t':'string','t.c.l':'string','t.c.z':'string','t.b.z.r':'string','t.b.z.t':'string','t.b.z.y':'attribute','t.b.z.x':'string','t.b.z.y.u':'string','t.b.z.y.s':'string','t.b.z.y.a':'string'};
//{'h':'t','g':'r','f':'e','t':'qqq','t.a':'f','t.e':'j','t.c':'ddd','t.b':'i','t.b.m':'g','t.b.z':'ccc','t.b.d':'c ','t.b.q':'r','t.c.t':'w','t.c.l':'q','t.c.z':'j','t.b.z.r':'s','t.b.z.t':'v','t.b.z.y':'bbb','t.b.z.x':'y','t.b.z.y.u':'j','t.b.z.y.s':'h','t.b.z.y.a':'i'}
//{'h':'string','g':'string','f':'string','t':"json",'t.a':'string','t.e':'string','t.c':'attribute','t.b':'string','t.b.m':'string','t.b.z':'attribute','t.b.d':'string','t.b.q':'string','t.c.t':'string','t.c.l':'string','t.c.z':'string','t.b.z.r':'string','t.b.z.t':'string','t.b.z.y':'attribute','t.b.z.x':'string','t.b.z.y.u':'string','t.b.z.y.s':'string','t.b.z.y.a':'string'}
//var input = { 'a':'b'};
//var dtoobjectDOT = {'a':'attribute'};
//var input = { 'a':'b','c':'d'};
//var dtoobjectDOT = {'a':'attribute','c':'string'};
//var dtoXobjectDOT = { 'a.x': 'string', 'c': 'string', 'e': 'string', 'g.w': 'string', 'g.t': 'string' };
//var dtoobjectDOT = {'userdto':'attribute','name':'string', 'address': 'string', 'country':'string', 'state':'string', 'userdto.name':'string','userdto.address':'string','userdto.country':'string', 'userdto.state':'string', 'userdto.userclass':'string'};
//var input = {'name':'Magnolia','address':'125 w 57th st.','country':'US','state':'NY','userdto.name':'cody','userdto.address':'55 Clark St.','userdto.country':'US','userdto.state':'NY','userdto.userclass':'student'};





















}

function codytest2(){
	var sequenceObjList=[];
	var seqList = ["seq01"];
	
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","actiondefault":"inherit"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"systemdto","wid":"systemdto","addfield":"onetomany"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"relationshipdto","wid":"rel_addfield_systemdto","primarywid":"systemdto","secondarywid":"addfield"});

	sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"booksdto","title":"string","pages":"string","metadata.method":"booksdto"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","systemdto":"onetoone","metadata.method":"authordto"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"relsystemtoauthor","primarywid":"authordto","secondarywid":"systemdto","metadata.method":"relationshipdto"});
	
	//sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"addfield","wid":"defaultfields1","fieldname":"title","editable":"true","display":"true","oneditactions":"pop_up_notify"});
	
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.title":"Hello World!","booksdto.pages":"40"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"sarah_jones","name":"Sarah Jones","age":"40","booksdto.title":"The Sands of Time","booksdto.pages":"378"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"mike_williams","name":"Mike Williams","age":"36","booksdto.title":"Attack on the Mainframe","booksdto.pages":"600"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"jerry_stone","name":"Jerry Stone","age":"41","booksdto.title":"Carpentry 101","booksdto.pages":"120"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"elizabeth_heart","name":"Elizabeth Heart","age":"50","booksdto.title":"The X Factor","booksdto.pages":"300"});
	
	//sequenceObjList.push({"seq":"seq01","command.action":"get","metadata.method":"authordto","wid":"elizabeth_heart"});
	
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"joe_jamison","systemdto.addfield.fieldname":"title","systemdto.addfield.editable":"false","systemdto.addfield.display":"true","systemdto.addfield.oneditactions":"pop_up_alert"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"joe_jamison","systemdto.addfield.fieldname":"pages","systemdto.addfield.editable":"true","systemdto.addfield.display":"true","systemdto.addfield.oneditactions":"pop_up_alert"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"elizabeth_heart","systemdto.addfield.fieldname":"title","systemdto.addfield.editable":"true","systemdto.addfield.display":"true","systemdto.addfield.oneditactions":"pop_up_notify"});
	
	testSequeceObjList(sequenceObjList, seqList);
}

function codygojsobject(){
	var sequenceObjList=[];
	var seqList = ["seq2"];
	
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsobject","metadata.method":"gojsobject","class":"string","linkFromPortIdProperty":"string","linkToPortIdProperty":"string","nodeDataArray":"onetomany","linkDataArray":"onetomany"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"nodeDataArray","metadata.method":"nodeDataArray", "key":"string", "loc":"string", "leftArray":"onetomany", "topArray":"onetomany", "bottomArray":"onetomany", "rightArray":"onetomany"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"leftArray","metadata.method":"leftArray","portColor":"string", "portId":"string"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"topArray","metadata.method":"topArray","portColor":"string", "portId":"string"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"bottomArray","metadata.method":"bottomArray","portColor":"string", "portId":"string"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"rightArray","metadata.method":"rightArray","portColor":"string", "portId":"string"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"linkDataArray","metadata.method":"linkDataArray", "from":"string", "to":"string", "fromPort":"string", "toPort":"string"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsrel1","primarywid":"gojsobject","secondarywid":"nodedataarray","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsrel2","primarywid":"gojsobject","secondarywid":"linkdataarray","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsrel3","primarywid":"nodedataarray","secondarywid":"leftarray","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsrel4","primarywid":"nodedataarray","secondarywid":"toparray","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsrel5","primarywid":"nodedataarray","secondarywid":"bottomarray","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"gojsrel6","primarywid":"nodedataarray","secondarywid":"rightarray","relationshiptype":"attributes","metadata.method":"relationshipdto"});

	sequenceObjList.push({"seq":"seq2","command.action":"add","wid":"widtest","metadata.method":"gojsobject","class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray.0.key":"unit One","nodeDataArray.0.loc":"101 204","nodeDataArray.0.leftArray.0.portColor":"#425e5c","nodeDataArray.0.leftArray.0.portId":"left0","nodeDataArray.0.topArray.0.portColor":"#d488a2","nodeDataArray.0.topArray.0.portId":"top0","nodeDataArray.0.bottomArray.0.portColor":"#316571","nodeDataArray.0.bottomArray.0.portId":"bottom0","nodeDataArray.0.rightArray.0.portColor":"#923951","nodeDataArray.0.rightArray.0.portId":"right0","nodeDataArray.0.rightArray.1.portColor":"#ef3768","nodeDataArray.0.rightArray.1.portId":"right1","nodeDataArray.1.key":"unit Two","nodeDataArray.1.loc":"320 152","nodeDataArray.1.leftArray.0.portColor":"#7d4bd6","nodeDataArray.1.leftArray.0.portId":"left0","nodeDataArray.1.leftArray.1.portColor":"#cc585c","nodeDataArray.1.leftArray.1.portId":"left1","nodeDataArray.1.leftArray.2.portColor":"#b1273a","nodeDataArray.1.leftArray.2.portId":"left2","nodeDataArray.1.topArray.0.portColor":"#14abef","nodeDataArray.1.topArray.0.portId":"top0","nodeDataArray.1.bottomArray.0.portColor":"#dd45c7","nodeDataArray.1.bottomArray.0.portId":"bottom0","nodeDataArray.1.bottomArray.1.portColor":"#995aa6","nodeDataArray.1.bottomArray.1.portId":"bottom1","nodeDataArray.1.bottomArray.2.portColor":"#6b95cb","nodeDataArray.1.bottomArray.2.portId":"bottom2","nodeDataArray.2.key":"unit Three","nodeDataArray.2.loc":"384 319","nodeDataArray.2.leftArray.0.portColor":"#bd8f27","nodeDataArray.2.leftArray.0.portId":"left0","nodeDataArray.2.leftArray.1.portColor":"#c14617","nodeDataArray.2.leftArray.1.portId":"left1","nodeDataArray.2.leftArray.2.portColor":"#47fa60","nodeDataArray.2.leftArray.2.portId":"left2","nodeDataArray.2.topArray.0.portColor":"#d08154","nodeDataArray.2.topArray.0.portId":"top0","nodeDataArray.2.bottomArray.0.portColor":"#6cafdb","nodeDataArray.2.bottomArray.0.portId":"bottom0","nodeDataArray.3.key":"unit Four","nodeDataArray.3.loc":"138 351","nodeDataArray.3.leftArray.0.portColor":"#491389","nodeDataArray.3.leftArray.0.portId":"left0","nodeDataArray.3.topArray.0.portColor":"#77ac1e","nodeDataArray.3.topArray.0.portId":"top0","nodeDataArray.3.bottomArray.0.portColor":"#e9701b","nodeDataArray.3.bottomArray.0.portId":"bottom0","nodeDataArray.3.rightArray.0.portColor":"#24d05e","nodeDataArray.3.rightArray.0.portId":"right0","nodeDataArray.3.rightArray.1.portColor":"#cfabaa","nodeDataArray.3.rightArray.1.portId":"right1","linkDataArray.0.from":"unit Four","linkDataArray.0.to":"unit One","linkDataArray.0.fromPort":"top0","linkDataArray.0.toPort":"bottom0","linkDataArray.1.from":"unit Four","linkDataArray.1.to":"unit Two","linkDataArray.1.fromPort":"top0","linkDataArray.1.toPort":"bottom0","linkDataArray.2.from":"unit Three","linkDataArray.2.to":"unit Two","linkDataArray.2.fromPort":"top0","linkDataArray.2.toPort":"bottom1","linkDataArray.3.from":"unit Four","linkDataArray.3.to":"unit Three","linkDataArray.3.fromPort":"right0","linkDataArray.3.toPort":"left0","linkDataArray.4.from":"unit Four","linkDataArray.4.to":"unit Three","linkDataArray.4.fromPort":"right1","linkDataArray.4.toPort":"left2","linkDataArray.5.from":"unit One","linkDataArray.5.to":"unit Two","linkDataArray.5.fromPort":"right0","linkDataArray.5.toPort":"left1","linkDataArray.6.from":"unit One","linkDataArray.6.to":"unit Two","linkDataArray.6.fromPort":"right1","linkDataArray.6.toPort":"left2"});	
	//sequenceObjList.push({"seq":"seq2","command.action":"debugon"});
	sequenceObjList.push({"seq":"seq2","command.action":"get","wid":"widtest"});
	sequenceObjList.push({"seq":"seq2","command.action":"verify","verifywid":"get_widtest","metadata.method":"gojsobject","wid":"widtest","class":"go.GraphLinksModel","linkfromportidproperty":"fromPort","linktoportidproperty":"toPort","nodedataarray.0.key":"unit One","nodedataarray.0.loc":"101 204","nodedataarray.0.metadata.method":"nodedataarray","nodedataarray.0.wid":"1","nodedataarray.0.leftarray.0.portcolor":"#425e5c","nodedataarray.0.leftarray.0.portid":"left0","nodedataarray.0.leftarray.0.metadata.method":"leftarray","nodedataarray.0.leftarray.0.wid":"2","nodedataarray.0.toparray.0.portcolor":"#d488a2","nodedataarray.0.toparray.0.portid":"top0","nodedataarray.0.toparray.0.metadata.method":"toparray","nodedataarray.0.toparray.0.wid":"4","nodedataarray.0.bottomarray.0.portcolor":"#316571","nodedataarray.0.bottomarray.0.portid":"bottom0","nodedataarray.0.bottomarray.0.metadata.method":"bottomarray","nodedataarray.0.bottomarray.0.wid":"6","nodedataarray.0.rightarray.0.portcolor":"#ef3768","nodedataarray.0.rightarray.0.portid":"right1","nodedataarray.0.rightarray.0.metadata.method":"rightarray","nodedataarray.0.rightarray.0.wid":"10","nodedataarray.0.rightarray.1.portcolor":"#923951","nodedataarray.0.rightarray.1.portid":"right0","nodedataarray.0.rightarray.1.metadata.method":"rightarray","nodedataarray.0.rightarray.1.wid":"8","nodedataarray.1.key":"unit Two","nodedataarray.1.loc":"320 152","nodedataarray.1.metadata.method":"nodedataarray","nodedataarray.1.wid":"13","nodedataarray.1.leftarray.0.portcolor":"#7d4bd6","nodedataarray.1.leftarray.0.portid":"left0","nodedataarray.1.leftarray.0.metadata.method":"leftarray","nodedataarray.1.leftarray.0.wid":"14","nodedataarray.1.leftarray.1.portcolor":"#cc585c","nodedataarray.1.leftarray.1.portid":"left1","nodedataarray.1.leftarray.1.metadata.method":"leftarray","nodedataarray.1.leftarray.1.wid":"16","nodedataarray.1.leftarray.2.portcolor":"#b1273a","nodedataarray.1.leftarray.2.portid":"left2","nodedataarray.1.leftarray.2.metadata.method":"leftarray","nodedataarray.1.leftarray.2.wid":"18","nodedataarray.1.toparray.0.portcolor":"#14abef","nodedataarray.1.toparray.0.portid":"top0","nodedataarray.1.toparray.0.metadata.method":"toparray","nodedataarray.1.toparray.0.wid":"20","nodedataarray.1.bottomarray.0.portcolor":"#dd45c7","nodedataarray.1.bottomarray.0.portid":"bottom0","nodedataarray.1.bottomarray.0.metadata.method":"bottomarray","nodedataarray.1.bottomarray.0.wid":"22","nodedataarray.1.bottomarray.1.portcolor":"#995aa6","nodedataarray.1.bottomarray.1.portid":"bottom1","nodedataarray.1.bottomarray.1.metadata.method":"bottomarray","nodedataarray.1.bottomarray.1.wid":"24","nodedataarray.1.bottomarray.2.portcolor":"#6b95cb","nodedataarray.1.bottomarray.2.portid":"bottom2","nodedataarray.1.bottomarray.2.metadata.method":"bottomarray","nodedataarray.1.bottomarray.2.wid":"26","nodedataarray.2.key":"unit Three","nodedataarray.2.loc":"384 319","nodedataarray.2.metadata.method":"nodedataarray","nodedataarray.2.wid":"29","nodedataarray.2.leftarray.0.portcolor":"#bd8f27","nodedataarray.2.leftarray.0.portid":"left0","nodedataarray.2.leftarray.0.metadata.method":"leftarray","nodedataarray.2.leftarray.0.wid":"30","nodedataarray.2.leftarray.1.portcolor":"#c14617","nodedataarray.2.leftarray.1.portid":"left1","nodedataarray.2.leftarray.1.metadata.method":"leftarray","nodedataarray.2.leftarray.1.wid":"32","nodedataarray.2.leftarray.2.portcolor":"#47fa60","nodedataarray.2.leftarray.2.portid":"left2","nodedataarray.2.leftarray.2.metadata.method":"leftarray","nodedataarray.2.leftarray.2.wid":"34","nodedataarray.2.toparray.0.portcolor":"#d08154","nodedataarray.2.toparray.0.portid":"top0","nodedataarray.2.toparray.0.metadata.method":"toparray","nodedataarray.2.toparray.0.wid":"36","nodedataarray.2.bottomarray.0.portcolor":"#6cafdb","nodedataarray.2.bottomarray.0.portid":"bottom0","nodedataarray.2.bottomarray.0.metadata.method":"bottomarray","nodedataarray.2.bottomarray.0.wid":"38","nodedataarray.3.key":"unit Four","nodedataarray.3.loc":"138 351","nodedataarray.3.metadata.method":"nodedataarray","nodedataarray.3.wid":"41","nodedataarray.3.leftarray.0.portcolor":"#491389","nodedataarray.3.leftarray.0.portid":"left0","nodedataarray.3.leftarray.0.metadata.method":"leftarray","nodedataarray.3.leftarray.0.wid":"42","nodedataarray.3.toparray.0.portcolor":"#77ac1e","nodedataarray.3.toparray.0.portid":"top0","nodedataarray.3.toparray.0.metadata.method":"toparray","nodedataarray.3.toparray.0.wid":"44","nodedataarray.3.bottomarray.0.portcolor":"#e9701b","nodedataarray.3.bottomarray.0.portid":"bottom0","nodedataarray.3.bottomarray.0.metadata.method":"bottomarray","nodedataarray.3.bottomarray.0.wid":"46","nodedataarray.3.rightarray.0.portcolor":"#24d05e","nodedataarray.3.rightarray.0.portid":"right0","nodedataarray.3.rightarray.0.metadata.method":"rightarray","nodedataarray.3.rightarray.0.wid":"48","nodedataarray.3.rightarray.1.portcolor":"#cfabaa","nodedataarray.3.rightarray.1.portid":"right1","nodedataarray.3.rightarray.1.metadata.method":"rightarray","nodedataarray.3.rightarray.1.wid":"50","linkdataarray.0.from":"unit Four","linkdataarray.0.to":"unit One","linkdataarray.0.fromport":"top0","linkdataarray.0.toport":"bottom0","linkdataarray.0.metadata.method":"linkdataarray","linkdataarray.0.wid":"53","linkdataarray.1.from":"unit Four","linkdataarray.1.to":"unit Two","linkdataarray.1.fromport":"top0","linkdataarray.1.toport":"bottom0","linkdataarray.1.metadata.method":"linkdataarray","linkdataarray.1.wid":"55","linkdataarray.2.from":"unit Three","linkdataarray.2.to":"unit Two","linkdataarray.2.fromport":"top0","linkdataarray.2.toport":"bottom1","linkdataarray.2.metadata.method":"linkdataarray","linkdataarray.2.wid":"57","linkdataarray.3.from":"unit Four","linkdataarray.3.to":"unit Three","linkdataarray.3.fromport":"right0","linkdataarray.3.toport":"left0","linkdataarray.3.metadata.method":"linkdataarray","linkdataarray.3.wid":"59","linkdataarray.4.from":"unit Four","linkdataarray.4.to":"unit Three","linkdataarray.4.fromport":"right1","linkdataarray.4.toport":"left2","linkdataarray.4.metadata.method":"linkdataarray","linkdataarray.4.wid":"61","linkdataarray.5.from":"unit One","linkdataarray.5.to":"unit Two","linkdataarray.5.fromport":"right0","linkdataarray.5.toport":"left1","linkdataarray.5.metadata.method":"linkdataarray","linkdataarray.5.wid":"63","linkdataarray.6.from":"unit One","linkdataarray.6.to":"unit Two","linkdataarray.6.fromport":"right1","linkdataarray.6.toport":"left2","linkdataarray.6.metadata.method":"linkdataarray","linkdataarray.6.wid":"65"});

	testSequeceObjList(sequenceObjList, seqList);
}


/*
function codytest3(){
	var sequenceObjList = [];
	var seqList = ["seq01"]
	
	sequenceObjList.push({"seq":"seq01","command.action":"clear"});
	
		// add bookdto + authordto and relate them
	sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"booksdto","title":"string","pages":"string""metadata.method":"booksdto"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","metadata.method":"authordto"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto","relationshiptype":"attributes","metadata.method":"relationshipdto"});

	// add 5 regular "authordto" wids
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.title":"Hello World!","bookdto.pages":"40"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"sarah_jones","name":"Sarah Jones","age":"40","booksdto.title":"The Sands of Time","bookdto.pages":"378"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"mike_williams","name":"Mike Williams","age":"36","booksdto.title":"Attack on the Mainframe","bookdto.pages":"600"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"jerry_stone","name":"Jerry Stone","age":"41","booksdto.title":"Carpentry 101","bookdto.pages":"120"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"elizabeth_heart","name":"Elizabeth Heart","age":"50","booksdto.title":"The X Factor","bookdto.pages":"300"});
	
			// add systemdto + addfield dto and relate them. then, relate systemdto to authordto so that authors can have system information tied to them

	
	// add some system information to those wids
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"joe_jamison","systemdto.addfield.fieldname":"title","systemdto.addfield.editable":"false","systemdto.addfield.display":"true","systemdto.addfield.oneditactions":"pop_up_alert"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"joe_jamison","systemdto.addfield.fieldname":"pages","systemdto.addfield.editable":"true","systemdto.addfield.display":"true","systemdto.addfield.oneditactions":"pop_up_alert"});
	sequenceObjList.push({"seq":"seq01","command.action":"add","metadata.method":"authordto","wid":"elizabeth_heart","systemdto.addfield.fieldname":"title","systemdto.addfield.editable":"true","systemdto.addfield.display":"true","systemdto.addfield.oneditactions":"pop_up_notify"});
	testSequeceObjList(sequenceObjList, seqList);
}
*/