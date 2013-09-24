var superagent = require('superagent')
,config = require('./config.js')
, dao = require('./dao/mongo.js')
, expect = require('expect.js');

var TABLE_NAME = config.TABLE_NAME;


// cleanup helper method
function cleanup(o1, callback){
  // remove the added entry
  dao.removeFromMongo(o1,TABLE_NAME,function(o){
    // callback after removing entry
    console.log('Cleanup done .... removed added entry. '+ JSON.stringify(o));
    callback();
  });
}

// Step 1
  // ExecuteThis core
  // -- ExecuteMultiple
  // -- DRI
  // -- Javascript
  // -- Variable
  // -- updateWid
  // -- getWid

// Step 2
  // ExecuteThis Environment
  // -- DisplayHTML
  // -- ExtractThis

// Step 3
  // ExecuteThis Environment
  // -- AppStarted
  // -- ExecuteStartEvent
  // ......


// Step 4
  // ExecuteThis Core
  // -- getWid(<executeThis>) :: use params to recurse to executeThis
  // ......



 
describe('Core Server calls :: ExecuteMultiple, DRI, JAVASCRIPT,Variable, UpdateWid, GetWid', function(){
  var id
  
  // increase timeout set -- default is 2000ms too low for this scenario
  this.timeout(50000);



//   ********
// UpdateWid(inboundParameters)
//  if inboundParameters.fromProperty exists then 
//    FromProperty=inboundParameters.FromProperty
//    inboundParameters = get(wid, fromProperty)
//  if inboundParameters.toProperty exists 
//    then toProperty=inboundParameters.toProperty , remove from inboundParameter
//    wid = inboundParameters.wid 
// if wid = "" then 
// wid = random
// createwid
// if inboundParameters.status = 5 then 
// delete wid
// else
// Save (wid,Toproperty) with inboundParameters // save wid to many properties or one
// // We could update remapTable (equivalent to watchWid) / We could update PendingRequestsToSeverWid
// Return ParametersToAdd.value['wid']


  // put request for ExecuteThis --- updateWid 
  // the request is for 'UpdateWid' , witha a preexecute and postExecute method each
  it('UpdateWid', function(done){

    var requestObj = {"addThis":"updateWidTestResult", "updateWid":"codyTestSms", "fromWid":"dateTimeWid", "fromProperty":"dateTime"}
    // [{"ExecuteThis":"updateWid","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello", "inboundParameters":{"fromProperty":"fromPropertyValue","status":4} }];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object')
        //expect(res.body.msg).to.eql('success')        
        done();
      });
  });

});
