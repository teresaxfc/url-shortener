import React, {Component} from 'react';
import Jumbotron from './Jumbotron.jsx';
import DataAnalyse from './DataAnalyse.jsx';
import './index.sass';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortedUrls:[],
    };

    this.onShortedUrlCreated = this.onShortedUrlCreated.bind(this);
  }

  onShortedUrlCreated(shortedUrl) {
    const updatedHistory = this.state.shortedUrls.concat([shortedUrl]);
    this.setState({shortedUrls:updatedHistory});
  }

  render() {
    return (
      <div className="container content">
        <Jumbotron onShortedUrlCreated={this.onShortedUrlCreated}/>
        <DataAnalyse shortedUrls={this.state.shortedUrls}/>
      </div>
    )
  }
}