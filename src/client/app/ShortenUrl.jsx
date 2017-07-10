import React, {Component} from 'react';
import axios from 'axios';
import './index.sass';

export default class ShortenUrl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      copiedUrl: '',
    };

    this.updateInputValue = this.updateInputValue.bind(this);
    this.getShortenedUrl = this.getShortenedUrl.bind(this);
    this.copyUrl = this.copyUrl.bind(this);
  }

  updateInputValue(event) {
    this.setState({inputValue: event.target.value});
  }

  getShortenedUrl() {
    if (this.state.inputValue.indexOf('localhost') < 0) {
      axios.post('/api/shorten', {originalUrl: this.state.inputValue})
        .then(response => {
          const shortenedUrl = `${response.data.shortenedUrl}`;
          const createdTime = `${response.data.created_at}`;
          const createdShortenedUrl = {
            originalUrl: this.state.inputValue,
            shortenedUrl: shortenedUrl,
            createdTime: createdTime
          };

          document.cookie = "newCreatedUrl=" + JSON.stringify(createdShortenedUrl) + ";";
          this.props.onShortedUrlCreated(createdShortenedUrl);
          this.setState({inputValue: shortenedUrl, copiedUrl: ''});
        })
        .catch(function (error) {
          this.setState({inputValue: error});
        });
    }
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

  render() {
    let copiedUrl = this.state.copiedUrl;

    return (
      <div className="jumbotron">
        <h1 className="title text-center">Shorten Your Link with ShortEn</h1>
        <form className="form-inline text-center">
          <div id="url-shorten-form">
            <input type="text" className="form-control" id="url-field"
                   placeholder="Paste a link to shorten it" onChange={this.updateInputValue}
                   value={this.state.inputValue} ref={(input) => {
              this.textInput = input;
            }}/>
            <button type="button" className="btn btn-primary" id="shorten-button" onClick={this.getShortenedUrl}>SHORTEN
            </button>
            <button type="button" className="btn btn-success" id="copy-button" onClick={this.copyUrl}>COPY</button>
          </div>
          <div className="copied-url">{copiedUrl}</div>
        </form>
      </div>
    );
  }
}
