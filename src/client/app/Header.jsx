import React, {Component} from 'react';
import './index.sass';

export default class Header extends React.Component {
  render() {
      const userMenu = () =>
        <div className="dropdown">
          <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                  aria-expanded="false" id="drop-down-menu">
            {this.props.user.name.givenName} {this.props.user.name.familyName}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
            <li><a href="#">Settings</a></li>
            <li><a href="/logout" className="log-out">Log Out</a></li>
          </ul>
        </div>;

      const userLogin = () =>
        <a href="/auth/facebook" className="btn btn-primary" id="facebook">
          <span className="fa fa-facebook"></span> Facebook</a>;

    return (
      <div className="container-fluid header">
        <a href="/"><h2 className="shorten-logo">ShortEn</h2></a>
        <div className="button-wrap">
          {this.props.user === null ? userLogin() : userMenu()}
        </div>
      </div>
    );
  }
}
