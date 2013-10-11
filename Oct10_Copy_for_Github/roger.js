function roger() {
	alert('Roger says hello');
}

function adda() {
	clearLocalStorage();
	execute("AddWidObject",{"wid":"defaultforauthor","first":"roger"});
	execute("AddWidObject",{"wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","defaultforauthor":"inherit","booksdto1":"onetomany"});
	execute("AddWidObject",{"wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1","defaultforbook":"inherit"});
	execute("AddWidObject",{"wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	execute("debugon");
	execute("getWidMaster",{"wid":"authordto1", "command.convertmethod":"dto"});
	execute("debugoff");
}

function addb() {
	clearLocalStorage();
	execute("AddWidObject",{"wid":"defaultforauthor","name":"roger"});

	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultforauthor":"inherit"}, "", "");
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"adddto","wid":"adddto","actiondto":"onetomany","palettedto":"onetomany","addfield":"onetomany"}, "", "");
	execute("AddWidObject",{"metadata.method":"actiondto","wid":"actiondto","action":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"palettedto","wid":"palettedto","widname":"string","category":"string","subcategory":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","addfielddefault":"inherit"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"reladddtotoauthor","primarywid":"authordto","secondarywid":"adddto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_actiondto_adddto","primarywid":"adddto","secondarywid":"actiondto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_palettedto_adddto","primarywid":"adddto","secondarywid":"palettedto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_addfield_adddto","primarywid":"adddto","secondarywid":"addfield"}, "", "");

	execute("debugon");
	execute("getWidMaster",{"wid":"authordto", "command.convertmethod":"dto"});
	execute("debugoff");
}

function addc() {
	clearLocalStorage();
	execute("AddWidObject",{"wid":"defaultforauthor","name":"roger"});

	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultforauthor":"inherit"}, "", "");
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"adddto","wid":"adddto","actiondto":"onetomany","palettedto":"onetomany","addfield":"onetomany"}, "", "");
	execute("AddWidObject",{"metadata.method":"actiondto","wid":"actiondto","action":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"palettedto","wid":"palettedto","widname":"string","category":"string","subcategory":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","addfielddefault":"inherit"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"reladddtotoauthor","primarywid":"authordto","secondarywid":"adddto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_actiondto_adddto","primarywid":"adddto","secondarywid":"actiondto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_palettedto_adddto","primarywid":"adddto","secondarywid":"palettedto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_addfield_adddto","primarywid":"adddto","secondarywid":"addfield"}, "", "");

	execute("AddWidObject",{"metadata.method":"authordto","wid":"startwid","age":"00","booksdto.title":"none","booksdto.pages":"00"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"startwid","adddto.actiondto.action":"none","adddto.palettedto.0.widname":"joe_jamison","adddto.palettedto.0.category":"human","adddto.palettedto.0.subcategory":"author","adddto.addfield.fieldname":"name","adddto.linkrules.linkclass":"1","adddto.linkrules.min":"0","adddto.linkrules.max":"10"}, "", "");

	execute("debugon");
	execute("getWidMaster",{"wid":"startwid"});
	execute("debugoff");
}


function addd() {
	clearLocalStorage();
	execute("AddWidObject",{"wid":"defaultforauthor","name":"roger"});

	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultforauthor":"inherit"}, "", "");
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"adddto","wid":"adddto","actiondto":"onetomany","palettedto":"onetomany","addfield":"onetomany"}, "", "");
	execute("AddWidObject",{"metadata.method":"actiondto","wid":"actiondto","action":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"palettedto","wid":"palettedto","widname":"string","category":"string","subcategory":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","addfielddefault":"inherit"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"reladddtotoauthor","primarywid":"authordto","secondarywid":"adddto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_actiondto_adddto","primarywid":"adddto","secondarywid":"actiondto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_palettedto_adddto","primarywid":"adddto","secondarywid":"palettedto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_addfield_adddto","primarywid":"adddto","secondarywid":"addfield"}, "", "");

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

	execute("debugon");
	execute("getWidMaster",{"wid":"startwid"});
	execute("debugoff");
}

function adde(){
	
	//execute("debugon");
	clearLocalStorage();
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

function addf() {
	clearLocalStorage();
	execute("AddWidObject",{"wid":"defaultforauthor","name":"roger"});
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultforauthor":"inherit"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.title":"Hello World!","booksdto.pages":"40"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"sarah_jones","age":"40","booksdto.title":"The Sands of Time","booksdto.pages":"378"}, "", "");
	
	execute("getWidMaster", {"wid":"joe_jamison"}, "joe_get_result", "");
	execute("getWidMaster", {"wid":"sarah_jones"}, "sarah_get_result", "");
	logverify("addf","resultwid","joe_get_result","","",{"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.0.title":"Hello World!","booksdto.0.pages":"40","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1"});
	logverify("addf","resultwid","sarah_get_result","","",{"metadata.method":"authordto","wid":"sarah_jones","age":"40","booksdto.0.title":"The Sands of Time","booksdto.0.pages":"378","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"3","name":"roger"});
	verifysummary("resultwid");

	//execute("debugon");
 	//execute("AddWidObject",{"command.dtotype":"booksdto","wid":"joe_jamison","title":"entered direct dto","pages":"40-direct"}, "", "");
	//execute("getWidMaster", {"command.dtotype":"booksdto","wid":"joe_jamison"}, "joe_get_result2", "");
	//execute("debugoff");
}

function addg() {
	clearLocalStorage();
	execute("AddWidObject",{"wid":"defaultforauthor","name":"roger"});
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultforauthor":"inherit"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	
	execute("AddWidObject",{"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.title":"Hello World!","booksdto.pages":"40"}, "", "");
	
	//execute("AddWidObject",{"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.title":"Hello Moon","booksdto.pages":"2001"}, "", "");


	execute("AddWidObject",{"metadata.method":"authordto","wid":"sarah_jones","age":"40","booksdto.title":"The Sands of Time","booksdto.pages":"378"}, "", "");
	
	execute("getWidMaster", {"wid":"joe_jamison"}, "joe_get_result", "");
	execute("getWidMaster", {"wid":"sarah_jones"}, "sarah_get_result", "");
	logverify("addg","resultwid","joe_get_result","","",{"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.0.title":"Hello World!","booksdto.0.pages":"40","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1"});
	logverify("addg","resultwid","sarah_get_result","","",{"metadata.method":"authordto","wid":"sarah_jones","age":"40","booksdto.0.title":"The Sands of Time","booksdto.0.pages":"378","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"3","name":"roger"});
	verifysummary("resultwid");

	//execute("debugon");
 	//execute("AddWidObject",{"command.dtotype":"booksdto","wid":"joe_jamison","title":"entered direct dto","pages":"40-direct"}, "", "");
	execute("getWidMaster", {"command.dtotype":"booksdto","wid":"joe_jamison"}, "joe_get_result2", "");
	logverify("addg","resultwid","joe_get_result2","","",{"0.title":"Hello World!","0.pages":"40","0.metadata.method":"booksdto","0.wid":"1"});
	verifysummary("resultwid");
	//execute("debugoff");
}

function addh() {
	clearLocalStorage();
	execute("AddWidObject",{"wid":"defaultforauthor","name":"roger"});

	execute("AddWidObject",{"metadata.method":"authordto","wid":"authordto","name":"string","age":"string","booksdto":"onetomany","adddto":"onetoone","defaultforauthor":"inherit"}, "", "");
	execute("AddWidObject",{"metadata.method":"booksdto","wid":"booksdto","title":"string","pages":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"adddto","wid":"adddto","actiondto":"onetomany","palettedto":"onetomany","addfield":"onetomany"}, "", "");
	execute("AddWidObject",{"metadata.method":"actiondto","wid":"actiondto","action":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"palettedto","wid":"palettedto","widname":"string","category":"string","subcategory":"string"}, "", "");
	execute("AddWidObject",{"metadata.method":"addfield","wid":"addfield","fieldname":"string","editable":"string","display":"string","oneditactions":"string","addfielddefault":"inherit"}, "", "");

	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"relbooktoauthor","primarywid":"authordto","secondarywid":"booksdto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"reladddtotoauthor","primarywid":"authordto","secondarywid":"adddto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_actiondto_adddto","primarywid":"adddto","secondarywid":"actiondto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_palettedto_adddto","primarywid":"adddto","secondarywid":"palettedto"}, "", "");
	execute("AddWidObject",{"metadata.method":"relationshipdto","wid":"rel_addfield_adddto","primarywid":"adddto","secondarywid":"addfield"}, "", "");

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


	execute("debugon");
	execute("getWidMaster", {"command.dtotype":"actiondto","wid":"joe_jamison"}, "joe_get_result2", "");
	execute("debugoff");

}

function addi(){
	clearLocalStorage();
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
	//execute("debugon");
	execute("AddWidObject",{"metadata.method":"authordto","wid":"startwid","name":"start wid","age":"00","booksdto.title":"none","booksdto.pages":"00"}, "", "");
	//execute("debugoff");
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
	execute("getWidMaster", {"wid":"startwid"}, "startwid_get_result", "");
	logverify("readstartwid","resultwid","startwid_get_result","","",{"metadata.method":"authordto","wid":"startwid","name":"start wid","age":"00","booksdto.0.title":"none","booksdto.0.pages":"00","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.action":"none","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.addfield.0.fieldname":"name","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0.display":"true","adddto.0.addfield.0.editable":"true","adddto.0.addfield.0.onreadactions":"none","adddto.0.addfield.0.oneditactions":"pop_up_alert","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20"});
	//																 {"metadata.method":"authordto","wid":"startwid","name":"start wid","age":"00","booksdto.0.title":"none","booksdto.0.pages":"00","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"1","adddto.0.metadata.method":"adddto","adddto.0.wid":"13","adddto.0.actiondto.0.action":"none","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"14","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"16","adddto.0.addfield.0.fieldname":"name","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"18","adddto.0.addfield.0..method":"defaultdto","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"20"}

	verifysummary("resultwid");
 
 	//execute("debugon");
 	execute("getWidMaster", {"wid":"startwid","command.dtotype":"authordto"}, "startwid_authordto", "");
 	execute("getWidMaster", {"wid":"startwid","command.dtotype":"booksdto", "command.convertmethod":"dtonum"}, "startwid_dtonum_bookdto", "");
 	execute("getWidMaster", {"wid":"startwid","command.dtotype":"booksdto", "command.convertmethod":"num"}, "startwid_num_`bookdto", "");
 	execute("getWidMaster", {"wid":"startwid","command.dtotype":"booksdto"}, "startwid_bookdto", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"palettedto"}, "startwid_palettedto", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"adddto"}, "startwid_adddto", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"addfield"}, "startwid_addfield", "");	
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"actiondto"}, "startwid_actiondto", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"linkrules"}, "startwid_linkrules", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"gojsobject"}, "startwid_gojsobject", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"nodeDataArray"}, "startwid_nodeDataArray", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"linkDataArray"}, "startwid_linkdataarray", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"leftarray"}, "startwid_leftarray", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"rightarray"}, "startwid_rightarray", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"bottomarray"}, "startwid_bottomarray", "");
	execute("getWidMaster", {"wid":"startwid","command.dtotype":"toparray"}, "startwid_toparray", "");
	//execute("debugoff");
	
	/*
	//get the new record
	sequenceObjList.push({"seq":"seq01","command.action":"debugon"});
	sequenceObjList.push({"seq":"seq01","command.action":"get","metadata.method":"authordto","wid":"startwid"});
	sequenceObjList.push({"seq":"seq01","command.action":"debugoff"});
	*/
