const chai = require('chai');
const UrlRepository = require('../src/lib/UrlRepository');
const CounterRepository = require('../src/lib/CounterRepository');

const urlRepository = new UrlRepository();
const counterRepository = new CounterRepository();

const expect = chai.expect;

describe('UrlRepository test', () => {
  it('Should return the same url when given a new url', () => {
    const url = `https://www.npmjs.com?time=${new Date().getTime()}`;

    return counterRepository.nextId()
      .then((id) => urlRepository.save({_id: id, url, created_at: new Date()}))
      .then((url) => urlRepository.findOne(url))
      .then(fetchedUrl => expect(fetchedUrl.url).deep.equals(url));
  });
});
