const config = {
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/url_shortener',
  webhost: process.env.HOST_URL || 'http://localhost:3000',
};

module.exports = config;
