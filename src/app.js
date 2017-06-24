const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('./config');
const base58 = require('./base58.js');
const Url = require('./url');
const Logger = require('./Logger');

const logger = new Logger();

const app = express();
app.set('views', `${__dirname}/../views`);
app.engine('html', ejs.renderFile);
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
  response.render('index.html');
});

app.post('/api/shorten', (request, response) => {
  const originalUrl = request.body.originalUrl;
  let shortenedUrl = '';

  if (!originalUrl) {
    response.status(400).send();
    return;
  }

  Url.findOne({ originalUrl }, (err, doc) => {
    if (doc) {
      const base58Id = base58.encodeToBase58(doc._id);
      shortenedUrl = config.webhost + base58Id;
      response.send({ shortenedUrl, id: base58Id });
    } else {
      const newUrl = Url({ originalUrl });
      newUrl.save((error) => {
        if (error) {
          logger.fatal('failed to save url', { error });
          response.status(500).send();
          return;
        }

        logger.info('Saved a new url', {url: newUrl});

        const base58Id = base58.encodeToBase58(newUrl._id);
        shortenedUrl = config.webhost + base58Id;
        response.send({ shortenedUrl, id: base58Id });
      });
    }
  });
});

app.get('/:shortenedUrl', (request, response) => {
  const base58Id = request.params.shortenedUrl;
  const decimalId = base58.decodeFromBase58(base58Id);

  Url.findOne({ _id: decimalId }, (err, doc) => {
    if (doc) {
      response.redirect(doc.originalUrl);
    } else {
      response.redirect(config.webhost);
    }
  });
});

app.listen(8080);

module.exports = app;
