const chai = require('chai');
const UrlRepository = require('../src/lib/UrlRepository');
const CounterRepository = require('../src/lib/CounterRepository');

const expect = chai.expect;

describe('UrlRepository test', () => {
  const urlRepository = new UrlRepository();
  const counterRepository = new CounterRepository();

  it('Should return the same url when given a new url', () => {
    const url = `https://www.npmjs.com?time=${new Date().getTime()}`;

    return counterRepository.nextId()
      .then(id => urlRepository.save({ _id: id, url, created_at: new Date() }))
      .then(savedUrl => urlRepository.findOne(savedUrl))
      .then(fetchedUrl => expect(fetchedUrl.url).deep.equals(url));
  });
});
