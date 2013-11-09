var motherService = require('../services/motherService');


/**
 * Create route
 */
exports.create = function(req, res){
  var body = req.body;

  motherService.save(body, function(err, mother){
    if (err) { return res.set(500).send(); }

    res.send(mother);
  });
};

exports.get = function(req, res) {
  motherService.get(function(err, mother){
    if (err) { return res.set(500).send(); }

    res.send(mother);
  });
};
