const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('counter', CounterSchema);

const urlSchema = new Schema({
  _id: { type: Number, index: true },
  originalUrl: String,
  created_at: Date,
});

urlSchema.pre('save', function (next) {
  const doc = this;
  Counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: { seq: 1 } }, (error, counter) => {
    if (error) {
      return next(error);
    }

    doc._id = counter.seq;
    doc.created_at = new Date();
    next();
  });
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
