import React from "react";
import Chart from "react-apexcharts";

const ApexPieChart = ({ data }) => {
  const options = {
    labels: data.map((data) => data.skill),

    legend: {
      position: "bottom",
      itemMargin: {
        horizontal: 5, // Set the horizontal spacing between legend items
        vertical: 10, // Set the vertical spacing between legend items
      },
      formatter: function (seriesName) {
        return seriesName; // Customize the legend item format as needed
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -15, // Adjust the position of the data labels
          minAngleToShowLabel: 10, // Minimum angle to show data label (optional)
          style: {
            fontSize: "16px",
          },
        },
      },
    },
  };

  const series = data.map((data) => data.percentage);

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="pie"
        width={350}
        height={350}
      />
    
    </div>
  );
};

export default ApexPieChart;
