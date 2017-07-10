import React, {Component} from 'react';
import ShortenUrl from './ShortenUrl.jsx';
import DataAnalyse from './DataAnalyse.jsx';
import './index.sass';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortedUrls: [],
    };

    this.onShortedUrlCreated = this.onShortedUrlCreated.bind(this);
  }

  onShortedUrlCreated(shortedUrl) {
    const shortedUrls = this.state.shortedUrls;
    if(shortedUrls.length === 0) {
      const updatedHistory = shortedUrls.concat([shortedUrl]);
      this.setState({shortedUrls: updatedHistory});
    } else {
      for (let i = 0; i < shortedUrls.length; i += 1) {
        if (shortedUrls[i].originalUrl !== shortedUrl.originalUrl) {
          const updatedHistory = shortedUrls.concat([shortedUrl]);
          this.setState({shortedUrls: updatedHistory});
        }
      }
    }
  }

  render() {
    return (
      <div className="container content">
        <ShortenUrl onShortedUrlCreated={this.onShortedUrlCreated}/>
        <DataAnalyse shortedUrls={this.state.shortedUrls}/>
      </div>
    )
  }
}