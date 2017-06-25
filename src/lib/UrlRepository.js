const mongo = require('mongodb').MongoClient;
const Bluebird = require("bluebird");
const config = require('../config');

const url = `mongodb://${config.db.host}/${config.db.name}`;

class UrlRepository {
  constructor() {
    this.collection = null;
  }

  findOne(url) {
    return this.getCollection()
      .then(collection => collection.findOne(url));
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

    return mongo.connect(url, {promiseLibrary: Bluebird})
      .then(db => db.collection('urls'))
      .tap(collection => this.collection = collection);
  }
}

module.exports = UrlRepository;
