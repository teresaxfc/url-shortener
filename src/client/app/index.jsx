import React, {Component} from 'react';
import {render} from 'react-dom';
import Header from './Header.jsx';
import Content from './Content.jsx';

class App extends React.Component {
  render() {
    return (
      <div className="react-app">
        <Header user={user}/>
        <Content user={user}/>
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));

