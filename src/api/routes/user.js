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
    if (!user) { return res.status(401).send(); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(user);
    });
   })(req, res, next);
};

/**
 * Create user
 */
exports.create = function(req,res) {
  (new User(req.body)).save(function(err, user) {
    if (err) return res.send(400).send();
    user.hash = undefined;
    res.send(200, user);
  });
};