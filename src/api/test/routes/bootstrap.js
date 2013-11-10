var config = require('../../config/mongo')
  , mongoose = require('mongoose');

process.env.NODE_ENV = 'test';

beforeEach(function (done) {
  //console.log('before each called');
  function clearDB() {
    //console.log('clear db called');
    for (var i in mongoose.connection.collections) {
      mongoose.connection.collections[i].remove(function() {});
    }
    return done();
  }

  function reconnect() {
    //console.log('reconnect called with: ', config.get('db'));
    mongoose.connect('mongodb://' + config.get('host') + ':' + config.get('port') + '/' + config.get('db'), function (err) {
      if (err) {
        throw err;
      }
      return clearDB();
    });
  }

  function checkState() {
    //console.log('checking state', mongoose.connection.readyState);
    switch (mongoose.connection.readyState) {
      case 0:
        reconnect();
        break;
      case 1:
        clearDB();
        break;
      default:
        setImmediate(checkState);
    }
  }

  checkState();
});

afterEach(function (done) {
  //console.log('disconnecting mongoose');
  mongoose.disconnect();
  return done();
});