import React from 'react';
import {Line} from 'react-chartjs-2';

const YieldLine = (props) => {
    const data = {
        labels: props.timeArr,
        datasets: [
          {
            label: "1 Year",
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.oneArr,
          },
          {
            label: "10 Year",
            fill: false,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,145,192,0.4)',
            borderColor: 'rgba(75,145,192,0.5)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,145,192,0.4)',
            pointBackgroundColor: 'rgba(75,145,192,0.4)',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,145,192,0.4)', //Hover pointer color
            pointHoverBorderColor: 'rgba(75,145,192,0.4)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: props.tenArr,
          },
        ]
      };
      return(
        <div>
          <Line data={data} />
        </div>
      )
}

export default YieldLine;