const mongo = require('mongodb').MongoClient;
const Bluebird = require('bluebird');
const config = require('../config');

const url = config.mongodbUri;

class CounterRepository {
  constructor() {
    this.collection = null;
    this.counterId = 'url_count';
  }

  getCollection() {
    if (this.collection !== null) {
      return Bluebird.resolve(this.collection);
    }

    return mongo.connect(url, {promiseLibrary: Bluebird})
      .then(db => db.collection('counters'))
      .tap(collection => this.collection = collection);
  }

  nextId() {
    return this.getCollection()
      .then(collection => collection.findOneAndUpdate(
        {_id: this.counterId},
        {$inc: {seq: 1}},
        {upsert: true, returnOriginal: false}
      ))
      .then(result => result.value.seq);
  }
}

module.exports = CounterRepository;
