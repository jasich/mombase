var Mother = require('../../lib/documents/mother');

var MotherService = function() {

};

var that = null;

MotherService.prototype = {
  save: function(data, cb) {
    var mother = new Mother(data);

    mother.save(cb);
  },
  get: function(cb) {
    Mother.find({}, cb);
  }
};

if (!that) {
  that = new MotherService();
}

module.exports = that;


