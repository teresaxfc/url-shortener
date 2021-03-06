import React, {Component} from 'react';
import ShortenUrlService from '../lib/ShortenUrlService';
import './ShortenUrlForm.sass';

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
    this.setState({error: ''});
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
      }.bind(this), 800)
    }
  }

  PressEnterToCreateShortenUrl(event) {
    if (event.key == 'Enter') {
      event.preventDefault();
      this.createShortenedUrl();
    }
  }

  render() {
    let copiedUrl = this.state.copiedUrl;

    return (
      <div className="jumbotron text-center">
        <h1>Shorten Your Link Here</h1>
        <form>
          <div className="url">
            <input type="text" className="form-control url-field"
                   onKeyDown={this.PressEnterToCreateShortenUrl}
                   placeholder="Paste a link to shorten it" onChange={this.updateInputValue}
                   value={this.state.inputValue} ref={(input) => {
              this.textInput = input;
            }}/>
            <div className="copied-url">{copiedUrl}</div>
            <div className="error-message"><i>{this.state.error}</i></div>
          </div>
          <div>
            <button type="button" className="btn btn-primary shorten-button"
                    onClick={this.createShortenedUrl}>
              SHORTEN
            </button>
            <button type="button" className="btn btn-success copy-button"
                    onClick={this.copyUrl}>
              COPY
            </button>
          </div>
        </form>
      </div>
    );
  }
}
