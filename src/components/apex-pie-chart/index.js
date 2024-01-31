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
  };

  const series = data.map((data) => data.percentage);

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="pie"
        width={300}
        height={300}
      />
    
    </div>
  );
};

export default ApexPieChart;
