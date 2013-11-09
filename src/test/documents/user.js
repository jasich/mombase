var assert = require("assert")
  , mongoose = require('mongoose')
  , User = require('../../lib/documents/user');

mongoose.connect('mongodb://localhost/momtest');

describe('User', function(){

  before(function() {
    User.collection.drop();
    var user = new User({first:'Test', last:'User', email:'test@email.com', password:'test'});
    user.save();
  });

  describe('#save()', function(){
    it('should save without error', function(done) {
      var user = new User({first:'Brian', last:'Scaturro', email:'brian@email.com', password:'mypass'});
      user.save(function(err) {
        if (err) throw err;
        done();
      });
    });

    it('should save a hashed password', function(done) {
      var user = User.findOne({email:'brian@email.com'}, function(err, u) {
        if (err) throw err;
        assert.ok(u.hash);
        done();
      });
    });
  });

  describe('#comparePassword()', function() {
    it('should give positive isMatch if passwords match', function(done) {
      var user = User.findOne({email:'test@email.com'}, function(err, u) {
        if (err) throw err;
        u.comparePassword('test', function(err, isMatch) {
          if (err) throw err;
          assert.ok(isMatch);
          done();
        });      
      });
    });

    it('should throw err if passwords match', function(done) {
      var user = User.findOne({email:'test@email.com'}, function(err, u) {
        if (err) throw err;
        u.comparePassword('wrong', function(err, isMatch) {
          assert.ifError(err);
          done();
        });      
      });
    });
  });
});