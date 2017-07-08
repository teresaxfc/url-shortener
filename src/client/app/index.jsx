import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Header.jsx';
import Content from './Content.jsx';
import './index.sass';

class App extends React.Component {
  render() {
    return (
      <div className="react-app">
        <Header />
        <Content />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

