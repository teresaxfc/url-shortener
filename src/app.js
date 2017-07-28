const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const config = require('./config');
const base58 = require('./base58.js');
const Logger = require('./lib/Logger');
const UrlService = require('./lib/UrlService');
const NotFoundError = require('./lib/NotFoundError');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const favicon = require('serve-favicon');
const path = require('path');
const _ = require('lodash');
require('./passport')(passport);

const logger = new Logger();
const urlService = new UrlService();

const app = express();
app.set('views', `${__dirname}/../views`);
app.engine('ejs', ejs.renderFile);
app.use('/static', express.static(path.join(__dirname,'../public')));
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'shhsecret'}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', function (request, response) {
  request.logout();
  response.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.get('/urls', (request, response) => {
  const userId = _.get(request, 'user._id', null);
  if (userId === null) {
    return response.status(401).send();
  }

  urlService.findByUserId(userId)
    .map(url => Object.assign({}, url, {
      shortenedUrl: `${config.webhost}/${base58.encodeToBase58(url._id)}`
    }))
    .then(urls => response.send(urls))
    .catch((error) => {
      logger.error('failed to find shortened urls by user', {error});
      response.status(500).send();
    });
});

app.get('/', (request, response) => {
  response.render('index.ejs', {user: request.user});
});

app.post('/api/shorten', (request, response) => {
  const originalUrl = request.body.originalUrl;
  const userId = _.get(request, 'user._id', null);

  if (!originalUrl) {
    response.status(400).send();
    return;
  }

  urlService.getOrCreateByOriginalUrl(originalUrl, userId)
    .then(url => {
      const base58Id = base58.encodeToBase58(url._id);
      response.send({
        originalUrl:url.originalUrl,
        shortenedUrl: `${config.webhost}/${base58Id}`,
        id: base58Id,
        createdTime: url.createdTime,
        user: url.userId,
      })
    })
    .catch((error) => {
      logger.error('failed to save url', {error});
      response.status(500).send();
    });
});

app.get('/:shortenedUrl', (request, response) => {
  const base58Id = request.params.shortenedUrl;
  const decimalId = base58.decodeFromBase58(base58Id);

  urlService.findById(decimalId)
    .then(url => response.redirect(url.originalUrl))
    .catch(NotFoundError, () => response.redirect(config.webhost))
    .catch((error) => {
      logger.error('failed to find url', {error});
      response.status(500).send();
    });
});

app.listen(process.env.PORT || 3000);

module.exports = app;
