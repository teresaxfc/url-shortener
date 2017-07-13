const _ = require('lodash');
const FacebookStrategy = require('passport-facebook').Strategy;
const UserService = require('./lib/UserService');
const User = require('./lib/User');
const configAuth = require('./auth');

module.exports = function (passport) {
  const userService = new UserService();

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    userService.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error))
  });

  passport.use(new FacebookStrategy({
      clientID: configAuth.facebookAuth.clientID,
      clientSecret: configAuth.facebookAuth.clientSecret,
      callbackURL: configAuth.facebookAuth.callbackURL,
      profileFields: ['id', 'email', 'first_name', 'last_name']
    },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        const user = new User(
          profile.id,
          profile.name.givenName,
          profile.name.familyName,
          _.get(profile, 'emails[0].value', '').toLowerCase(),
        );

        userService.getOrCreateByUserId(user)
          .then(savedUser => done(null, savedUser))
          .catch(error => done(error))
      });
    }));
};