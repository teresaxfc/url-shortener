import React, {Component} from 'react';
import './index.sass';

export default class Introduction extends React.Component {
  render() {
    return (
      <div className="introduction">
        <div className="intro-title row">
          <h2 className="intro-main-title">CREATE SHORTEN URLS TO SHARE AND MORE</h2>
          <h4 className="intro-sub-title">It will be more easier with shortened urls. Check it out and make your day.
          </h4>
        </div>

        <div className="intro-content row">
          <div className="shorten-intro col-xs-12 col-md-4">
            <div className="glyphicon glyphicon-link"></div>
            <h4 className="shorten-intro sub-title">SHORTEN URL</h4>
            <div className="shorten-intro-content intro-describe">Post your original url and get shortened url. Copy the shortened url
              and share.
            </div>
          </div>

          <div className="statistic-intro col-xs-12 col-md-4">
            <div className="glyphicon glyphicon-stats"></div>
            <h4 className="statistic-intro sub-title">CHECK STATISTICS</h4>
            <div className="statistic-intro-content intro-describe">Get to know statistics about your shared urls.</div>
          </div>

          <div className="statistic-intro col-xs-12 col-md-4">
            <div className="glyphicon glyphicon-user"></div>
            <h4 className="statistic-intro sub-title">LOG IN ACCOUNT</h4>
            <div className="statistic-intro-content intro-describe">Log in without sign up a new account.</div>
          </div>
        </div>
      </div>
    );
  }
}
