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
require('./passport')(passport);

const logger = new Logger();
const urlService = new UrlService();

const app = express();
app.set('views', `${__dirname}/../views`);
app.engine('html', ejs.renderFile);
app.use('/static', express.static('../public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({ secret: 'shhsecret' }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/auth/facebook', passport.authenticate('facebook', {
  scope: 'email'
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/'
}));

app.get('/', (request, response) => {
  response.render('index.html', {user: request.user});
});

app.post('/api/shorten', (request, response) => {
  const originalUrl = request.body.originalUrl;

  if (!originalUrl) {
    response.status(400).send();
    return;
  }

  urlService.getOrCreateByOriginalUrl(originalUrl)
    .then(url => base58.encodeToBase58(url._id))
    .then(base58Id => response.send({
      shortenedUrl: config.webhost + base58Id,
      id: base58Id }))
    .catch((err) => {
      logger.fatal('failed to save url', { err });
      response.status(500).send();
    });
});

app.get('/:shortenedUrl', (request, response) => {
  const base58Id = request.params.shortenedUrl;
  const decimalId = base58.decodeFromBase58(base58Id);

  urlService.findById(decimalId)
    .then(url => response.redirect(url.originalUrl))
    .catch(NotFoundError, () => response.redirect(config.webhost))
    .catch((err) => {
      logger.fatal('failed to find url', { err });
      response.status(500).send();
    });
});

app.listen(3000);

module.exports = app;
