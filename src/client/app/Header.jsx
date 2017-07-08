import React, {Component} from 'react';
import './index.sass';

export default class Header extends React.Component {
  render() {
    return (
      <div className="container-fluid header">
        <a href="/"><h2 className="shorten-logo">ShortEn</h2></a>
        <div className="button-wrap">
          {/*<div className="dropdown">*/}
          {/*<p className="dropbtn">{userName}</p>*/}
          {/*<ul className="dropdown-content">*/}
          {/*<li>Settings</li>*/}
          {/*<li><a href="/logout" className="log-out">Log Out</a></li>*/}
          {/*</ul>*/}
          {/*</div>*/}
          <a href="/auth/facebook" className="btn btn-primary" id="facebook">
            <span className="fa fa-facebook"></span>
            Facebook</a>
        </div>
      </div>
    );
  }
}



