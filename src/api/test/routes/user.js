var request = require('supertest')
  , app = require('../../app.js')
  , mongoose = require('mongoose')
  , User = require('../../../lib/documents/user')
  , assert = require('assert')
  , bootsrap = require('./bootstrap');

describe('POST /api/users/login', function() {

  it('should respond with 401 if not authorized', function(done) {
    request(app)
      .post('/api/users/login')
      .set('Accept', 'application/json')
      .expect(401, done);
  });

  it('should respond with 200 and user if authorized', function(done) {
    var user = new User({first:'Test', last:'User', email:'test@email.com', password:'test'});
    user.save(function(err) {
      if (err) throw err;
      request(app)
        .post('/api/users/login')
        .set('Accept', 'application/json')
        .send({username:'test@email.com', password:'test'})
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.ok(res.res.body.first);
          assert.ok(res.res.body.last);
          assert.ok(!res.res.body.hash);
          done();
        });
    });
  });
});

describe('POST /api/users', function() {

  it('should create a user with a 200 ok and returns it', function(done) {
    request(app)
      .post('/api/users')
      .set('Accept', 'application/json')
      .send({email: 'created@email.com', first: 'brian', last: 'scaturro', password:'password'})
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        var user = res.res.body;
        assert.ok(user.first);
        assert.ok(user.last);
        assert.ok(user._id);
        assert(!user.hash)
        done();
      });
  });

});

describe('GET /api/users', function() {

  it('should return a list of current users', function(done) {
    var user = new User({first:'Testguy', last:'McMan', password:'password', email:'superunique@email.com'});
    user.save(function(err) {
      if (err) throw err;
      request(app)
        .get('/api/users')
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var users = res.res.body;
          assert.ok(users.length);
          done();
        });
    })
  });

});

describe('DELETE /api/users', function() {

  it('should delete a user and respond with 204', function(done) {
    var user = new User({first:'Testguy', last:'McMan', password:'password', email:'superunique@email.com'});
    user.save(function(err, u) {
      if (err) throw err;
      request(app)
        .del('/api/users/' + u.id)
        .expect(204, done)
    })
  });

});


describe('GET /api/users/:id', function() {

  it('should return a single user by id', function(done) {
    var user = new User({first:'Testguy', last:'McMan', password:'password', email:'superunique@email.com'});
    user.save(function(err, u) {
      if (err) throw err;
      request(app)
        .get('/api/users/' + u.id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var user = res.res.body;
          assert.ok(user._id);
          done();
        });
    })
  });

});

describe('PUT /api/users/:id', function() {

  it('should update and return a single user by id', function(done) {
    var user = new User({first:'Testguy', last:'McMan', password:'password', email:'superunique@email.com'});
    user.save(function(err, u) {
      if (err) throw err;
      request(app)
        .put('/api/users/' + u.id)
        .send({first:'Testierguy'})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var user = res.res.body;
          assert.equal('Testierguy', user.first)
          done();
        });
    })
  });

});


describe('PUT /api/users/:id/password', function() {

  it('should change password for user', function(done) {
    var user = new User({first:'Testguy', last:'McMan', password:'password', email:'superunique@email.com'});
    user.save(function(err, u) {
      if (err) throw err;
      request(app)
        .put('/api/users/' + u.id + '/password')
        .send({currentPassword: 'password', password: 'strongerPassword', confirmPassword: 'strongerPassword'})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.ok(res.res.body.success);
          done();
        });
    })
  });

});
