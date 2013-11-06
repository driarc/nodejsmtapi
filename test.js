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


  // the request is for 'GetFromMongo' , witha a preexecute and postExecute method each
  it('process100', function(done){


    var requestObj = {"executethis":"process100"};
        superagent.put(config.SERVICE_URL+'executethis')
          .send(requestObj)
          .end(function(e, res){
            console.log(' ::: process100 ::: >>>>>>>>> '+JSON.stringify(res.body));
            expect(typeof res.body).to.eql('object');
            done();
            
          });
      });


 // the request is for 'GetFromMongo' , witha a preexecute and postExecute method each
  it('test99', function(done){


    var requestObj = {"executethis":"test99"};
        superagent.put(config.SERVICE_URL+'executethis')
          .send(requestObj)
          .end(function(e, res){
            console.log(' ::: test99 ::: >>>>>>>>> '+JSON.stringify(res.body));
            expect(typeof res.body).to.eql('object');
            done();
            
          });
      });

});
