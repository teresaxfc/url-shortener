const chai = require('chai');
const request = require('supertest-as-promised');
const app = require('../src/app');

const expect = chai.expect;

describe('url shortener service test', () => {
  it('Should return default home page', () => {
    const result = request(app).get('/');

    return result
      .expect(200)
      .then((response) => {
        expect(response.text).contains('Shorten Your Link with ShortEn');
      });
  });

  it('should return 400 (Bad Request) when original url is empty', () => {
    const result = request(app).post('/api/shorten');

    return result
      .expect(400);
  });

  it('should return exited shortened url when given an existing url', () => {
    const originalUrl = 'http://mongoosejs.com/docs/promises.html';

    const result = request(app)
      .post('/api/shorten')
      .send({ originalUrl });

    return result
      .expect(200)
      .then(response => request(app).get(`/${response.body.id}`).expect(302))
      .then((response) => {
        expect(response.header.location).equals(originalUrl);
      });
  });

  it('should create new shortened url when given a non-existing url', () => {
    const originalUrl = `http://mongoosejs.com/docs/promises.html?time=${new Date().getTime()}`;

    const result = request(app)
      .post('/api/shorten')
      .send({ originalUrl });

    return result
      .expect(200)
      .then(response => request(app).get(`/${response.body.id}`).expect(302))
      .then((response) => {
        expect(response.header.location).equals(originalUrl);
      });
  });
});
