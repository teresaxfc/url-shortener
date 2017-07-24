import React, {Component} from 'react';
import {ButtonToolbar} from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';
import './Header.sass';

export default class Header extends React.Component {
  render() {
    const userMenu = () =>
      <DropdownButton title={this.props.user.firstName + ' ' + this.props.user.lastName} id="user-menu"
                      pullRight={true}>
        <MenuItem href="#">Settings</MenuItem>
        <MenuItem divider/>
        <MenuItem href="/logout" className="log-out">Log Out</MenuItem>
      </DropdownButton>;

    const userLogin = () =>
      <DropdownButton title="Log In" id="login-menu" pullRight={true}>
        <MenuItem href="/auth/facebook" bsStyle='primary' id="facebook">
          <span className="fa fa-facebook"></span> Facebook</MenuItem>
        <MenuItem href="/auth/twitter" bsStyle='info' id="twitter">
          <span className="fa fa-twitter"></span> Twitter</MenuItem>
        <MenuItem href="/auth/google" bsStyle='danger' id="google">
          <span className="fa fa-google-plus"></span> Google</MenuItem>
      </DropdownButton>;

    return (
      <div className="container-fluid header">
        <a href="/" className="shorten-logo">ShortEn</a>
        <ButtonToolbar className="menu">
          {this.props.user === null ? userLogin() : userMenu()}
        </ButtonToolbar>
      </div>
    );
  }
}
