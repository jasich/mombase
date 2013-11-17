var request = require('supertest')
  , _ = require('lodash')
  , app = require('../../app.js')
  , mongoose = require('mongoose')
  , Mother = require('../../../lib/documents/mother')
  , assert = require('assert')
  , bootstrap = require('./bootstrap')
  , fixture = {firstName:'test', lastName: 'test', email: 'testing@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}}
  , childNoBaby = {firstName: "Jimbo", nickName: "Neckbone", lastName: "Jones", gender: true, birthDate: new Date("June 20, 1995"), receivingServices: true, specialNeeds: "Jimbo is hyper aggressive", commentsConcerns: "Jimbo calms down when given tea"}
  , childBaby = _.extend(childNoBaby, {baby:{dueDate: new Date("May 1, 2014"), deliveryType: "natural", birthWeight: 8, birthComplications: "none", measuredWeights: {recorded: new Date("May 1, 2014"), weight: 8}, bottleFeeding: false }})
  , visit = {moods: [{name: "Brian", mood: "Super happy"}], challenges: "Brian was almost too happy", volunteers: ["Becca", "Jennie"], startDate: new Date("November 16, 2013"), endDate: new Date("November 17, 2013")};

describe('POST /api/mothers', function() {

  var createdUser;
  var searchUserId;

  it('should create mother', function(done) {
    request(app)
      .post('/api/mothers')
      .set('Accept', 'application/json')
      .send({firstName:'test', lastName: 'test', email: 'test@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}})
      .expect(200)
      .end( function(err, res) {
      	if(err) return done(err);
      	createdUser = res.res.body;
      	assert.ok(res.res.body.firstName);
      	assert.ok(res.res.body.lastName);      	
      	done();
      });
  });

  it('should not create duplicate mother', function(done) {
    var mother = new Mother({firstName:'test', lastName: 'test', email: 'test@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}});
    mother.save(function(err) {
      if (err) throw err;
      request(app)
        .post('/api/mothers')
        .set('Accept', 'application/json')
        .send({firstName:'test', lastName: 'test', email: 'test@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}})
        .expect(500, done);
    })
  });


  it('should search for mothers', function(done) {
    var mother = new Mother({firstName:'test', lastName: 'test', email: 'test@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}});
    mother.save(function(err) {
      if (err) throw err;
      request(app)
        .post('/api/mothers')
        .set('Accept', 'application/json')
        .send({firstName:'search', lastName: 'user', email: 'search@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}})
        .expect(200)
        .end( function(err, res) {
          if(err) return done(err);
          searchUserId = res.res.body._id;
          assert.ok(res.res.body.firstName);
          assert.ok(res.res.body.lastName);
          request(app)
            .post('/api/mothers/search')
            .set('Accept', 'application/json')
            .send({})
            .expect(200)
            .end( function(err, res) {
              if(err) return done(err);
              assert( res.body.length == 2 );
              assert( res.body[0].firstName == 'test' );
              assert( res.body[1].firstName == 'search' );
              done();
            });
        });
    });
  });


  it('should search for mothers with sorting', function(done) {
    var mother = new Mother({firstName:'test', lastName: 'test', email: 'test@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}});
    mother.save(function(err) {
      if (err) throw err;
      var mother2 = new Mother({firstName:'search', lastName: 'user', email: 'search@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}});
      mother2.save(function(err) {
        if (err) throw err;
        request(app)
          .post('/api/mothers/search')
          .set('Accept', 'application/json')
          .send({'sort.firstName':'1'})
          .expect(200)
          .end( function(err, res) {
            if(err) return done(err);
            assert( res.body.length == 2 );
            assert( res.body[0].firstName == 'search' );
            assert( res.body[1].firstName == 'test' );
            done();
          });
      });
    });
  });

  it('should delete a mother', function( done ) {
    var mother = new Mother({firstName:'test', lastName: 'test', email: 'test@email.com', emergencyContact: { firstName: 'bill', lastName: 'clinton'}});
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .del('/api/mothers/' + m.id)
        .set('Accept', 'application/json')
        .expect(200)
        .end( function(err, res) {
          if(err) return done(err);
          done();
        });
    })
  });

  it('should update a mother', function( done ) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      m.firstName = 'somethingtotallynew';
      request(app)
        .put('/api/mothers')
        .set('Accept', 'application/json')
        .send(createdUser)
        .expect(200)
        .end( function(err, res) {
          if(err) return done(err);
          done();
        });
    })
  });
});

describe("POST /api/mothers/:id/children", function(){

  it("should add a child to a mother document", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .post('/api/mothers/' + m.id + '/children')
        .set('Accept', 'application/json')
        .send(childNoBaby)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert(res.body.children.length > 0);
          done();
        });
    });
  });

  it("should add a child that has baby data", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .post('/api/mothers/' + m.id + '/children')
        .set('Accept', 'application/json')
        .send(childBaby)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var child = res.body.children[0];
          assert(child.baby)
          done();
        });
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .post('/api/mothers/' + mongoose.Types.ObjectId() + '/children')
      .set('Accept', 'application/json')
      .send(childNoBaby)
      .expect(404, done);
  });

});

describe("PUT /api/mothers/:id/children/:cid", function() {
  it("should update the child and return the mother", function(done) {
    var mother = new Mother(fixture);
    mother.children.push(childNoBaby);
    mother.save(function(err, m) {
      if (err) throw err;
      var child = m.children[0];
      request(app)
        .put('/api/mothers/' + m.id + '/children/' + child.id)
        .set('Accept', 'application/json')
        .send({firstName:'Jumbo'})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var child = res.body.children[0];
          assert.equal('Jumbo', child.firstName);
          done();
        });
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .put('/api/mothers/' + mongoose.Types.ObjectId() + '/children/' + mongoose.Types.ObjectId())
      .set('Accept', 'application/json')
      .send(childNoBaby)
      .expect(404, done);
  });

  it("should return a 404 if the child is not found", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .put('/api/mothers/' + m.id + '/children/' + mongoose.Types.ObjectId())
        .set('Accept', 'application/json')
        .send({firstName:'Jumbo'})
        .expect(404, done);
    });
  });
});

