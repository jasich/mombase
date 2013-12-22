var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../../lib/documents/user');

/**
 * Passport strategy configuration
 */
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false);
      }
      if (!user.comparePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/**
 * Login route
 */
exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) {
        req.logout();
        return res.status(401).send();
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      user.hash = undefined;
      return res.send(user);
    });
   })(req, res, next);
};

exports.list = function(req, res) {
  User.find(function(err, users) {
    if (err) return res.send(400, err);
    res.send(200, users);
  });
};

exports.del = function(req, res) {
  var params = req.params;
  User.remove({_id:params.id}, function(err) {
    if (err) return res.send(500);
    res.send(204);
  });
}

exports.get = function(req, res){
  var params = req.params;
  User.findById(params.id, function ( err, result ) {
    if (err) return res.send(500);
    res.send(result);
  });
};

exports.update = function(req, res){
  var body = req.body
    , id = req.params.id;
  delete body.id;
  delete body._id;
  delete body.hash;
  User.update({_id: id}, body, {upsert: true}, function(err, u) {
    if (err) return res.send(500, err);
    delete body.password;
    res.send(body);
  });
};

/**
 * Create user
 */
exports.create = function(req,res) {
  (new User(req.body)).save(function(err, user) {
    if (err) return res.send(400, {message:err.message});
    user.hash = undefined;
    res.send(200, user);
  });
};

exports.changePassword = function(req, res) {
  var params = req.params;
  var currentPassword = req.body.currentPassword;
  var password = req.body.password;
  var confirmPassword = req.body.confirmPassword;

  User.findById(params.id, function ( err, user ) {
    if (err) return res.send(500);

    if (user) {
      if (!user.comparePassword(currentPassword)) {
        return res.send(200, { success: false, errorMessage: "Invalid password" });
      }

      if (password !== confirmPassword) {
        return res.send(200, { success: false, errorMessage: "Passwords do not match" });
      }

      user.password = password;
      user.save(function() {
        return res.send(200, { success: true });
      });
    } else {
      return res.send(400);
    }
  });
};
