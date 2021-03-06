const mongo = require('mongodb').MongoClient;
const Bluebird = require('bluebird');
const config = require('../config');

const hostUrl = config.mongodbUri;

class UrlRepository {
  constructor() {
    this.collection = null;
  }

  findOne(url) {
    return this.getCollection()
      .then(collection => collection.findOne(url));
  }

  findUrlsByUserId(userId) {
    return this.getCollection()
      .then(collection => collection.find(userId).toArray());
  }

  save(url) {
    return this.getCollection()
      .then(collection => collection.insertOne(url))
      .then(() => url);
  }

  getCollection() {
    if (this.collection !== null) {
      return Bluebird.resolve(this.collection);
    }

    return mongo.connect(hostUrl, {promiseLibrary: Bluebird})
      .then(db => db.collection('urls'))
      .tap(collection => this.collection = collection);
  }
}

module.exports = UrlRepository;
