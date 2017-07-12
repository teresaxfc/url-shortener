const UrlRepository = require('./UrlRepository');
const CounterRepository = require('./CounterRepository');
const UserRepository = require('./UserRepository');
const Bluebird = require('bluebird');
const NotFoundError = require('./NotFoundError');
const Logger = require('./Logger');

class UrlService {
  constructor() {
    this.logger = new Logger();
    this.urlRepository = new UrlRepository();
    this.counterRepository = new CounterRepository();
  }

  getOrCreateByOriginalUrl(originalUrl, userId) {
    return this.urlRepository.findOne({ originalUrl })
      .then(url => url || this.createNewUrl(originalUrl, userId));
  }

  createNewUrl(originalUrl, userId) {
    return this.counterRepository.nextId()
      .then(id => this.urlRepository.save({ _id: id, originalUrl, userId:userId, createdTime: new Date() }));
  }

  findById(id) {
    return this.urlRepository.findOne({ _id: id })
      .then(url => url || Bluebird.reject(new NotFoundError(`Could not find url by id: ${id}`)));
  }

  findByUserId(userId) {
    return this.urlRepository.findUrlsByUserId({ userId: userId })
      .then(urls => urls || Bluebird.reject(new NotFoundError(`Could not find url by user id: ${userId}`)));
  }
}

module.exports = UrlService;
