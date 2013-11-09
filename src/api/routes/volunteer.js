var Volunteer = require('../../lib/documents/volunteer');


/**
 * Create route
 */
exports.create = function(req, res){
	var volunteer = new Volunteer(req.body);
	res.send(volunteer);
};