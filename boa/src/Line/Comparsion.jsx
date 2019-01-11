import React from 'react';
import {Line} from 'react-chartjs-2';

const Comparsion = (props) => {
  const data = {
    labels: props.timeArr78,
    datasets: [
      {
        label: "2007-2008",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(225,0,0,0.4)',
        borderColor: "red",
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
        data: props.highArr78,
      },
      {
        label: "2008-2009",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(0, 0, 0, 0.5);',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0, 0, 0, 0.5);',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.5);',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.highArr89,
      },
      {
        label: "2009-2010",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(34,14,243,0.4)',
        borderColor: 'rgba(0, 0, 0, 0.5);',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0, 0, 0, 0.5);',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(0, 0, 0, 0.5);',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.highArr0910,
      }
    ]
  };
  return(
    <div>
      <Line data={data} />
    </div>
  );
}

export default Comparsion;

