import React from 'react';
import {Line} from 'react-chartjs-2';

const Comparsion = (props) => {
  const data = {
    labels: props.timeArr89,
    datasets: [
      {
        label: "2008-2009",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,0.5)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(0, 0, 0, 0.5);',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,0.4)', //Hover pointer color
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: props.highArr89,
      },
    ]
  };
  return(
    <div>
      <Line data={data} />
    </div>
  );
}

export default Comparsion;

