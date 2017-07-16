const bunyan = require('bunyan');

const rootLogger = bunyan.createLogger({
  name: process.env.SERVICE || 'url-shortener',
  level: 'trace',
});

class Logger {
  constructor(metadata, parent) {
    const parentLogger = parent ? parent.logger : rootLogger;
    this.logger = parentLogger.child(metadata);
  }

  info(message, meta = {}) {
    this.logger.info(meta, message);
  }

  error(message, meta = {}) {
    this.logger.fatal(meta, message);
  }

  fatal(message, meta = {}) {
    this.logger.fatal(meta, message);
  }
}

module.exports = Logger;