describe("DELETE /api/mothers/:id/children/:cid", function() {
  it("should delete the child and return the mother", function(done) {
    var mother = new Mother(fixture);
    mother.children.push(childNoBaby);
    mother.save(function(err, m) {
      if (err) throw err;
      var child = m.children[0];
      request(app)
        .del('/api/mothers/' + m.id + '/children/' + child.id)
        .expect(204, done);
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .del('/api/mothers/' + mongoose.Types.ObjectId() + '/children/' + mongoose.Types.ObjectId())
      .expect(404, done);
  });

  it("should return a 404 if the child is not found", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .del('/api/mothers/' + m.id + '/children/' + mongoose.Types.ObjectId())
        .expect(404, done);
    });
  });
});

describe("GET /api/mothers/:id/children/:cid", function() {
  it("should return a child by id", function(done) {
    var mother = new Mother(fixture);
    mother.children.push(childNoBaby);
    mother.save(function(err, m) {
      if (err) throw err;
      var child = m.children[0];
      request(app)
        .get('/api/mothers/' + m.id + '/children/' + child.id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var child = res.body;
          assert.equal('Jimbo', child.firstName);
          done();
        });
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .get('/api/mothers/' + mongoose.Types.ObjectId() + '/children/' + mongoose.Types.ObjectId())
      .expect(404, done);
  });

  it("should return a 404 if the child is not found", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .get('/api/mothers/' + m.id + '/children/' + mongoose.Types.ObjectId())
        .expect(404, done);
    });
  });
});

//visits
describe("POST /api/mothers/:id/visits", function(){

  it("should add a visit to a mother document", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .post('/api/mothers/' + m.id + '/visits')
        .set('Accept', 'application/json')
        .send(visit)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert(res.body.visits.length > 0);
          done();
        });
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .post('/api/mothers/' + mongoose.Types.ObjectId() + '/visits')
      .set('Accept', 'application/json')
      .send(visit)
      .expect(404, done);
  });

});

describe("PUT /api/mothers/:id/visits/:vid", function() {
  it("should update the visit and return the mother", function(done) {
    var mother = new Mother(fixture);
    mother.visits.push(visit);
    mother.save(function(err, m) {
      if (err) throw err;
      var visit = m.visits[0];
      request(app)
        .put('/api/mothers/' + m.id + '/visits/' + visit.id)
        .set('Accept', 'application/json')
        .send({challenges:'There were no challenges'})
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          var visit = res.body.visits[0];
          assert.equal('There were no challenges', visit.challenges);
          done();
        });
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .put('/api/mothers/' + mongoose.Types.ObjectId() + '/visits/' + mongoose.Types.ObjectId())
      .set('Accept', 'application/json')
      .send(visit)
      .expect(404, done);
  });

  it("should return a 404 if the visit is not found", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .put('/api/mothers/' + m.id + '/visits/' + mongoose.Types.ObjectId())
        .set('Accept', 'application/json')
        .send({challenges:'things'})
        .expect(404, done);
    });
  });
});

describe("DELETE /api/mothers/:id/visits/:vid", function() {
  it("should delete the visit and return the mother", function(done) {
    var mother = new Mother(fixture);
    mother.visits.push(visit);
    mother.save(function(err, m) {
      if (err) throw err;
      var visit = m.visits[0];
      request(app)
        .del('/api/mothers/' + m.id + '/visits/' + visit.id)
        .expect(204, done);
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .del('/api/mothers/' + mongoose.Types.ObjectId() + '/visits/' + mongoose.Types.ObjectId())
      .expect(404, done);
  });

  it("should return a 404 if the visit not found", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .del('/api/mothers/' + m.id + '/visits/' + mongoose.Types.ObjectId())
        .expect(404, done);
    });
  });
});

describe("GET /api/mothers/:id/visits/:vid", function() {
  it("should return a child by id", function(done) {
    var mother = new Mother(fixture);
    mother.visits.push(visit);
    mother.save(function(err, m) {
      if (err) throw err;
      var visit = m.visits[0];
      request(app)
        .get('/api/mothers/' + m.id + '/visits/' + visit.id)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          assert.equal(visit.challenges, res.body.challenges);
          done();
        });
    });
  });

  it ("should return a 404 if the mother is not found", function(done) {
    request(app)
      .get('/api/mothers/' + mongoose.Types.ObjectId() + '/visits/' + mongoose.Types.ObjectId())
      .expect(404, done);
  });

  it("should return a 404 if the visit is not found", function(done) {
    var mother = new Mother(fixture);
    mother.save(function(err, m) {
      if (err) throw err;
      request(app)
        .get('/api/mothers/' + m.id + '/visits/' + mongoose.Types.ObjectId())
        .expect(404, done);
    });
  });
});