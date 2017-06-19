const express = require('express');
const ejs = require('ejs');

const app = express();
app.set('views', `${__dirname}/views`);
app.engine('html', ejs.renderFile);
app.use('/static', express.static('public'));

app.get('/', (request, response) => {
  response.render('index.html');
});

app.listen(8080);
