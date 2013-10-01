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
 
describe('DAO test layer', function(){
  
  // increase timeout set -- default is 2000ms too low for this scenario
  this.timeout(50000);

  // put request for CheckThis --- extractThis URL
  // the request is for 'ExtractThis' , with a pre-execute and postExecute method each
  it('extractthis', function(done){

    var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object');
        //expect(res.body.msg).to.eql('success')        
        done();
      });
  });

  // put request for ExecuteThis --- extractThis URL
  // the request is for 'ExtractThis' , WITHOUT a pre-execute and postExecute method
  it('extractthisnoprepost', function(done){

    var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w" }];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object');
        //expect(res.body.msg).to.eql('success')        
        done();
      });
  });

  // put request for ExecuteThis --- extractThis URL
  // the request is for 'ExtractThis' , WITHOUT a pre-execute but WITH a postExecute method
  it('extractthisonlypost', function(done){

    var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w","postExecute" : "sayPostHello" }];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object');
        //expect(res.body.msg).to.eql('success')        
        done();
      });
  });

  // put request for ExecuteThis --- extractThis URL
  // the request is for 'ExtractThis' , WITHOUT a post-execute but WITH a preExecute method
  it('extractthisonlypre', function(done){

    var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w","preExecute" : "sayPreHello" }];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object');
        //expect(res.body.msg).to.eql('success')        
        done();
      });
  });

 

  // the request is for 'AddThis' 
  it('addthis', function(done){


    var requestObj = [{"AddThis":"testwidname1","ExecuteThis":"updatewid","z":"w"}];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log(' ADDTHIS :: >>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object');
        // expect(typeof res.body.addThisJson).to.eql('object');
        //expect(res.body.msg).to.eql('success')        
        done();
      });
  });

  // the request is for 'GetFromMongo' , witha a preexecute and postExecute method each
  it('getfrommongo', function(done){


    var requestObj = [{"ExecuteThis":"getFromMongo","Wid":"test21","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    var entityToBeAdded = {"wid":"test21","data":{"x":"y","z":"w"}};
    // remove the added entry
    dao.addOrUpdate(entityToBeAdded,config.TABLE_NAME,function(entityToBeAdded){
        // callback after adding entry
        console.log(' ::: getfrommongo ::: add test obeject before fetching.');
        
        superagent.put(config.SERVICE_URL+'executethis')
          .send(requestObj)
          .end(function(e, res){
            console.log(' ::: getfrommongo ::: >>>>>>>>> '+JSON.stringify(res.body));
            expect(typeof res.body).to.eql('object');
            
            cleanup(entityToBeAdded, function(){
              //expect(res.body.msg).to.eql('success')        
              done();
            });

          });
      });

    });

  // the request is for 'GetMultipleFromMongo' , witha a preexecute and postExecute method each
  it('getmultiplefrommongo', function(done){
    var requestObj = [{"ExecuteThis":"getMultipleFromMongo","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
      superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object');
        // expect(res.length).to.gt(0);
        done();
      });
  });

  // the request is for 'AddToMongo' , with a preexecute and postExecute method each
  it('addtomongo', function(done){
    var requestObj = [{"ExecuteThis":"addtomongo","Wid":"test1", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('ADDTOMONGO >>>>>>>>> '+JSON.stringify(res.body));


        expect(typeof res.body).to.eql('object');
        //expect(res.body.msg).to.eql('success')        
        done();
    });
  });


     //  updateWid :: update wid is save to mongo, but check to make sure record does not exist alread

 
  // the request is for 'Javascript' , with a preexecute and postExecute method each
  it('javascript', function(done){
    
    // add object to DB 
    var requestObj = [{"executeThis":"JavaScript", "beginInboundParameters":"wid1","x":"2",  "accesstoken":"111111111",  "preExecute" : "sayPreHello","postExecute" : "sayPostHello" , "JS": "function (x, y){ return x + y; }"}];
    
    var addFirstObj = {"wid":"test21","data":{"x":"y","z":"w"}};

    dao.addOrUpdate(addFirstObj,config.TABLE_NAME,function(o){
      console.log("After adding to Mongo - "+ JSON.stringify(o));

        superagent.put(config.SERVICE_URL+'executethis')
          .send(requestObj)
            .end(function(e, res){
              console.log('JAVASCRIPT >>>>>>>>>  '+JSON.stringify(res.body));
              expect(typeof res.body).to.eql('object');
              
              cleanup(addFirstObj, function(){
                  //expect(res.body.msg).to.eql('success')        
                  done();
                });
            });

        });  

    });
 
    
    

  // the request is for 'the Default Case' , with a preexecute and postExecute method each
  it('none', function(done){

        // provide wid value for already saved object to second request as value for ExecuteThis
        var requestObj = [{"ExecuteThis":"savedObj","Wid":"test12345","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
        var addFirstObj = {"wid":"test12345","data":{"x":"y","z":"w"}};
        
        dao.addOrUpdate(addFirstObj,TABLE_NAME,function(o){
            console.log("After adding to Mongo - "+ JSON.stringify(o));

              superagent.put(config.SERVICE_URL+'executethis')
              .send(requestObj)
              .end(function(e, res){
                console.log('DEFAULT CASE >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object');
        
                cleanup(addFirstObj, function(){
                  //expect(res.body.msg).to.eql('success')        
                  done();
                });
              });

        });
        
        
      
  });


 // the request is for 'GetFromMongo' , witha a preexecute and postExecute method each
  it('updatetomongo', function(done){


    var requestObj = {"wid":"test12345","data":{"x":"y","z":"w"}};
    
    // remove the added entry
    dao.addOrUpdate(requestObj,TABLE_NAME,function(o1){
        
          console.log('Added new entry >>>>>>>>> '+JSON.stringify(o1));
          expect(typeof o1).to.eql('object');
         
          dao.updateToMongo({"AddThis":"test12345"},TABLE_NAME,{"AddThis":"test12345","ExecuteThis":"ExtractServer","l":"m","n":"o"},function(o2){
        
            console.log('Updated old entry >>>>>>>>> '+JSON.stringify(o1));
            expect(typeof o1).to.eql('object');
            done();
            
          });

      });
  });

  // the request is for 'updatewid' , witha a preexecute and postExecute method each
  it('updatewid', function(done){


    var o = {"wid":"joetestwid","data":{"x":"y","z":"w"}};
    
//    var requestObj = [{"ExecuteThis":"UpdateWid","Wid":"test1","x2":"y2","z2":"w2", "preExecute" : "sayPreHello","postExecute" : "sayPostHello"}];

    var requestObj = [{ "ExecuteThis":"UpdateWid", "Wid":"joetestwid","datetime":"1380107614854", "FromProperty":"FromPropertyVal", "ToProperty":"ToPropertyVal"}];
      // remove the added entry
      dao.addOrUpdate(o,config.TABLE_NAME,function(o){
          superagent.put(config.SERVICE_URL+'executethis')
            .send(requestObj)
              .end(function(e, res){
                console.log(' ::: updatewid ::: >>>>>>>>> '+JSON.stringify(res.body));
                	expect(typeof res.body).to.eql('object');
                	expect(typeof res.body._id).to.eql('string');
                	expect(typeof res.body.wid).to.eql('string');
                	expect(typeof res.body.data).to.eql('object');
                	
                  cleanup(o, function(){
                    //expect(res.body.msg).to.eql('success')        
                    done();
                });
            });
        });

    });

  // the request is for 'updatewid' with status 5 , witha a preexecute and postExecute method each
  it('updatewiddelete', function(done){


    var o = {"wid":"joetestwid","data":{"x":"y","z":"w"}};
    var requestObj = [{ "executethis":"updatewid", "status":"5", "Wid":"joetestwid","datetime":"1380107614854", "FromProperty":"FromPropertyVal", "ToProperty":"ToPropertyVal"}]
      // remove the added entry
      dao.addOrUpdate(o,config.TABLE_NAME,function(o){
          superagent.put(config.SERVICE_URL+'executethis')
            .send(requestObj)
              .end(function(e, res){
                console.log(' ::: updatewid ::: >>>>>>>>> '+JSON.stringify(res.body));
                  expect(typeof res.body).to.eql('object');
                  done();
            });
        });

    });

  // the request is for 'getwid' , witha a preexecute and postExecute method each
  it('getwid', function(done){


    var o = {"wid":"test1","data":{"x":"y","z":"w"}};
    
    var requestObj = [{"ExecuteThis":"GetWid","FromWid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello"}];

      // remove the added entry
      dao.addOrUpdate(o,config.TABLE_NAME,function(o){
          superagent.put(config.SERVICE_URL+'executethis')
            .send(requestObj)
              .end(function(e, res){
                console.log(' ::: GetWid ::: >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object');
            	expect(typeof res.body._id).to.eql('string');
            	expect(typeof res.body.wid).to.eql('string');
            	expect(typeof res.body.data).to.eql('object');
              
                cleanup(o, function(){
                    //expect(res.body.msg).to.eql('success')        
                    done();
                  });
            });
        });

    });


  // the request is for 'getwid' , witha a preexecute and postExecute method each
  it('getwidwithproperty', function(done){


    var o = {"wid":"test1","data":{"x":"y","z":"w"}};
    
    var requestObj = [{"ExecuteThis":"GetWid","FromWid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello", "FromProperty":"x"}];

      // remove the added entry
      dao.addOrUpdate(o,config.TABLE_NAME,function(o){
          superagent.put(config.SERVICE_URL+'executethis')
            .send(requestObj)
              .end(function(e, res){
                console.log(' ::: GetWid ::: >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body.x).to.eql('string');
              
                cleanup(o, function(){
                    //expect(res.body.msg).to.eql('success')        
                    done();
                  });
            });
        });

    });

  // the request is for 'getwid' , witha a preexecute and postExecute method each, the preexecute callas executethis recursively
  it('getwidwithdata', function(done){

    var o1 = {"wid":"abc","data":{"abc1":"abc1Val","abc2":"abc2Val"}};
    var o2 = {"wid":"test1","data":{"test11":"test11Val","test12":"test12Val"}};
    
    var requestObj = [{"ExecuteThis":"GetWid","FromWid":"test1","key1":"val1","key2":"val2", "preExecute":{"ExecuteThis":"GetWid","FromWid":"abc"},"postExecute" : "sayPostHello"}];

      // remove the added entry
      dao.addOrUpdate(o1,config.TABLE_NAME,function(o){

        dao.addOrUpdate(o2,config.TABLE_NAME,function(o){

          superagent.put(config.SERVICE_URL+'executethis')
            .send(requestObj)
              .end(function(e, res){
                console.log(' ::: GetWid ::: >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object');
                expect(typeof res.body._id).to.eql('string');
                expect(typeof res.body.wid).to.eql('string');
                expect(typeof res.body.data).to.eql('object');
                
                  cleanup(o1, function(){
                    cleanup(o2, function(){
                    //expect(res.body.msg).to.eql('success')        
                    done();
                    });
                  });
            });
        });
      });
    });




// // TODO :: EXECUTEMULTIPLE in call extractthis
  // it('executemultiple', function(done){

  //   var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello","adddatawid":{"K":"L","M":"N"}}];
    
  //   superagent.put('http://localhost:3000/executethis')
  //     .send(requestObj)
  //     .end(function(e, res){
  //       console.log('ADDDATAWID  ::: extractthis ::: >>>>>>>>> '+JSON.stringify(res.body));
  //       expect(typeof res.body).to.eql('object')
  //       //expect(res.body.msg).to.eql('success')        
  //       done()
  //     })
  // });



// // TODO :: VARIABLE in call extractthis
  // it('variable', function(done){

  //   var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello","adddatawid":{"K":"L","M":"N"}}];
    
  //   superagent.put('http://localhost:3000/executethis')
  //     .send(requestObj)
  //     .end(function(e, res){
  //       console.log('ADDDATAWID  ::: extractthis ::: >>>>>>>>> '+JSON.stringify(res.body));
  //       expect(typeof res.body).to.eql('object')
  //       //expect(res.body.msg).to.eql('success')        
  //       done()
  //     })
  // });



// // TODO :: EVENT in call extractthis
  // it('event', function(done){

  //   var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello","adddatawid":{"K":"L","M":"N"}}];
    
  //   superagent.put('http://localhost:3000/executethis')
  //     .send(requestObj)
  //     .end(function(e, res){
  //       console.log('ADDDATAWID  ::: extractthis ::: >>>>>>>>> '+JSON.stringify(res.body));
  //       expect(typeof res.body).to.eql('object')
  //       //expect(res.body.msg).to.eql('success')        
  //       done()
  //     })
  // });
      
 
});