// 	I hovered over function parameters, clicked, then entered this:, then click getwidmaster
// {"wid":"joe_jamison"}
// {"metadata.method":"authordto","wid":"joe_jamison","name":"Joe Jamison","age":"32","booksdto.0.title":"Hello World!","booksdto.0.pages":"40","booksdto.0.metadata.method":"booksdto","booksdto.0.wid":"3","adddto.0.metadata.method":"adddto","adddto.0.wid":"23","adddto.0.actiondto.0.action":"{'color_screen':'blue'}","adddto.0.actiondto.0.metadata.method":"actiondto","adddto.0.actiondto.0.wid":"24","adddto.0.palettedto.0.widname":"joe_jamison","adddto.0.palettedto.0.category":"human","adddto.0.palettedto.0.subcategory":"author","adddto.0.palettedto.0.metadata.method":"palettedto","adddto.0.palettedto.0.wid":"26","adddto.0.palettedto.1.widname":"jessica_jamison","adddto.0.palettedto.1.category":"human","adddto.0.palettedto.1.subcategory":"wife","adddto.0.palettedto.1.metadata.method":"palettedto","adddto.0.palettedto.1.wid":"28","adddto.0.palettedto.2.widname":"mary_morris","adddto.0.palettedto.2.category":"human","adddto.0.palettedto.2.subcategory":"sister","adddto.0.palettedto.2.metadata.method":"palettedto","adddto.0.palettedto.2.wid":"30","adddto.0.addfield.0.fieldname":"name","adddto.0.addfield.0.metadata.method":"addfield","adddto.0.addfield.0.wid":"32","adddto.0.addfield.0.display":"true","adddto.0.addfield.0.editable":"true","adddto.0.addfield.0.onreadactions":"none","adddto.0.addfield.0.oneditactions":"pop_up_alert","adddto.0.linkrules.0.linkclass":"1","adddto.0.linkrules.0.min":"0","adddto.0.linkrules.0.max":"10","adddto.0.linkrules.0.metadata.method":"linkrules","adddto.0.linkrules.0.wid":"34"}'

