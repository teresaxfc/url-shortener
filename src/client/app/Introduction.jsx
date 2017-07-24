import React, {Component} from 'react';
import './Introduction.sass';

export default class Introduction extends React.Component {
  render() {
    return (
      <div className="introductions">
        <div className="introduction-title">
          <h2 className="shorten-url-form-title">CREATE SHORTEN URLS TO SHARE AND MORE</h2>
          <h4>It will be more easier with shortened urls. Check it out and make your day.
          </h4>
        </div>

        <div className="introduction-content">
          <div className="introduction-shorten-url">
            <div className="glyphicon glyphicon-link"></div>
            <h4>SHORTEN URL</h4>
            <div className="introduction-describe">Post your original url and get shortened url. Copy the shortened url
              and share.
            </div>
          </div>

          <div className="introduction-statistics">
            <div className="glyphicon glyphicon-stats"></div>
            <h4>CHECK STATISTICS</h4>
            <div className="introduction-describe">Get to know statistics about your shared urls.</div>
          </div>

          <div className="introduction-user-account">
            <div className="glyphicon glyphicon-user"></div>
            <h4>LOG IN ACCOUNT</h4>
            <div className="introduction-describe">Log in without sign up a new account.</div>
          </div>
        </div>
      </div>
    );
  }
}
