const chai = require('chai');
const UrlService = require('../src/lib/UrlService');
const CounterRepository = require('../src/lib/CounterRepository');

const expect = chai.expect;

describe('UrlService test', () => {
  const urlService = new UrlService();
  const counterRepository = new CounterRepository();

  it('Should return existing url when giving an existing url', () => {
    const originalUrl = 'http://mongoosejs.com/docs/promises.html';

    return urlService.getOrCreateByOriginalUrl(originalUrl)
      .then(url => expect(url.originalUrl).equals(originalUrl));
  });

  it('Should create a new url when giving a non-existing url', () => {
    const newUrl = `http://mongoosejs.com/docs/promises.html?time=${new Date().getTime()}`;

    return counterRepository.nextId()
      .then(lastId => urlService.getOrCreateByOriginalUrl(newUrl)
        .then(url => expect(url._id).equals(lastId + 1)));
  });

  it('Should able to find url by url id', () => {
    return counterRepository.nextId()
      .then(lastId => urlService.getOrCreateByOriginalUrl('http://any-url'))
      .then((url) => {
        urlService.findById(url._id)
          .then(loadedUrl => {
            expect(loadedUrl._id).equals(url._id);
            expect(loadedUrl.originalUrl).equals(url.originalUrl);
          });
      });
  });

  it('Should return error message when giving a non-existing url id', () => {
    const id = 'not exist';

    return urlService.findById(id)
      .then(() => chai.assert(false, `Could not find url by id: ${id}`))
      .catch(error => expect(error.message).equals(`Could not find url by id: ${id}`));
  });

  it('Should able to find existing url by user id', () => {
    const testOriginalUrl = `test_original_url_${new Date()}`;
    const testUserId = "test_user_id";

    return urlService.getOrCreateByOriginalUrl(testOriginalUrl, testUserId)
      .then(createdUrl => urlService.findByUserId(createdUrl.userId)
        .then(existingUrl => expect(existingUrl[0].userId).equals(testUserId)));
  });

  it('Should return error message when giving a non-existing user id', () => {
    const testUserId = "test_user_id_not_exists";

    return urlService.findByUserId(testUserId)
      .catch(error => expect(error.message).equals(`Could not find url by user id: ${testUserId}`));
  });
});
