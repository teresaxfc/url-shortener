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
      <div key={index} className="table-row">
        <div className="table-column table-content-cell original-url col-xs-12 col-md-7">
          <a href={shortedUrl.originalUrl} className="url-link">{shortedUrl.originalUrl}</a></div>
        <div className="table-column table-content-cell shortened-url col-xs-12 col-md-3">
          <a href={shortedUrl.shortenedUrl} className="url-link">{shortedUrl.shortenedUrl}</a></div>
        <div className="table-column table-content-cell created-time col-xs-12 col-md-2">
          {moment(shortedUrl.createdTime).fromNow()}</div>
      </div>
    );
  }

  render() {
    let shortenedUrls = this.getShortenedUrlHistory();
    return (
      <div className="table usage-history-table">
        <div className="table-head">
          <div className="table-column table-head-cell col-md-7">Original Url</div>
          <div className="table-column table-head-cell col-md-3">Short Url</div>
          <div className="table-column table-head-cell col-md-2">Created</div>
        </div>
        <div className="table-content">
          {shortenedUrls}
        </div>
      </div>
    );
  }
}