import React, {Component} from 'react';
import moment from 'moment';
import './index.sass';

export default class ShortenedUrlHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 1,
    };

    this.getShortenedUrlHistory = this.getShortenedUrlHistory.bind(this);
  }

  getShortenedUrlHistory() {
    const shortedUrls = this.props.shortedUrls;

    return shortedUrls.map((shortedUrl, index) =>
      <tr key={index}>
        <td className="original-url"><a href={shortedUrl.originalUrl}>{shortedUrl.originalUrl}</a></td>
        <td className="shortened-url"><a href={shortedUrl.originalUrl}>{shortedUrl.shortenedUrl}</a></td>
        <td className="created-time">{moment(shortedUrl.createdTime).fromNow()}</td>
      </tr>
    );
  }

  render() {
    let shortenedUrls = this.getShortenedUrlHistory();
    return (
      <table className="table table-hover usage-history">
        <thead>
        <tr>
          <th>Original URL</th>
          <th>Short URL</th>
          <th>Created</th>
        </tr>
        </thead>
        <tbody>
        {shortenedUrls}
        </tbody>
      </table>
    );
  }
}