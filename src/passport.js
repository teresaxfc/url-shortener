const _ = require('lodash');
const FacebookStrategy = require('passport-facebook').Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const UserService = require('./lib/UserService');
const User = require('./lib/User');
const config = require('./config');

module.exports = function (passport) {
  const userService = new UserService();

  passport.serializeUser(function (user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id, done) {
    userService.findById(id)
      .then(user => done(null, user))
      .catch(error => done(error))
  });

  passport.use(new FacebookStrategy({
      clientID: config.oauth.facebook.clientID,
      clientSecret: config.oauth.facebook.clientSecret,
      callbackURL: config.oauth.facebook.callbackURL,
      profileFields: ['id', 'email', 'first_name', 'last_name']
    },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        const user = new User(
          "facebook",
          profile.id,
          profile.name.givenName,
          profile.name.familyName,
          _.get(profile, 'emails[0].value', '').toLowerCase(),
        );

        userService.getOrCreateByUserId(user)
          .then(savedUser => done(null, savedUser))
          .catch(error => done(error));
      });
    }));

  passport.use(new TwitterStrategy({
      consumerKey: config.oauth.twitter.consumerKey,
      consumerSecret: config.oauth.twitter.consumerSecret,
      callbackURL: config.oauth.twitter.callbackURL
    },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        const user = new User(
          profile.provider,
          profile.id,
          profile.displayName,
          '',
          '',
        );

        userService.getOrCreateByUserId(user)
          .then(savedUser => done(null, savedUser))
          .catch(error => done(error));
      });
    }));

  passport.use(new GoogleStrategy({
      clientID: config.oauth.google.clientID,
      clientSecret: config.oauth.google.clientSecret,
      callbackURL: config.oauth.google.callbackURL
    },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        const user = new User(
          "google",
          profile.id,
          profile.name.givenName,
          profile.name.familyName,
          _.get(profile, 'emails[0].value', '').toLowerCase(),
        );

        userService.getOrCreateByUserId(user)
          .then(savedUser => done(null, savedUser))
          .catch(error => done(error));
      });
    }));
};