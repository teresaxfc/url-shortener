const mongo = require('mongodb').MongoClient;
const Bluebird = require('bluebird');
const config = require('../config');

const hostUrl = `mongodb://${config.db.host}/${config.db.name}`;

class UserRepository {
  constructor() {
    this.collection = null;
  }

  findById(userId) {
    return this.getCollection()
      .then(collection => collection.findOne({id:userId}))
  }

  save(user) {
    return this.getCollection()
      .then(collection => collection.insertOne(user))
      .then(() => user);
  }

  getCollection() {
    if (this.collection !== null) {
      return Bluebird.resolve(this.collection);
    }

    return mongo.connect(hostUrl, { promiseLibrary: Bluebird })
      .then(db => db.collection('users'))
      .tap(collection => this.collection = collection);
  }
}

module.exports = UserRepository;