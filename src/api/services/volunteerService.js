var Volunteer = require('../../lib/documents/volunteer'),
	mongoose = require('mongoose');

function VolunteerService() {

}

VolunteerService.prototype = {
	all: function(filter, sort, offset, take, cb) {
		var offset = 0; if ( data.offset ) offset = data.offset;
		var take = 10; if ( data.take ) offset = data.take;
		var filter = { }; if ( data.filter ) filter = data.filter;
		var sort = { }; if ( data.sort ) sort = data.sort;

		Volunteer.find( filter, sort, { skip: offset, limit: take }, cb );
	},
	save: function(body, cb) {
		var volunteer = new Volunteer(body);
		volunteer.save(cb);
	},
	get: function(id, cb) {
		Volunteer.findOne( { _id: id }, cb );
	},
	delete: function(id, cb) {
		Volunteer.remove( { _id: id }, cb );
	}
};

var that = null;

if(!that) {
	that = new VolunteerService();
}

module.exports = that;