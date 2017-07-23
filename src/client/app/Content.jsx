import React, {Component} from 'react';
import ShortenUrlForm from './ShortenUrlForm.jsx';
import ShortenedUrlHistory from './ShortenedUrlHistory.jsx';
import Introduction from './Introduction.jsx';
import ShortenUrlService from '../lib/ShortenUrlService';
import './index.sass';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortedUrls: [],
    };

    this.onShortedUrlCreated = this.onShortedUrlCreated.bind(this);
    this.loadShortenedUrls = this.loadShortenedUrls.bind(this);
    this.shortedUrlService = new ShortenUrlService(props.user);
  }

  componentDidMount() {
    this.loadShortenedUrls();
  }

  onShortedUrlCreated() {
    this.loadShortenedUrls();
  }

  loadShortenedUrls() {
    this.shortedUrlService.getUrlHistory()
      .then(urls => this.setState({shortedUrls: urls}));
  }

  render() {
    let shortenedUrlHistory;
    if(this.state.shortedUrls.length === 0 && user === null) {
      shortenedUrlHistory = '';
    } else {
      shortenedUrlHistory = <ShortenedUrlHistory shortedUrls={this.state.shortedUrls}/>;
    }

    return (
      <div className="container content">
        <ShortenUrlForm onShortedUrlCreated={this.onShortedUrlCreated} user={user}/>
        {shortenedUrlHistory}
        <Introduction />
      </div>
    )
  }
}