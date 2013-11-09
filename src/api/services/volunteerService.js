var Volunteer = require('../../lib/documents/volunteer');

function VolunteerService() {

}

VolunteerService.prototype = {
	save: function(body, cb) {
		var volunteer = new Volunteer(body);

		volunteer.save(cb);
	},
	get: function(cb) {
		Volunteer.find({}, cb);
	}
};

var that = null;

if(!that) {
	that = new VolunteerService();
}

module.exports = that;