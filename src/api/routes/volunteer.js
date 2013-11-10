var Volunteer = require('../../lib/documents/volunteer'),
	volunteerService = require('../services/volunteerService');


/**
 * Create route
 */
exports.create = function(req, res){
	var body = req.body;
	volunteerService.save(body, function(err, result) {
		if ( err ) return res.send( 500, err );
		res.send(result);
	});
};

/**
 * Get route
 */
exports.get = function(req, res){
	var params = req.params;
	volunteerService.get( params.id, function ( err, result ) {
		if ( err ) return res.set( 500 ).send( );
		res.send( result );
	});
};

/**
 * Delete route
 */
exports.del = function(req, res){
	var params = req.params;
	volunteerService.delete(params.id, function(err, result) {
		if ( err ) return res.set( 500 ).send( );
		res.send('success');
	});
};

/**
 * Search route
 */
exports.search = function(req, res) {
	var body = req.body;
	var i;

	var filter = { };
	var filterKeys = [ 'firstName', 'lastName' ];
	for ( i = filterKeys.length; i--; ) {
		if ( body[ 'filter.' + filterKeys[ i ] ] ) {
			filter [ filterKeys[ i ] ] = body[ 'filter.' + filterKeys[ i ] ];
		}
	}

	var sort = { };
	var sortKeys = [ 'firstName', 'lastName' ];
	for ( i = sortKeys.length; i--; ) {
		if ( body[ 'sort.' + sortKeys[ i ] ] ) {
			sort [ sortKeys[ i ] ] = body[ 'sort.' + sortKeys[ i ] ];
		}
	}

	volunteerService.all(filter, sort, body.offset, body.take, function(err, result) {
		if ( err ) return res.set( 500 ).send( );
		res.send(result);
	});
}


/**
 * Update route
 */
exports.update = function(req, res){
	var body = req.body;
	volunteerService.update(body, function(err, result) {
		if ( err ) { return res.send( 500, 'failure'); }
		res.send(result);
	});
};

exports.within = function(req, res) {
	var body = req.query;
	volunteerService.within(body.lon, body.lat, body.radius, function(err, result) {
		if ( err ) { return res.send( 500, 'failure'); }
		res.send(result);
	});
}
