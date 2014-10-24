var Mother = require('../../lib/documents/mother');

var MotherService = function() {

};

var that = null;

MotherService.prototype = {
  all: function( filter, sort, offset, take, cb ) {
    var _offset = 0; if ( offset ) _offset = offset;
    var _take = 10; if ( take ) _take = take;
    var _filter = { }; if ( filter ) _filter = filter;
    var _sort = { }; if ( sort ) _sort = sort;

    Mother.find( _filter, null, { skip: _offset, limit: _take, sort: _sort }, cb );
  },
  save: function( data, cb ) {
    var mother = new Mother( data );

    Mother.findOne( { email: mother.email }, function( err, result ) {
      if( result && mother.email ) {
        cb && cb( new Error('Duplicate Mother') );
      } else {
        mother.save( cb );
      }
    });
  },
  update: function( body, cb) {
    var id = body._id;
    delete body._id;
    var self = this;
    Mother.update({_id: id}, body, {upsert: true}, function( err ) {
      console.log(err);
      self.get(id, cb);
    });
  },
  get: function( id, cb ) {
    Mother.findOne( { _id: id }, cb );
  },
  delete: function( id, cb ) {
    Mother.remove( { _id: id }, cb );
  },
  assignVolunteer: function(id, volunteerEmail, cb) {
    var self = this;
    Mother.findOne( { _id: id }, function(err, mother){
      if(err){
        throw err;
      }

      if(mother){
        mother.volunteers.push(volunteerEmail);
        mother.primaryVolunteer = volunteerEmail;
        self.update(mother.toObject(), cb);
      }else{
        cb(null, null);
      }
    });
  },
  unassignVolunteer: function(id, volunteerEmail, cb){
    var self = this;
    Mother.findOne( { _id: id }, function(err, mother){
      if(err){
        throw err;
      }

      if(mother){
        var index = mother.volunteers.indexOf(volunteerEmail);

        if(index >= 0){
          mother.volunteers.shift(index);
        }

        if(mother.primaryVolunteer === volunteerEmail){
          if(mother.volunteers[0]){
            mother.primaryVolunteer = mother.volunteers[0];
          }else{
            mother.primaryVolunteer = '';
          }
        }

        self.update(mother.toObject(), cb);
      }else{
        cb(null, null);
      }
    });
  }
};

if ( !that ) {
  that = new MotherService( );
}

module.exports = that;
