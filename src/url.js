const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CounterSchema = Schema({
  _id: {type: String, required: true},
  seq: {type: Number, default: 0}
});

const counter = mongoose.model('counter', CounterSchema);

const urlSchema = new Schema({
  _id: {type: Number, index: true},
  original_url: String,
  created_at: Date
});

urlSchema.pre('save', function (next) {
  const doc = this;
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function (error, counter) {
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