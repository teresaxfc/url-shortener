import React, {Component} from 'react';
import ShortenUrlService from '../lib/ShortenUrlService';
import './index.sass';

export default class ShortenUrlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      copiedUrl: '',
      error: ''
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.createShortenedUrl = this.createShortenedUrl.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
    this.PressEnterToCreateShortenUrl = this.PressEnterToCreateShortenUrl.bind(this);

    this.shortedUrlService = new ShortenUrlService(props.user);
  }

  updateInputValue(event) {
    this.setState({inputValue: event.target.value});
  }

  createShortenedUrl() {
    const inputUrl = this.state.inputValue;
    this.shortedUrlService.createShortenUrl(inputUrl)
      .then(url => this.setState({inputValue: url.shortenedUrl}))
      .then(() => this.props.onShortedUrlCreated())
      .catch((error) => this.setState({error: error}));
  }

  copyUrl() {
    if (this.state.inputValue !== '') {
      this.textInput.select();
      document.execCommand('copy');
      this.setState({copiedUrl: this.state.inputValue});

      setTimeout(function () {
        this.setState({copiedUrl: ''});
      }.bind(this), 1000)
    }
  }

  PressEnterToCreateShortenUrl(event) {
    if(event.key == 'Enter'){
      this.createShortenedUrl();
    }
  }

  render() {
    let copiedUrl = this.state.copiedUrl;

    return (
      <div className="jumbotron">
        <h1 className="title text-center">Shorten Your Link with ShortEn</h1>
        <form className="form-inline text-center">
          <div id="url-shorten-form">
            <input type="text" className="form-control" id="url-field"  tabIndex="0" onKeyDown={this.PressEnterToCreateShortenUrl}
                   placeholder="Paste a link to shorten it" onChange={this.updateInputValue}
                   value={this.state.inputValue} ref={(input) => {
              this.textInput = input;
            }}/>
            <button type="button" className="btn btn-primary" id="shorten-button" onClick={this.createShortenedUrl}>
              SHORTEN
            </button>
            <button type="button" className="btn btn-success" id="copy-button" onClick={this.copyUrl}>COPY</button>
          </div>
          <div className="copied-url">{copiedUrl}</div>
        </form>
        <div className="error-message">{this.state.error}</div>
      </div>
    );
  }
}
