var superagent = require('superagent')
, dao = require('./dao/mongo.js')
, expect = require('expect.js');
 
describe('express rest api server', function(){
  var id
 
  // // test filecheck call
  // it('retrieves scraping request', function(done){
  //   superagent.get('http://localhost:3000/filecheck')
  //     .end(function(e, res){
  //       console.log(res.body)
  //       expect(typeof res.body).to.eql('object')
  //       done()
  //     })
  // })

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
    var requestObj = [{"ExecuteThis":"getFromMongo","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
    superagent.put('http://localhost:3000/executethis')
      .send(requestObj)
      .end(function(e, res){
        console.log('>>>>>>>>> '+JSON.stringify(res.body));
        expect(typeof res.body).to.eql('object')
        //expect(res.body.msg).to.eql('success')        
        done()
      })
  })

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
        done()
      })
  })

  // the request is for 'Javascript' , with a preexecute and postExecute method each
  it('javascript', function(done){
    
    // add object to DB 
    var firstEntry = [{"executeThis":"addToMongo","x":"1","wid":"wid1","Js":"function (x, y){ return x + y; }","accesstoken":"111111111"}];
    
    dao.addToMongo(firstEntry,'colsam',function(o){
      console.log("After adding to Mongo - "+ JSON.stringify(o));

      var requestObj = [{"executeThis":"JavaScript", "beginInboundParameters":"wid1","y":"2",  "accesstoken":"111111111",  "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];

      superagent.put('http://localhost:3000/executethis')
        .send(requestObj)
        .end(function(e, res){
          console.log('JAVASCRIPT >>>>>>>>>  '+JSON.stringify(res.body));
          expect(typeof res.body).to.eql('object')
          //expect(res.body.msg).to.eql('success')
          done()
        })
    });
  });  

    

  // the request is for 'the Default Case' , with a preexecute and postExecute method each
  it('none', function(done){

        var firstEntry = {"ExecuteThis":"ExtractThis","Wid":"savedObj"};
            
        dao.addToMongo(firstEntry,'colsam',function(o){
            console.log("After adding to Mongo - "+ JSON.stringify(o));

            // provide wid value for already saved object to second request as value for ExecuteThis
            var requestObj = [{"ExecuteThis":"savedObj","Wid":"test1","x":"y","z":"w", "preExecute" : "sayPreHello","postExecute" : "sayPostHello" }];
            
            superagent.put('http://localhost:3000/executethis')
              .send(requestObj)
              .end(function(e, res){
                console.log('DEFAULT CASE >>>>>>>>> '+JSON.stringify(res.body));
                expect(typeof res.body).to.eql('object')
                //expect(res.body.msg).to.eql('success')        
                done()
              });
          });
        });

    
 
})