// --

// {"wid":"joe_jamison", "command.dtotype":"palettedto", "command.convertmethod":"dtonum"}

// {"palettedto.0.widname":"joe_jamison","palettedto.0.category":"human","palettedto.0.subcategory":"author","palettedto.0.metadata.method":"palettedto","palettedto.0.wid":"26","palettedto.1.widname":"jessica_jamison","palettedto.1.category":"human","palettedto.1.subcategory":"wife","palettedto.1.metadata.method":"palettedto","palettedto.1.wid":"28","palettedto.2.widname":"mary_morris","palettedto.2.category":"human","palettedto.2.subcategory":"sister","palettedto.2.metadata.method":"palettedto","palettedto.2.wid":"30"}'

// --

// {"wid":"joe_jamison", "command.dtotype":"palettedto"}
// {"widname":"mary_morris","category":"human","subcategory":"sister","metadata.method":"palettedto","wid":"30"}'

// -- 
// {"wid":"joe_jamison", "command.dtotype":"palettedto", "command.convertmethod":"num"}

// {"0.widname":"joe_jamison","0.category":"human","0.subcategory":"author","0.metadata.method":"palettedto","0.wid":"26","1.widname":"jessica_jamison","1.category":"human","1.subcategory":"wife","1.metadata.method":"palettedto","1.wid":"28","2.widname":"mary_morris","2.category":"human","2.subcategory":"sister","2.metadata.method":"palettedto","2.wid":"30"}'


}

