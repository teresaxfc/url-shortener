const _ = require('lodash');
const FacebookStrategy = require('passport-facebook').Strategy;
const UserService = require('./lib/UserService');
const configAuth = require('./auth');

module.exports = function (passport) {
  const userService = new UserService();

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    userService.findById(id, function (err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ['id', 'email', 'first_name', 'last_name']
    },
    function(token, refreshToken, profile, done) {
      process.nextTick(function() {
        userService.getOrCreateByUserId( profile )
          .then(user => done(null, user))
          .catch(error => done(error))
      });
    }));
};