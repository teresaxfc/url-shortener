const config = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/url_shortener',
  webhost: process.env.HOST_URL || 'http://localhost:3000',
  oauth:{
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID || '1912744722327757',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '74b581db2b2c09f9177d73d02a6aa05e',
      callbackURL: process.env.FACEBOOK_CALLBACK || 'http://localhost:3000/auth/facebook/callback'
    },
    twitter: {
      consumerKey: 'WKjjFoaHTcq1cr57sa737GAHQ',
      consumerSecret: 'uQsXdWZllPpZNIbcrqHELKwocB2kdcjMUk9qx9tqyNQ3O7FRi7',
      callbackURL: 'http://localhost:3000/auth/twitter/callback'
    },
    google: {
      clientID: '101691302720-23lhl8b9rfpee8p6l3acctljrmjj2809.apps.googleusercontent.com',
      clientSecret: 'VdWfNoSK_ESV85JEkH-a3_97',
      callbackURL: 'http://localhost:3000/auth/google/callback'
    }
  }
};

module.exports = config;
