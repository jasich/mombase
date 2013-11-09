var Volunteer = require('../../lib/documents/volunteer'),
	volunteerService = require('../services/volunteerService');


/**
 * Create route
 */
exports.create = function(req, res){
	var body = req.body;
	volunteerService.save(body, function(err, result) {
		if(err) throw err;
		res.send(result);
	});
};

/**
 * Get route
 */
exports.get = function(req, res){
	var body = req.body;
	volunteerService.get(body, function(err, result) {
		if(err) throw err;
		res.send(result);
	});
};