var motherService = require('../services/motherService')
  , Mother = require('../../lib/documents/mother')
  , _ = require('lodash');

/**
 * Create route
 */
exports.create = function( req, res ){
  var body = req.body;

  motherService.save( body, function( err, mother ) {
    if ( err ) return res.send( 500, 'failure');

    res.send(mother);
  });
};

exports.get = function( req, res ) {
  var body = req.params;
  motherService.get( body.id, function( err, mother ) {
    if ( err ) { return res.set( 500 ).send( ); }
    res.send(mother);
  });
};

/**
 * Delete route
 */
exports.del = function(req, res){
  var params = req.params;
  motherService.delete(params.id, function(err, result) {
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

  motherService.all(filter, sort, body.offset, body.take, function(err, result) {
    if ( err ) return res.set( 500 ).send( );
    res.send(result);
  });
}

/**
 * Update route
 */
exports.update = function(req, res){
  var body = req.body;
  motherService.update(body, function(err, result) {
    if ( err ) { return res.send( 500, 'failure'); }
    res.send(result);
  });
};

/**
 * Assign Volunteer
 */
exports.assignVolunteer = function(req, res){
  var routeParams = req.params;
  var queryParams = req.query;
  motherService.assignVolunteer(routeParams.id, queryParams.volunteerEmail, function(err, result) {
    if ( err ) { return res.send( 500, 'failure'); }
    res.send(result);
  });
};

/**
 * Unassign Volunteer
 */
exports.unassignVolunteer = function(req, res){
  var routeParams = req.params;
  var queryParams = req.query;
  motherService.unassignVolunteer(routeParams.id, queryParams.volunteerEmail, function(err, result) {
    if ( err ) { return res.send( 500, 'failure'); }
    res.send(result);
  });
}


/**
 * Wraps common save logic
 * @param res
 * @param err
 * @param result
 * @returns {*|send|Request|ServerResponse|send}
 */
function onSave(res, err, result) {
  if (err) return res.send(500, err);
  res.send(result);
}

/****************************************************************
 * Embedded Child Resource
 * @todo repetition of "Not Found" checks should be encapsulated
 ****************************************************************/

/**
 * Add a child to a mother
 *
 * Returns the mother in the response with an updated
 * children collection
 *
 * @param req
 * @param res
 */
exports.addChild = function(req, res) {
  var params = req.params
    , body = req.body;
  motherService.get(params.id, function(err, match) {
    if (err) return res.send(500, err);
    if (! match) return res.send(404, {message: 'Mother not found'});
    match.children.push(body);
    match.save(onSave.bind(null, res));
  });
};

/**
 * Update a child document that belongs to a mother
 *
 * @param req
 * @param res
 */
exports.updateChild = function(req, res) {
  var params = req.params
    , body = req.body;
  motherService.get(params.id, function(err, match) {
    if (err) return res.send(500, err);
    if (! match) return res.send(404, {message: 'Mother not found'});

    var child = match.children.id(params.cid);
    if (! child) return res.send(404, {message: 'Child not found'});

    for (var k in body)
      child.set(k, body[k]);

    match.save(onSave.bind(null, res));
  });
};


/**
 * Delete a child
 * @param req
 * @param res
 */
exports.deleteChild = function(req, res) {
  var params = req.params;
  motherService.get(params.id, function(err, match) {
    if (err) return res.send(500, err);
    if (! match) return res.send(404, {message: 'Mother not found'});

    var child = match.children.id(params.cid);
    if (! child) return res.send(404, {message: 'Child not found'});

    child.remove();

    match.save(function(err, result) {
      if (err) return res.send(500, err);
      return res.send(204);
    })
  });
};

/**
 * Get a single child by id
 *
 * @param req
 * @param res
 */
exports.getChild = function(req, res) {
  var params = req.params;
  motherService.get(params.id, function(err, match) {
    if (err) return res.send(500, err);
    if (! match) return res.send(404, {message: 'Mother not found'});

    var child = match.children.id(params.cid);
    if (! child) return res.send(404, {message: 'Child not found'});

    return res.send(child);
  });
};