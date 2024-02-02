import React from 'react';
import Chart from 'react-apexcharts';

const ApexChart = ({ top5TitleData }) => {
  const options = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%', // Adjust as needed
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: top5TitleData.map(item => item.title),
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
      },
    },
    fill: {
      colors: ['#696cff'],
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function(val) {
          return val + '%';
        },
      },
    },
  };

  const series = [
    {
      name: 'Percentage',
      data: top5TitleData.map(item => item.percentage),
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={300}
    />
  );
};

export default ApexChart;
