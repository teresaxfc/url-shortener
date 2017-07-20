import React, {Component} from 'react';
import moment from 'moment';
import './index.sass';

export default class ShortenedUrlHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 1,
      sortBy: 'createdTime',
      sortMethod: 'descend',
    };

    this.getShortenedUrlHistory = this.getShortenedUrlHistory.bind(this);
  }

  sortUrls(urls, sortBy, sortMethod) {
    const ascendSortedUrls = urls.slice(0)
      .sort((first, second) =>
        first[sortBy].localeCompare(second[sortBy], 'en', {sensitivity: 'base'})
      );

    return sortMethod === 'ascend' ? ascendSortedUrls : ascendSortedUrls.reverse();
  }

  getSortedIndicatorClassName(column) {
    return column === this.state.sortBy ? `sorted-${this.state.sortMethod}` : '';
  }

  setSortedBy(columnName) {
    if (columnName === this.state.sortBy) {
      this.setState({sortBy: columnName, sortMethod: this.state.sortMethod === 'descend' ? 'ascend' : 'descend'});
    } else {
      this.setState({sortBy: columnName});
    }
  }

  getShortenedUrlHistory() {
    const sortedShortedUrls = this.sortUrls(this.props.shortedUrls, this.state.sortBy, this.state.sortMethod);

    return sortedShortedUrls.map((shortedUrl, index) =>
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
    const shortenedUrls = this.getShortenedUrlHistory();

    return (
      <div className="table usage-history-table">
        <div className="table-head">
          <div className={`table-column table-head-cell col-md-7 ${this.getSortedIndicatorClassName('originalUrl')}`}
               onClick={() => this.setSortedBy('originalUrl')}>
            Original Url
          </div>
          <div className={`table-column table-head-cell col-md-3 ${this.getSortedIndicatorClassName('shortenedUrl')}`}
               onClick={() => this.setSortedBy('shortenedUrl')}>
            Short Url
          </div>
          <div className={`table-column table-head-cell col-md-2 ${this.getSortedIndicatorClassName('createdTime')}`}
               onClick={() => this.setSortedBy('createdTime')}>
            Created
          </div>
        </div>
        <div className="table-content">
          {shortenedUrls}
        </div>
      </div>
    );
  }
}