const mongoose = require('mongoose');
const Logger = require('./lib/Logger');
const Bluebird = require('bluebird');
const config = require('./config');

mongoose.Promise = global.Promise;
const db = mongoose.createConnection(`mongodb://${config.db.host}/${config.db.name}`,{ promiseLibrary: Bluebird });

const logger = new Logger();
const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = db.model('counter', CounterSchema);

const urlSchema = new Schema({
  _id: { type: Number, index: true },
  originalUrl: String,
  created_at: Date,
});

urlSchema.pre('save', function (next) {
  const doc = this;
  Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { seq: 1 } }, (error, counter) => {
    if (error) {
      logger.fatal('Failed to generate url id', {error});
      return next(error);
    }

    doc._id = counter.seq;
    doc.created_at = new Date();
    return next();
  });
});

const Url = db.model('Url', urlSchema);

module.exports = Url;
