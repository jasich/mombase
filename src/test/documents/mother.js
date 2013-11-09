var assert = require("assert")
  , mongoose = require('mongoose')
  , Mother = require('../../lib/documents/mother');

describe('Mother', function(){

  before(function() {
    mongoose.connect('mongodb://localhost/momtest');
    Mother.collection.drop();
  });

  describe('#save()', function(){
    it('should save without error', function(done) {
      var mother = new Mother({firstName:'Brian', lastName:'Scaturro', email:'brian@email.com', emergencyContact: { lastName: 'Mother', firstName: 'Brians'}});
      mother.save(function(err) {
        if (err) throw err;
        done();
      });
    });
  });

  after(function(){
    mongoose.disconnect();
  });

});