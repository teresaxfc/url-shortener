import React, {Component} from 'react';
import './Statistics.sass';

export default class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const clickedByDay = this.refs.clickedByDay;
    const clickedByDayData = [{
      x: [21, 22, 23, 24, 25, 26, 27],
      y: [1, 2, 4, 8, 16, 18, 23],
      mode: 'markers',
      marker: {
        color: 'rgb(234, 153, 153)',
        size: 12
      },
      connectgaps: true
    }];
    const clickedByDayDataLayOut =
      {
        title: 'CLICKED BY DAYS',
        xaxis: {
          title: 'Dates',
          showgrid: false,
          zeroline: false
        },
        yaxis: {
          title: 'Clicked Counts',
          showline: false
        }
      };
    Plotly.plot(clickedByDay, clickedByDayData, clickedByDayDataLayOut);

    const clickedByHours = this.refs.clickedByHours;
    const clickedByHoursData = [{
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
      y: [1, 2, 4, 8, 16, 5, 2, 4, 8, 21, 1, 8, 4, 8, 18, 7, 2, 4, 10, 16, 5, 2, 6, 8],
      mode: 'lines+markers',
      line: {
        color: 'rgb(164, 194, 244)',
        width: 3
      },
      marker: {
        color: 'rgb(142, 124, 195)',
        size: 8
      },
      connectgaps: true
    }];
    const clickedByHoursLayOut = {
      title: 'CLICKED BY HOURS',
      xaxis: {
        title: 'Hours',
        showgrid: false,
        zeroline: false
      },
      yaxis: {
        title: 'Clicked Counts',
        showline: false
      }
    };
    Plotly.plot(clickedByHours, clickedByHoursData, clickedByHoursLayOut);
  }

  render() {
    return (
      <div className={`statistics-${this.props.onStatus}`}>
        <div className="statistics-graph">
          <div className="clicked-by-day">
            <div id='clicked-by-day' ref="clickedByDay"></div>
          </div>
          <div className="clicked-by-hours">
            <div id='clicked-by-hours' ref="clickedByHours"></div>
          </div>
          <a href="" id="more-statistics"><i>More...</i></a>
        </div>
      </div>
    );
  }
}