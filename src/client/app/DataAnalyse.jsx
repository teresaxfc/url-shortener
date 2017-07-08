import React, {Component} from 'react';
import './index.sass';

export default class DataAnalyse extends React.Component {
  render() {
    return (
      <table className="table table-hover usage-history">
        <thead>
        <tr>
          <th>Original URL</th>
          <th>Created</th>
          <th>Short URL</th>
          <th>All Clicks</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>Mark Mark Mark Mark Mark Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>123</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <td>Larry the Bird</td>
          <td>Larry the Bird</td>
          <td>@twitter</td>
          <td>@twitter</td>
        </tr>
        </tbody>
      </table>
    );
  }
}