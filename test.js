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
  var id
  
  // increase timeout set -- default is 2000ms too low for this scenario
  this.timeout(50000);

  // put request for CheckThis --- extractThis URL
  // the request is for 'ExtractThis' , witha a preexecute and postExecute method each
  it('extractthis', function(done){

    var requestObj = [{"ExecuteThis":"ExtractThis","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object')
        //expect(res.body.msg).to.eql('success')        
        done()
      })
  })

 

  // the request is for 'AddThis' 
  it('addthis', function(done){


    var requestObj = [{"AddThis":"testwidname1","ExecuteThis":"updatewid","z":"w"}];
    
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log(' ADDTHIS :: >>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object')
        expect(typeof res.body.addThisJson).to.eql('object')
        //expect(res.body.msg).to.eql('success')        
        done()
      })
  })

  // the request is for 'GetFromMongo' , witha a preexecute and postExecute method each
  it('getfrommongo', function(done){


    var requestObj = [{"ExecuteThis":"getFromMongo","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    var entityToBeAdded = {"wid":{"test21":{"x":"y","z":"w"}}};
    // remove the added entry
    dao.addOrUpdate(entityToBeAdded,config.TABLE_NAME,function(entityToBeAdded){
        // callback after adding entry
        console.log(' ::: getfrommongo ::: add test obeject before fetching.');
        
        superagent.put(config.SERVICE_URL+'executethis')
          .send(requestObj)
          .end(function(e, res){
            console.log(' ::: getfrommongo ::: >>>>>>>>> '+JSON.stringify(res.body));
            expect(typeof res.body).to.eql('object')
            
            cleanup(res.body, function(){
              //expect(res.body.msg).to.eql('success')        
              done()
            });

          })
      })

    });

  // the request is for 'GetMultipleFromMongo' , witha a preexecute and postExecute method each
  it('getmultiplefrommongo', function(done){
    var requestObj = [{"ExecuteThis":"getMultipleFromMongo","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
      superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object')
        // expect(res.length).to.gt(0);
        done()
      })
  })

  // the request is for 'AddToMongo' , with a preexecute and postExecute method each
  it('addtomongo', function(done){
    var requestObj = [{"ExecuteThis":"addtomongo","Wid":{"test1":{"x":"y","z":"w"}}, "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    superagent.put(config.SERVICE_URL+'executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('ADDTOMONGO >>>>>>>>> '+JSON.stringify(res.body));


        expect(typeof res.body).to.eql('object')
        //expect(res.body.msg).to.eql('success')        
        done();
    })
  })


     //  updateWid :: update wid is save to mongo, but check to make sure record does not exist alread

 
  // the request is for 'Javascript' , with a preexecute and postExecute method each
  it('javascript', function(done){
    
    // add object to DB 
    var requestObj = [{"executeThis":"JavaScript", "beginInboundParameters":"wid1","x":"2",  "accesstoken":"111111111",  "preExecute" : "sayPreHello","postExecute" : "sayPostHello" , "JS": "function (x, y){ return x + y; }"}];
    
    var addFirstObj = {"wid":{"test21":{"x":"y","z":"w"}}};

    dao.addOrUpdate(addFirstObj,config.TABLE_NAME,function(o){
      console.log("After adding to Mongo - "+ JSON.stringify(o));

        superagent.put(config.SERVICE_URL+'executethis')
          .send(requestObj)
            .end(function(e, res){
              console.log('JAVASCRIPT >>>>>>>>>  '+JSON.stringify(res.body));
              expect(typeof res.body).to.eql('object')
              
              cleanup(res.body, function(){
                  //expect(res.body.msg).to.eql('success')        
                  done()
                });
            });

        });  

    });
 
    
    

  // the request is for 'the Default Case' , with a preexecute and postExecute method each
  it('none', function(done){

        // provide wid value for already saved object to second request as value for ExecuteThis
        var requestObj = [{"ExecuteThis":"savedObj","Wid":"test12345","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
        var addFirstObj = {"wid":{"test12345":{"x":"y","z":"w"}}};
        
        dao.addOrUpdate(addFirstObj,TABLE_NAME,function(o){
            console.log("After adding to Mongo - "+ JSON.stringify(o));

              superagent.put(config.SERVICE_URL+'executethis')
              .send(requestObj)
              .end(function(e, res){
                console.log('DEFAULT CASE >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object');
        
                cleanup(res.body, function(){
                  //expect(res.body.msg).to.eql('success')        
                  done();
                });
              });

        });
        
        
      
  });


 // the request is for 'GetFromMongo' , witha a preexecute and postExecute method each
  it('updatetomongo', function(done){


    var requestObj = {"wid":{"test12345":{"x":"y","z":"w"}}};
    
    // remove the added entry
    dao.addOrUpdate(requestObj,TABLE_NAME,function(o1){
        
          console.log('Added new entry >>>>>>>>> '+JSON.stringify(o1));
          expect(typeof o1).to.eql('object');
         
          dao.updateToMongo({"AddThis":"test12345"},TABLE_NAME,{"AddThis":"test12345","ExecuteThis":"ExtractServer","l":"m","n":"o"},function(o2){
        
            console.log('Updated old entry >>>>>>>>> '+JSON.stringify(o1));
            expect(typeof o1).to.eql('object')
            done()
            
          });

      })
  })

 
 // // TODO :: ADDDATAWID in call extractthis
  // it('adddatawid1', function(done){

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


  // the request is for 'updatewid' , witha a preexecute and postExecute method each
  it('updatewid', function(done){


    var o = {"wid":{"test1":{"x":"y","z":"w"}}};
    
    var requestObj = [{"ExecuteThis":"UpdateWid","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello"}];

      // remove the added entry
      dao.addOrUpdate(o,config.TABLE_NAME,function(o){
          superagent.put(config.SERVICE_URL+'executethis')
            .send(requestObj)
              .end(function(e, res){
                console.log(' ::: updatewid ::: >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object')
              
                  cleanup(res.body, function(){
                    //expect(res.body.msg).to.eql('success')        
                    done()
                });
            });
        });

    });

  // the request is for 'getwid' , witha a preexecute and postExecute method each
  it('getwid', function(done){


    var o = {"wid":{"test1":{"x":"y","z":"w"}}};
    
    var requestObj = [{"ExecuteThis":"GetWid","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello"}];

      // remove the added entry
      dao.addOrUpdate(o,config.TABLE_NAME,function(o){
          superagent.put(config.SERVICE_URL+'executethis')
            .send(requestObj)
              .end(function(e, res){
                console.log(' ::: GetWid ::: >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object')
              
                  cleanup(res.body, function(){
                    //expect(res.body.msg).to.eql('success')        
                    done()
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
      
 
})
