import React, {Component} from 'react';
import './index.sass';

export default class DataAnalyse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 1,
    };
  }

  render() {
    const shortenedUrls = this.props.shortedUrls.map((shortedUrl,index) =>
      <tr key={index}>
        <td><a href={shortedUrl.originalUrl}>{shortedUrl.originalUrl}</a></td>
        <td><a href={shortedUrl.originalUrl}>{shortedUrl.shortenedUrl}</a></td>
        <td><a href={shortedUrl.originalUrl}>{shortedUrl.createdTime}</a></td>
      </tr>
    );

    return (
      <table className="table table-hover usage-history">
        <thead>
        <tr>
          <th>Original URL</th>
          <th>Short URL</th>
          <th>Created</th>
        </tr>
        </thead>
        <tbody>
        {shortenedUrls}
        </tbody>
      </table>
    );
  }
}