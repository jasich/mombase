var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , User = require('../../lib/documents/user');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

/**
 * Login route
 */
exports.login = function(req, res){
    passport.authenticate('local', { 
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true });
};