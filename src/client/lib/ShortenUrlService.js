import axios from 'axios';

export default class ShortenUrlService {
  constructor(user) {
    this.user = user;
  }

  createShortenUrl(originalUrl) {
    if (originalUrl.indexOf('localhost') < 0) {
      return axios.post('/api/shorten', {originalUrl: originalUrl})
        .then(response => {
          const shortenedUrl = `${response.data.shortenedUrl}`;
          const createdTime = `${response.data.created}`;
          const createdShortenedUrl = {
            originalUrl: response.data.originalUrl,
            shortenedUrl: shortenedUrl,
            createdTime: createdTime,
          };

          if (this.user === null) {
            this.saveToLocalStorage(createdShortenedUrl);
          }

          return createdShortenedUrl;
        });
    }
  };

  saveToLocalStorage(createdShortenedUrl) {
    const savedUrls = this.getUrlsFromLocal();
    const isSaved = savedUrls.some(function isSaved(element) {
      return element.shortenedUrl === createdShortenedUrl.shortenedUrl;
    });
    if (!isSaved) {
      localStorage.setItem(`anonymous-url-${new Date()}`, JSON.stringify(createdShortenedUrl));
    }
  };

  getUrlHistory() {
    if(this.user === null) {
      return this.getUrlsFromLocal();
    } else {
      return this.getUrlsFromService();
    }
  }

  getUrlsFromLocal() {
    return new Promise(function (resolve, reject){
      resolve(Object.keys(localStorage)
        .filter(key => key.startsWith('anonymous-url'))
        .map(key => JSON.parse(localStorage.getItem(key))));
    });
  };

  getUrlsFromService() {
    return axios.get('/urls', {user: this.user})
      .then(serviceSavedUrls => serviceSavedUrls.data);
  }
}
