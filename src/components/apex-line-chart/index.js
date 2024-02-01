import React from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = ({ data }) => {
  const transformDataForChart = (originalData) => {
    const chartData = [];

    originalData.forEach((dataPoint) => {
      const name = dataPoint.name;
      const mappedTitles = [];

      // Dynamically extract mapped titles from the original data
      for (let i = 0; i <= 7; i++) {
        const key = `mapped_title_${i}`;
        if (dataPoint[key]) {
          mappedTitles.push(dataPoint[key]);
        } else {
          // If there's no mapped title for the current key, break the loop
          break;
        }
      }

      // Add the transformed data point to chartData
      chartData.push({
        name,
        data: mappedTitles,
      });
    });

    return chartData;
  };

  const dynamicChartData = transformDataForChart(data);
  const options = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories: [
        "Job 0",
        "Job 1",
        "Job 2",
        "Job 3",
        "Job 4",
        "Job 5",
        "Job 6",
        "Job 7",
      ],
    },
  };

  return (
    <ReactApexChart
      options={options}
      series={dynamicChartData}
      type="line"
      height={350}
    />
  );
};

export default LineChart;