function seq3(){
	var sequenceObjList=[];
	var seqList = ["seq2","seq1","seq3"];
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
//
sequenceObjList.push({"seq":"seq4","command.action":"add","wid":"addfield","metadata.method":"addfield","oneditfield":"string","oneditaction":"string"});
//
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"adddto","metadata.method":"adddto","gojsobject":"onetoone","actionDTO":"onetomany","paletteDTO":"onetomany","addfield":"onetomany"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"paletteDTO","metadata.method":"paletteDTO","widname":"string","category":"string","subcategory":"string"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"actionDTO","metadata.method":"actionDTO","actionname":"string"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"reladdpal","primarywid":"adddto","secondarywid":"paletteDTO","relationshiptype":"attributes","metadata.method":"relationshipdto"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"reladdact","primarywid":"adddto","secondarywid":"actionDTO","relationshiptype":"attributes","metadata.method":"relationshipdto"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"reladdgojs","primarywid":"adddto","secondarywid":"gojsobject","relationshiptype":"attributes","metadata.method":"relationshipdto"});
sequenceObjList.push({"seq":"seq1","command.action":"add","wid":"reladdfield","primarywid":"adddto","secondarywid":"addfield","relationshiptype":"attributes","metadata.method":"relationshipdto"});
//
sequenceObjList.push({"seq":"seq3","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany","adddto":"onetoone"});
sequenceObjList.push({"seq":"seq3","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});
sequenceObjList.push({"seq":"seq3","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
//
sequenceObjList.push({"seq":"seq3","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc.","metadata.method":"authordto1"});
//
sequenceObjList.push({"seq":"seq3","command.action":"add","wid":"mary_jane1","adddto.gojsobject.wid":"marygowid","first":"BMary","last":"BSue","age":"3B0","booksdto1.name":"BPawn Of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc.","metadata.method":"authordto1","adddto.paletteDTO.0.wid":"startwid1", "adddto.paletteDTO.0.widname":"wid1", "adddto.paletteDTO.0.category":"left", "adddto.paletteDTO.0.subcategory":"right", "adddto.paletteDTO.1.wid":"startwid2", "adddto.paletteDTO.1.widname":"wid2", "adddto.paletteDTO.1.category":"left2", "adddto.paletteDTO.1.subcategory":"right2", "adddto.paletteDTO.2.wid":"startwid3", "adddto.paletteDTO.2.widname":"wid3", "adddto.paletteDTO.2.category":"left3", "adddto.paletteDTO.2.subcategory":"right3", "adddto.actionDTO.0.wid":"startwidaction1","adddto.actionDTO.0.actionname":"new","adddto.actionDTO.1.wid":"startwidaction2","adddto.actionDTO.1.actionname":"load"});
//
sequenceObjList.push({"seq":"seq3","command.action":"add","wid":"marygowid","metadata.method":"gojsobject","class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray.0.key":"unit One","nodeDataArray.0.loc":"101 204","nodeDataArray.0.leftArray.0.portColor":"#425e5c","nodeDataArray.0.leftArray.0.portId":"left0","nodeDataArray.0.topArray.0.portColor":"#d488a2","nodeDataArray.0.topArray.0.portId":"top0","nodeDataArray.0.bottomArray.0.portColor":"#316571","nodeDataArray.0.bottomArray.0.portId":"bottom0","nodeDataArray.0.rightArray.0.portColor":"#923951","nodeDataArray.0.rightArray.0.portId":"right0","nodeDataArray.0.rightArray.1.portColor":"#ef3768","nodeDataArray.0.rightArray.1.portId":"right1","nodeDataArray.1.key":"unit Two","nodeDataArray.1.loc":"320 152","nodeDataArray.1.leftArray.0.portColor":"#7d4bd6","nodeDataArray.1.leftArray.0.portId":"left0","nodeDataArray.1.leftArray.1.portColor":"#cc585c","nodeDataArray.1.leftArray.1.portId":"left1","nodeDataArray.1.leftArray.2.portColor":"#b1273a","nodeDataArray.1.leftArray.2.portId":"left2","nodeDataArray.1.topArray.0.portColor":"#14abef","nodeDataArray.1.topArray.0.portId":"top0","nodeDataArray.1.bottomArray.0.portColor":"#dd45c7","nodeDataArray.1.bottomArray.0.portId":"bottom0","nodeDataArray.1.bottomArray.1.portColor":"#995aa6","nodeDataArray.1.bottomArray.1.portId":"bottom1","nodeDataArray.1.bottomArray.2.portColor":"#6b95cb","nodeDataArray.1.bottomArray.2.portId":"bottom2","nodeDataArray.2.key":"unit Three","nodeDataArray.2.loc":"384 319","nodeDataArray.2.leftArray.0.portColor":"#bd8f27","nodeDataArray.2.leftArray.0.portId":"left0","nodeDataArray.2.leftArray.1.portColor":"#c14617","nodeDataArray.2.leftArray.1.portId":"left1","nodeDataArray.2.leftArray.2.portColor":"#47fa60","nodeDataArray.2.leftArray.2.portId":"left2","nodeDataArray.2.topArray.0.portColor":"#d08154","nodeDataArray.2.topArray.0.portId":"top0","nodeDataArray.2.bottomArray.0.portColor":"#6cafdb","nodeDataArray.2.bottomArray.0.portId":"bottom0","nodeDataArray.3.key":"unit Four","nodeDataArray.3.loc":"138 351","nodeDataArray.3.leftArray.0.portColor":"#491389","nodeDataArray.3.leftArray.0.portId":"left0","nodeDataArray.3.topArray.0.portColor":"#77ac1e","nodeDataArray.3.topArray.0.portId":"top0","nodeDataArray.3.bottomArray.0.portColor":"#e9701b","nodeDataArray.3.bottomArray.0.portId":"bottom0","nodeDataArray.3.rightArray.0.portColor":"#24d05e","nodeDataArray.3.rightArray.0.portId":"right0","nodeDataArray.3.rightArray.1.portColor":"#cfabaa","nodeDataArray.3.rightArray.1.portId":"right1","linkDataArray.0.from":"unit Four","linkDataArray.0.to":"unit One","linkDataArray.0.fromPort":"top0","linkDataArray.0.toPort":"bottom0","linkDataArray.1.from":"unit Four","linkDataArray.1.to":"unit Two","linkDataArray.1.fromPort":"top0","linkDataArray.1.toPort":"bottom0","linkDataArray.2.from":"unit Three","linkDataArray.2.to":"unit Two","linkDataArray.2.fromPort":"top0","linkDataArray.2.toPort":"bottom1","linkDataArray.3.from":"unit Four","linkDataArray.3.to":"unit Three","linkDataArray.3.fromPort":"right0","linkDataArray.3.toPort":"left0","linkDataArray.4.from":"unit Four","linkDataArray.4.to":"unit Three","linkDataArray.4.fromPort":"right1","linkDataArray.4.toPort":"left2","linkDataArray.5.from":"unit One","linkDataArray.5.to":"unit Two","linkDataArray.5.fromPort":"right0","linkDataArray.5.toPort":"left1","linkDataArray.6.from":"unit One","linkDataArray.6.to":"unit Two","linkDataArray.6.fromPort":"right1","linkDataArray.6.toPort":"left2"});	
//
sequenceObjList.push({"seq":"seq5","command.action":"add","wid":"mary_jane1","command.dtotype":"adddto","adddto.addfield.field":"age","adddto.addfield.oneditaction":"toGoJSAction"});

}

function seq2(){
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
//sequenceObjList.push({"seq":"seq2","command.action":"debugoff"});

// "wid":"widtest","metadata.method":"gojsobject","class":"go.GraphLinksModel",
// "linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort",
// "nodeDataArray.0.key":"unit One","nodeDataArray.0.loc":"101 204",
// "nodeDataArray.0.leftArray.0.portColor":"#425e5c","nodeDataArray.0.leftArray.0.portId":"left0",
// "nodeDataArray.0.topArray.0.portColor":"#d488a2","nodeDataArray.0.topArray.0.portId":"top0",
// "nodeDataArray.0.bottomArray.0.portColor":"#316571","nodeDataArray.0.bottomArray.0.portId":"bottom0",
// "nodeDataArray.0.rightArray.0.portColor":"#923951","nodeDataArray.0.rightArray.0.portId":"right0",
// "nodeDataArray.0.rightArray.1.portColor":"#ef3768","nodeDataArray.0.rightArray.1.portId":"right1",

// {"metadata.method":"gojsobject","wid":"widtest","class":"go.GraphLinksModel",
// "linkfromportidproperty":"fromPort","linktoportidproperty":"toPort",
// "nodedataarray.0.key":"unit One","nodedataarray.0.loc":"101 204",
// "nodedataarray.0.metadata.method":"nodedataarray","nodedataarray.0.wid":"1",
// "nodedataarray.0.leftarray.0.portcolor":"#425e5c","nodedataarray.0.leftarray.0.portid":"left0",
// "nodedataarray.0.leftarray.0.metadata.method":"leftarray","nodedataarray.0.leftarray.0.wid":"2",
// "nodedataarray.0.toparray.0.portcolor":"#d488a2","nodedataarray.0.toparray.0.portid":"top0",
// "nodedataarray.0.toparray.0.metadata.method":"toparray","nodedataarray.0.toparray.0.wid":"4",
// "nodedataarray.0.bottomarray.0.portcolor":"#316571","nodedataarray.0.bottomarray.0.portid":"bottom0",
// "nodedataarray.0.bottomarray.0.metadata.method":"bottomarray","nodedataarray.0.bottomarray.0.wid":"6",
// "nodedataarray.0.rightarray.0.portcolor":"#ef3768","nodedataarray.0.rightarray.0.portid":"right1",
// "nodedataarray.0.rightarray.0.metadata.method":"rightarray","nodedataarray.0.rightarray.0.wid":"10",
// "nodedataarray.0.rightarray.1.portcolor":"#923951","nodedataarray.0.rightarray.1.portid":"right0",
// "nodedataarray.0.rightarray.1.metadata.method":"rightarray","nodedataarray.0.rightarray.1.wid":"8",

// "wid":"widtest","metadata.method":"gojsobject","class":"go.GraphLinksModel",
// "linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort",
// "nodeDataArray.0.key":"unit One","nodeDataArray.0.loc":"101 204",
// "nodeDataArray.0.leftArray.0.portColor":"#425e5c","nodeDataArray.0.leftArray.0.portId":"left0",
// "nodeDataArray.0.topArray.0.portColor":"#d488a2","nodeDataArray.0.topArray.0.portId":"top0",
// "nodeDataArray.0.bottomArray.0.portColor":"#316571","nodeDataArray.0.bottomArray.0.portId":"bottom0",
// "nodeDataArray.0.rightArray.0.portColor":"#923951","nodeDataArray.0.rightArray.0.portId":"right0",
// "nodeDataArray.0.rightArray.1.portColor":"#ef3768","nodeDataArray.0.rightArray.1.portId":"right1",
// "nodeDataArray.1.key":"unit Two","nodeDataArray.1.loc":"320 152","nodeDataArray.1.leftArray.0.portColor":"#7d4bd6",
// "nodeDataArray.1.leftArray.0.portId":"left0","nodeDataArray.1.leftArray.1.portColor":"#cc585c",
// "nodeDataArray.1.leftArray.1.portId":"left1","nodeDataArray.1.leftArray.2.portColor":"#b1273a",
// "nodeDataArray.1.leftArray.2.portId":"left2","nodeDataArray.1.topArray.0.portColor":"#14abef",
// "nodeDataArray.1.topArray.0.portId":"top0","nodeDataArray.1.bottomArray.0.portColor":"#dd45c7",
// "nodeDataArray.1.bottomArray.0.portId":"bottom0","nodeDataArray.1.bottomArray.1.portColor":"#995aa6",
// "nodeDataArray.1.bottomArray.1.portId":"bottom1","nodeDataArray.1.bottomArray.2.portColor":"#6b95cb",
// "nodeDataArray.1.bottomArray.2.portId":"bottom2","nodeDataArray.2.key":"unit Three",
// "nodeDataArray.2.loc":"384 319","nodeDataArray.2.leftArray.0.portColor":"#bd8f27",
// "nodeDataArray.2.leftArray.0.portId":"left0","nodeDataArray.2.leftArray.1.portColor":"#c14617",
// "nodeDataArray.2.leftArray.1.portId":"left1","nodeDataArray.2.leftArray.2.portColor":"#47fa60",
// "nodeDataArray.2.leftArray.2.portId":"left2","nodeDataArray.2.topArray.0.portColor":"#d08154",
// "nodeDataArray.2.topArray.0.portId":"top0","nodeDataArray.2.bottomArray.0.portColor":"#6cafdb",
// "nodeDataArray.2.bottomArray.0.portId":"bottom0","nodeDataArray.3.key":"unit Four",
// "nodeDataArray.3.loc":"138 351","nodeDataArray.3.leftArray.0.portColor":"#491389",
// "nodeDataArray.3.leftArray.0.portId":"left0","nodeDataArray.3.topArray.0.portColor":"#77ac1e",
// "nodeDataArray.3.topArray.0.portId":"top0","nodeDataArray.3.bottomArray.0.portColor":"#e9701b",
// "nodeDataArray.3.bottomArray.0.portId":"bottom0","nodeDataArray.3.rightArray.0.portColor":"#24d05e",
// "nodeDataArray.3.rightArray.0.portId":"right0","nodeDataArray.3.rightArray.1.portColor":"#cfabaa",
// "nodeDataArray.3.rightArray.1.portId":"right1",
// "linkDataArray.0.from":"unit Four","linkDataArray.0.to":"unit One",
// "linkDataArray.0.fromPort":"top0","linkDataArray.0.toPort":"bottom0",
// "linkDataArray.1.from":"unit Four","linkDataArray.1.to":"unit Two",
// "linkDataArray.1.fromPort":"top0","linkDataArray.1.toPort":"bottom0",
// "linkDataArray.2.from":"unit Three","linkDataArray.2.to":"unit Two",
// "linkDataArray.2.fromPort":"top0","linkDataArray.2.toPort":"bottom1",
// "linkDataArray.3.from":"unit Four","linkDataArray.3.to":"unit Three",
// "linkDataArray.3.fromPort":"right0","linkDataArray.3.toPort":"left0",
// "linkDataArray.4.from":"unit Four","linkDataArray.4.to":"unit Three",
// "linkDataArray.4.fromPort":"right1","linkDataArray.4.toPort":"left2",
// "linkDataArray.5.from":"unit One","linkDataArray.5.to":"unit Two",
// "linkDataArray.5.fromPort":"right0","linkDataArray.5.toPort":"left1",
// "linkDataArray.6.from":"unit One","linkDataArray.6.to":"unit Two",
// "linkDataArray.6.fromPort":"right1","linkDataArray.6.toPort":"left2"});	

// {"metadata.method":"gojsobject","wid":"widtest","class":"go.GraphLinksModel",
// "linkfromportidproperty":"fromPort","linktoportidproperty":"toPort",
// "nodedataarray.0.key":"unit One","nodedataarray.0.loc":"101 204","nodedataarray.0.metadata.method":"nodedataarray",
// "nodedataarray.0.wid":"1","nodedataarray.0.leftarray.0.portcolor":"#425e5c","nodedataarray.0.leftarray.0.portid":"left0",
// "nodedataarray.0.leftarray.0.metadata.method":"leftarray","nodedataarray.0.leftarray.0.wid":"2",
// "nodedataarray.0.toparray.0.portcolor":"#d488a2","nodedataarray.0.toparray.0.portid":"top0",
// "nodedataarray.0.toparray.0.metadata.method":"toparray","nodedataarray.0.toparray.0.wid":"4",
// "nodedataarray.0.bottomarray.0.portcolor":"#316571","nodedataarray.0.bottomarray.0.portid":"bottom0",
// "nodedataarray.0.bottomarray.0.metadata.method":"bottomarray","nodedataarray.0.bottomarray.0.wid":"6",
// "nodedataarray.0.rightarray.0.portcolor":"#ef3768","nodedataarray.0.rightarray.0.portid":"right1",
// "nodedataarray.0.rightarray.0.metadata.method":"rightarray","nodedataarray.0.rightarray.0.wid":"10",
// "nodedataarray.0.rightarray.1.portcolor":"#923951","nodedataarray.0.rightarray.1.portid":"right0",
// "nodedataarray.0.rightarray.1.metadata.method":"rightarray","nodedataarray.0.rightarray.1.wid":"8",
// "nodedataarray.1.key":"unit Two","nodedataarray.1.loc":"320 152","nodedataarray.1.metadata.method":"nodedataarray",
// "nodedataarray.1.wid":"13","nodedataarray.1.leftarray.0.portcolor":"#7d4bd6","nodedataarray.1.leftarray.0.portid":"left0",
// "nodedataarray.1.leftarray.0.metadata.method":"leftarray","nodedataarray.1.leftarray.0.wid":"14",
// "nodedataarray.1.leftarray.1.portcolor":"#cc585c","nodedataarray.1.leftarray.1.portid":"left1",
// "nodedataarray.1.leftarray.1.metadata.method":"leftarray","nodedataarray.1.leftarray.1.wid":"16",
// "nodedataarray.1.leftarray.2.portcolor":"#b1273a","nodedataarray.1.leftarray.2.portid":"left2",
// "nodedataarray.1.leftarray.2.metadata.method":"leftarray","nodedataarray.1.leftarray.2.wid":"18",
// "nodedataarray.1.toparray.0.portcolor":"#14abef","nodedataarray.1.toparray.0.portid":"top0",
// "nodedataarray.1.toparray.0.metadata.method":"toparray","nodedataarray.1.toparray.0.wid":"20",
// "nodedataarray.1.bottomarray.0.portcolor":"#dd45c7","nodedataarray.1.bottomarray.0.portid":"bottom0",
// "nodedataarray.1.bottomarray.0.metadata.method":"bottomarray","nodedataarray.1.bottomarray.0.wid":"22",
// "nodedataarray.1.bottomarray.1.portcolor":"#995aa6","nodedataarray.1.bottomarray.1.portid":"bottom1",
// "nodedataarray.1.bottomarray.1.metadata.method":"bottomarray","nodedataarray.1.bottomarray.1.wid":"24",
// "nodedataarray.1.bottomarray.2.portcolor":"#6b95cb","nodedataarray.1.bottomarray.2.portid":"bottom2",
// "nodedataarray.1.bottomarray.2.metadata.method":"bottomarray","nodedataarray.1.bottomarray.2.wid":"26",
// "nodedataarray.2.key":"unit Three","nodedataarray.2.loc":"384 319","nodedataarray.2.metadata.method":"nodedataarray",
// "nodedataarray.2.wid":"29","nodedataarray.2.leftarray.0.portcolor":"#bd8f27",
// "nodedataarray.2.leftarray.0.portid":"left0","nodedataarray.2.leftarray.0.metadata.method":"leftarray",
// "nodedataarray.2.leftarray.0.wid":"30","nodedataarray.2.leftarray.1.portcolor":"#c14617",
// "nodedataarray.2.leftarray.1.portid":"left1","nodedataarray.2.leftarray.1.metadata.method":"leftarray",
// "nodedataarray.2.leftarray.1.wid":"32","nodedataarray.2.leftarray.2.portcolor":"#47fa60",
// "nodedataarray.2.leftarray.2.portid":"left2","nodedataarray.2.leftarray.2.metadata.method":"leftarray",
// "nodedataarray.2.leftarray.2.wid":"34","nodedataarray.2.toparray.0.portcolor":"#d08154",
// "nodedataarray.2.toparray.0.portid":"top0","nodedataarray.2.toparray.0.metadata.method":"toparray",
// "nodedataarray.2.toparray.0.wid":"36","nodedataarray.2.bottomarray.0.portcolor":"#6cafdb",
// "nodedataarray.2.bottomarray.0.portid":"bottom0","nodedataarray.2.bottomarray.0.metadata.method":"bottomarray",
// "nodedataarray.2.bottomarray.0.wid":"38","nodedataarray.3.key":"unit Four","nodedataarray.3.loc":"138 351",
// "nodedataarray.3.metadata.method":"nodedataarray","nodedataarray.3.wid":"41","nodedataarray.3.leftarray.0.portcolor":"#491389",
// "nodedataarray.3.leftarray.0.portid":"left0","nodedataarray.3.leftarray.0.metadata.method":"leftarray",
// "nodedataarray.3.leftarray.0.wid":"42","nodedataarray.3.toparray.0.portcolor":"#77ac1e","nodedataarray.3.toparray.0.portid":"top0",
// "nodedataarray.3.toparray.0.metadata.method":"toparray","nodedataarray.3.toparray.0.wid":"44",
// "nodedataarray.3.bottomarray.0.portcolor":"#e9701b","nodedataarray.3.bottomarray.0.portid":"bottom0",
// "nodedataarray.3.bottomarray.0.metadata.method":"bottomarray","nodedataarray.3.bottomarray.0.wid":"46",
// "nodedataarray.3.rightarray.0.portcolor":"#24d05e","nodedataarray.3.rightarray.0.portid":"right0",
// "nodedataarray.3.rightarray.0.metadata.method":"rightarray","nodedataarray.3.rightarray.0.wid":"48",
// "nodedataarray.3.rightarray.1.portcolor":"#cfabaa","nodedataarray.3.rightarray.1.portid":"right1",
// "nodedataarray.3.rightarray.1.metadata.method":"rightarray","nodedataarray.3.rightarray.1.wid":"50",
// "linkdataarray.0.from":"unit Four","linkdataarray.0.to":"unit One","linkdataarray.0.fromport":"top0",
// "linkdataarray.0.toport":"bottom0","linkdataarray.0.metadata.method":"linkdataarray","linkdataarray.0.wid":"53",
// "linkdataarray.1.from":"unit Four","linkdataarray.1.to":"unit Two","linkdataarray.1.fromport":"top0",
// "linkdataarray.1.toport":"bottom0","linkdataarray.1.metadata.method":"linkdataarray","linkdataarray.1.wid":"55",
// "linkdataarray.2.from":"unit Three","linkdataarray.2.to":"unit Two","linkdataarray.2.fromport":"top0",
// "linkdataarray.2.toport":"bottom1","linkdataarray.2.metadata.method":"linkdataarray","linkdataarray.2.wid":"57",
// "linkdataarray.3.from":"unit Four","linkdataarray.3.to":"unit Three","linkdataarray.3.fromport":"right0",
// "linkdataarray.3.toport":"left0","linkdataarray.3.metadata.method":"linkdataarray","linkdataarray.3.wid":"59",
// "linkdataarray.4.from":"unit Four","linkdataarray.4.to":"unit Three","linkdataarray.4.fromport":"right1",
// "linkdataarray.4.toport":"left2","linkdataarray.4.metadata.method":"linkdataarray","linkdataarray.4.wid":"61",
// "linkdataarray.5.from":"unit One","linkdataarray.5.to":"unit Two","linkdataarray.5.fromport":"right0",
// "linkdataarray.5.toport":"left1","linkdataarray.5.metadata.method":"linkdataarray","linkdataarray.5.wid":"63",
// "linkdataarray.6.from":"unit One","linkdataarray.6.to":"unit Two","linkdataarray.6.fromport":"right1",
// "linkdataarray.6.toport":"left2","linkdataarray.6.metadata.method":"linkdataarray","linkdataarray.6.wid":"65"}


//{"metadata.method":"gojsobject","wid":"gojsobject","class":"string","linkfromportidproperty":"string","linktoportidproperty":"string","nodedataarray":"onetomany","linkdataarray":"onetomany","nodedataarray.metadata.method":"nodedataarray","nodedataarray.wid":"nodedataarray","nodedataarray.key":"string","nodedataarray.loc":"string","nodedataarray.leftarray":"onetomany","nodedataarray.toparray":"onetomany","nodedataarray.bottomarray":"onetomany","nodedataarray.rightarray":"onetomany","nodedataarray.leftarray.metadata.method":"leftarray","nodedataarray.leftarray.wid":"leftarray","nodedataarray.leftarray.portcolor":"string","nodedataarray.leftarray.portid":"string","nodedataarray.toparray.metadata.method":"toparray","nodedataarray.toparray.wid":"toparray","nodedataarray.toparray.portcolor":"string","nodedataarray.toparray.portid":"string","nodedataarray.bottomarray.metadata.method":"bottomarray","nodedataarray.bottomarray.wid":"bottomarray","nodedataarray.bottomarray.portcolor":"string","nodedataarray.bottomarray.portid":"string","nodedataarray.rightarray.metadata.method":"rightarray","nodedataarray.rightarray.wid":"rightarray","nodedataarray.rightarray.portcolor":"string","nodedataarray.rightarray.portid":"string","linkdataarray.metadata.method":"linkdataarray","linkdataarray.wid":"linkdataarray","linkdataarray.from":"string","linkdataarray.to":"string","linkdataarray.fromport":"string","linkdataarray.toport":"string","LOG":"LOG"}
// undefined check


	testSequeceObjList(sequenceObjList, seqList);
}


function seq350(){
	var sequenceObjList=[];
	var seqList = ["seq350"];	

	// SEQ350 -- Create an author and books associated with the author.
	sequenceObjList.push({"seq":"seq350","command.action":"clear"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","booksdto1":"onetomany"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc.","metadata.method":"authordto1"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"mary_jane1","first":"BMary","last":"BSue","age":"3B0","booksdto1.name":"BPawn Of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc.","metadata.method":"authordto1"});

	sequenceObjList.push({"seq":"seq350","command.action":"add","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30","booksdto1.1.name":"CThe Shining","booksdto1.ISBN":"C33003333319","booksdto1.publisher":"CPenguin Inc.","metadata.method":"authordto1"});
	
	testSequeceObjList(sequenceObjList, seqList);
}

function seq351(){
	var sequenceObjList=[];
	var seqList = ["seq351"];	

	// SEQ351 -- inherittest
	sequenceObjList.push({"seq":"seq351","command.action":"clear"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"defaultforauthor","booksdto1.commission":"10"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"defaultforbook","commission":"20"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"authordto1","first":"string","last":"string","age":"string","metadata.method":"authordto1","defaultforauthor":"inherit","booksdto1":"onetomany"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"booksdto1","name":"string","ISBN":"string","publisher":"string","metadata.method":"booksdto1","defaultforbook":"inherit"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"rel1","primarywid":"authordto1","secondarywid":"booksdto1","relationshiptype":"attributes","metadata.method":"relationshipdto"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"mary_jane1","first":"AMary","last":"ASue","age":"A30","booksdto1.name":"ATime and Terror","booksdto1.ISBN":"A10001111419","booksdto1.publisher":"AMega Books Inc.","metadata.method":"authordto1"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"mary_jane1","first":"BMary","last":"BSue","age":"3B0","booksdto1.name":"BPawn Of Prophecy","booksdto1.ISBN":"B33003222219","booksdto1.publisher":"BTor Books Inc.","metadata.method":"authordto1"});
	sequenceObjList.push({"seq":"seq351","command.action":"add","wid":"mary_jane1","first":"CMary","last":"CSue","age":"C30","booksdto1.1.name":"CThe Shining","booksdto1.ISBN":"C33003333319","booksdto1.publisher":"CPenguin Inc.","metadata.method":"authordto1"});
	sequenceObjList.push({"seq":"seq351","command.action":"debugon"});
	sequenceObjList.push({"seq":"seq351","command.action":"get","wid":"mary_jane1"});
	sequenceObjList.push({"seq":"seq351","command.action":"debugoff"});

	testSequeceObjList(sequenceObjList, seqList);
}