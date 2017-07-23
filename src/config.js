const config = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/url_shortener',
  webhost: process.env.HOST_URL || 'http://localhost:3000',
  oauth:{
    facebook: {
      clientID: process.env.FACEBOOK_CLIENT_ID || '1912744722327757',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '74b581db2b2c09f9177d73d02a6aa05e',
      callbackURL: process.env.FACEBOOK_CALLBACK || 'http://localhost:3000/auth/facebook/callback'
    },
  }
};

module.exports = config;
