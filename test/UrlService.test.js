const chai = require('chai');
const UrlService = require('../src/lib/UrlService');
const CounterRepository = require('../src/lib/CounterRepository');
const NotFoundError = require('../src/lib/NotFoundError');

const expect = chai.expect;
const urlService = new UrlService();
const counterRepository = new CounterRepository();

describe('UrlService test', () => {
  it('Should return existing url when giving an existing url', () => {
    const originalUrl = 'http://mongoosejs.com/docs/promises.html';

    return urlService.getOrCreateByOriginalUrl(originalUrl)
      .then(url => expect(url.originalUrl).equals(originalUrl));
  });

  it('Should update a new url when giving a non-existing url', () => {
    const newUrl = `http://mongoosejs.com/docs/promises.html?time=${new Date().getTime()}`;

    return counterRepository.nextId()
      .then(lastId => urlService.getOrCreateByOriginalUrl(newUrl)
        .then(url => expect(url._id).equals(lastId + 1)));
  });

  it('Should return existing url when giving an existing id', () => {
    return urlService.findById(2)
      .then(url => expect(url._id).equals(2));
  });

  it('Should return error message when giving a non-existing id', () => {
    const id = 'not exist';

    return urlService.findById(id)
      .then(result => chai.assert(false, `Could not find url by id: ${id}`))
      .catch(error => expect(error.message).equals(`Could not find url by id: ${id}`))
  });
});
