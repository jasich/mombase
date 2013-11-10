var mongo = require('./mongo')
  , session = require('./session')
  , auth = require('../middleware/auth')
  , mongoose = require('mongoose')
  , express = require('express');

module.exports = {
  configure: function(app) {
    this.db(app);
    this.middleware(app);
  },
  db: function(app) {
    if (! /test/.test(app.get('env')))
      mongoose.connect('mongodb://' + mongo.get('host') + ':' + mongo.get('port') + '/' + mongo.get('db'));
  },
  middleware: function(app) {
    //configure application middleware
    app.set('port', process.env.PORT || 3000);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.bodyParser());
    app.use(express.urlencoded());
    app.use(express.methodOverride());

    //cookie and session
    app.use(express.cookieParser());
    app.use(express.session(session));

    //authentication
    if (! /test|development/.test(app.get('env'))) {
      app.use(auth.checkAuth());
    }
    app.use(auth.initialize);
    app.use(auth.session);

    //add router
    app.use(app.router);

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }
  }
}
