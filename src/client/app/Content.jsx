import React, {Component} from 'react';
import ShortenUrlForm from './ShortenUrlForm.jsx';
import ShortenedUrlHistory from './ShortenedUrlHistory.jsx';
import Introduction from './Introduction.jsx';
import ShortenUrlService from '../lib/ShortenUrlService';

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
    return (
      <div className="container content">
        <ShortenUrlForm onShortedUrlCreated={this.onShortedUrlCreated} user={user}/>
        <ShortenedUrlHistory shortedUrls={this.state.shortedUrls}/>
        <Introduction />
      </div>
    )
  }
}