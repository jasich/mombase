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
	var body = req.query;
	if ( body.id ) {
		volunteerService.get( body.id, function ( err, result ) {
			if ( err ) throw err;
			res.send( result );
		});
	} else {
		volunteerService.all( body.filter, body.sort, body.offset, body.take, function ( err, results ) {
			if ( err ) throw err;
			res.send( results );
		});
	}
};

/**
 * Delete route
 */
exports.del = function(req, res){
	var body = req.body;
	volunteerService.delete(body.id, function(err, result) {
		if(err) throw err;
		res.send('success');
	});
};