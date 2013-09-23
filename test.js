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
    
    superagent.put('http://localhost:3000/executethis')
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
    
    superagent.put('http://localhost:3000/executethis')
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


    var o = [{"ExecuteThis":"getFromMongo","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    
    // remove the added entry
    dao.addToMongo(o,TABLE_NAME,function(o){
        superagent.put('http://localhost:3000/executethis')
          .send(o)
          .end(function(e, res){
            console.log('>>>>>>>>> '+JSON.stringify(res.body));
            expect(typeof res.body).to.eql('object')
            
            cleanup(res.body, function(){
              //expect(res.body.msg).to.eql('success')        
              done()
            });

          })
      })

      // callback after adding entry
      console.log('add test obeject before fetching.');
    });

  // the request is for 'GetMultipleFromMongo' , witha a preexecute and postExecute method each
  it('getmultiplefrommongo', function(done){
    var requestObj = [{"ExecuteThis":"getMultipleFromMongo","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
      superagent.put('http://localhost:3000/executethis')
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
    var requestObj = [{"ExecuteThis":"addtomongo","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    superagent.put('http://localhost:3000/executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('ADDTOMONGO >>>>>>>>> '+JSON.stringify(res.body));


        expect(typeof res.body).to.eql('object')
        //expect(res.body.msg).to.eql('success')        
        done();
    })
  })

  // the request is for 'Javascript' , with a preexecute and postExecute method each
  it('javascript', function(done){
    
    // add object to DB 
    var requestObj = [{"executeThis":"JavaScript", "beginInboundParameters":"wid1","y":"2",  "accesstoken":"111111111",  "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    
    dao.addToMongo(requestObj,TABLE_NAME,function(o){
      console.log("After adding to Mongo - "+ JSON.stringify(o));
    });
 
    superagent.put('http://localhost:3000/executethis')
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

    

  // the request is for 'the Default Case' , with a preexecute and postExecute method each
  it('none', function(done){

        // provide wid value for already saved object to second request as value for ExecuteThis
        var requestObj = [{"ExecuteThis":"savedObj","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
        
        dao.addToMongo(requestObj,TABLE_NAME,function(o){
            console.log("After adding to Mongo - "+ JSON.stringify(o));
        });
        
        superagent.put('http://localhost:3000/executethis')
          .send(requestObj)
          .end(function(e, res){
            console.log('DEFAULT CASE >>>>>>>>> '+JSON.stringify(res.body));
            expect(typeof res.body).to.eql('object')
    
            cleanup(res.body, function(){
              //expect(res.body.msg).to.eql('success')        
              done()
            });
          });
      
  });


 // the request is for 'GetFromMongo' , witha a preexecute and postExecute method each
  it('updatetomongo', function(done){


    var requestObj = [{"AddThis":"test12345","ExecuteThis":"updatewid","x":"y","z":"w"}];
    
    // remove the added entry
    dao.addToMongo(requestObj,TABLE_NAME,function(o1){
        
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



// TODO :: UPDATEWID in call extractthis
  it('updatewid', function(done){

    var requestObj = [{"ExecuteThis":"UpdateWid","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello","adddatawid":{"K":"L","M":"N"}}];
    
    superagent.put('http://localhost:3000/executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('UpdateWid  ::: UpdateWid ::: >>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object')
        //expect(res.body.msg).to.eql('success')        
        done()
      })
  });


// // TODO :: GETWID in call extractthis
  // it('getwid', function(done){

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


// // TODO :: EXECUTESERVER in call extractthis
  // it('executeserver', function(done){

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
