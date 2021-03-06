import React, {Component} from 'react';
import moment from 'moment';
import './ShortenedUrlHistory.sass';
import Statistics from './Statistics.jsx';

export default class ShortenedUrlHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 1,
      sortBy: 'createdTime',
      sortMethod: 'descend',
      clickedIndex:null,
      statisticsStatus: 'hide',
    };

    this.getShortenedUrlHistory = this.getShortenedUrlHistory.bind(this);
    this.changeStatisticsStatus = this.changeStatisticsStatus.bind(this);
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

  changeStatisticsStatus(index) {
    this.setState({clickedIndex:index});
    const clickedIndex = this.state.clickedIndex;
    if(index === clickedIndex || clickedIndex === null) {
      const statisticsStatus = this.state.statisticsStatus;
      statisticsStatus === 'hide' ? this.setState({statisticsStatus: 'show'}) : this.setState({statisticsStatus: 'hide'})
    }
  }

  getShortenedUrlHistory() {
    const sortedShortedUrls = this.sortUrls(this.props.shortedUrls, this.state.sortBy, this.state.sortMethod);

    return sortedShortedUrls.map((shortedUrl, index) =>
      <div key={index} >
        <div className="urls">
          <div className="original-url">
            <a href={shortedUrl.originalUrl} className="url-link">{shortedUrl.originalUrl}</a></div>
          <div className="shortened-url">
            <a href={shortedUrl.shortenedUrl} className="url-link">{shortedUrl.shortenedUrl}</a></div>
          <div className="created">
            {moment(shortedUrl.createdTime).fromNow()}</div>
          <div className="statistics-handler" onClick={() => this.changeStatisticsStatus(index)}>
            <span className="glyphicon glyphicon-time"></span></div>
        </div>
        <Statistics onStatus={index === this.state.clickedIndex ? this.state.statisticsStatus : 'hide'}/>
      </div>
    );
  }

  render() {
    if (this.props.shortedUrls.length === 0) {
      return null;
    }

    const shortenedUrls = this.getShortenedUrlHistory();

    return (
      <div className="url-history">
        <div className="url-history-header">
          <div className={`url-history-header-original ${this.getSortedIndicatorClassName('originalUrl')}`}
               onClick={() => this.setSortedBy('originalUrl')}>
            Original Url
          </div>
          <div className={`url-history-header-shorten-url ${this.getSortedIndicatorClassName('shortenedUrl')}`}
               onClick={() => this.setSortedBy('shortenedUrl')}>
            Short Url
          </div>
          <div className={`url-history-header-created ${this.getSortedIndicatorClassName('createdTime')}`}
               onClick={() => this.setSortedBy('createdTime')}>
            Created
          </div>
          <div className='url-history-header-statistics'>Statistics</div>
        </div>
        {shortenedUrls}
      </div>
    );
  }
}