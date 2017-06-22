const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const base58 = require('./base58.js');
const Url = require('./url');

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

const app = express();
app.set('views', `${__dirname}/../views`);
app.engine('html', ejs.renderFile);
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response) => {
  response.render('index.html');
});

app.post('/api/shorten', function (request, response) {
  const original_url = request.body.url;
  let shortened_url = '';

  if (!original_url) {
    response.status(400).send();
    return;
  }

  Url.findOne({original_url: original_url}, function (err, doc) {
    if (doc) {
      const base58Id = base58.encodeToBase58(doc._id);
      shortened_url = config.webhost + base58Id;
      response.send({"shortened_url": shortened_url,'id':base58Id});
    } else {
      const newUrl = Url({original_url: original_url});
      newUrl.save(function (err) {
        if (err) {
          console.log(err);
        }

        const base58Id = base58.encodeToBase58(newUrl._id);
        shortened_url = config.webhost + base58Id;
        response.send({"shortened_url": shortened_url,'id':base58Id});
      });
    }
  });
});

app.get('/:shortened_url', function (request, response) {
  const base58Id = request.params.shortened_url;
  const decimalId = base58.decodeFromBase58(base58Id);

  Url.findOne({_id: decimalId}, function (err, doc) {
    if (doc) {
      response.redirect(doc.original_url);
    } else {
      response.redirect(config.webhost);
    }
  });
});

app.listen(8080);

module.exports = app;