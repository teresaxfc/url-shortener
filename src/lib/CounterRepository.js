const mongo = require('mongodb').MongoClient;
const Bluebird = require('bluebird');
const config = require('../config');

const url = `mongodb://${config.db.host}/${config.db.name}`;

class CounterRepository {
  constructor() {
    this.collection = null;
  }

  getCollection() {
    if (this.collection !== null) {
      return Bluebird.resolve(this.collection);
    }

    return mongo.connect(url, { promiseLibrary: Bluebird })
      .then(db => db.collection('counters'))
      .tap(collection => this.collection = collection);
  }

  nextId() {
    return this.getCollection()
      .then(collection => collection.findOneAndUpdate({ _id: 'url_count' }, { $inc: { seq: 1 } }, { returnNewDocument: true }))
      .then(result => result.value.seq);
  }
}

module.exports = CounterRepository;
