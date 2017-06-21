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
    const longUrl = request.body.url;
  let shortUrl = '';

  if(!longUrl){
    response.status(400).send();
    return;
  }

  Url.findOne({original_url: longUrl}, function (err, doc) {
    if (doc) {
      shortUrl = config.webhost + base58.encodeToBase58(doc._id);
      response.send({'shortUrl': shortUrl});
    } else {
      const newUrl = Url({original_url: longUrl});
      newUrl.save(function (err) {
        if (err) {
          console.log(err);
        }

        shortUrl = config.webhost + base58.encodeToBase58(newUrl._id);
        response.send({'shortUrl': shortUrl});
      });
    }
  });
});

app.get('/:shortened_url', function(request, response){
  const base58Id = request.params.shortened_url;
  const id = base58.decodeFromBase58(base58Id);

  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      response.redirect(doc.original_url);
    } else {
      response.redirect(config.webhost);
    }
  });
});

app.listen(8080);
