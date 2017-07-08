import React, {Component} from 'react';
import Jumbotron from './Jumbotron.jsx';
import DataAnalyse from './DataAnalyse.jsx';
import './index.sass';

export default class Content extends React.Component {
  render() {
    return (
      <div className="container content">
        <Jumbotron />
        <DataAnalyse />
      </div>
    )
  }
}