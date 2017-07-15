const config = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/url_shortener',
  webhost: 'http://localhost:3000/',
};

module.exports = config;
