import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale,BarElement, Tooltip} from "chart.js";
Chart.register(CategoryScale,LinearScale,BarElement, Tooltip );
const VoteChart = ({ choices, id }) => {
  const chartID = id;
  const labels = choices.map((choice) => choice.content);
  const data = choices.map((choice) => choice.number);  
  
  const adjustedLabels = labels.map((label)=>{
    if (label.length <= 30) {
      return [label];
    }  
    const result = [];
    let start = 0;  
    while (start < label.length) {
      let end = start + 30;     

      while (label[end] !== ' ' && end > start) {
        end--;
      }
  
      if (end === start) {
        end = start + 30;
      }
  
      result.push(label.substring(start, end).trim());
      start = end + 1; 
    }  
    return result;
  });

  const chartData = {
    labels: adjustedLabels,
    datasets: [
      {
        label: 'Votes',
        data: data,
        backgroundColor: 'rgba(75,192,192,0.4)', 
        borderColor: 'rgba(75,192,192,1)', 
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)', 
        hoverBorderColor: 'rgba(75,192,192,1)',         
      },
    ],
  };

  const chartOptions = {
    indexAxis: 'y',
    layout: {
      padding: {
          left: 20
      }
    },
    scales: {
      y:{
        afterFit: function(scaleInstance) {
          scaleInstance.width = 200; 
          scaleInstance.wrap = true;
        }
      }
    },
    plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
          callbacks: {
            label: (context) => context.parsed.x + " phiếu",
          },
        },
        datalabels: {
          display: false,
        },
      },    
    responsive: true,    
};  

  return (
    <div>      
      <Bar type="bar" key={chartID} data={chartData} options={chartOptions} />
    </div>
  );
};

export default VoteChart;