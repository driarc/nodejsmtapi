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