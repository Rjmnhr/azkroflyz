import React from "react";
import Plot from "react-plotly.js";

const HeatmapChart = ({ data }) => {
  // Extracting industry and employee count columns
  const industries = [];
  const empCounts = [];

  data.forEach((entry) => {
    for (let i = 1; i <= 7; i++) {
      const industryKey = `mapped_company_${i}_industry`;
      const empCountKey = `mapped_company_${i}_emp_count`;

      const industry = entry[industryKey];
      const empCount = entry[empCountKey];

      if (industry && empCount) {
        industries.push(industry);
        empCounts.push(empCount);
      }
    }
  });

  // Creating unique lists for industries and employee counts
  const uniqueIndustries = Array.from(new Set(industries));
  const uniqueEmpCounts = Array.from(new Set(empCounts));

  // Creating an empty 2D array to store counts for each combination
  const heatmapData = Array(uniqueEmpCounts.length)
    .fill()
    .map(() => Array(uniqueIndustries.length).fill(0));

  // Populating the counts in the 2D array
  data.forEach((entry) => {
    for (let i = 1; i <= 7; i++) {
      const industryKey = `mapped_company_${i}_industry`;
      const empCountKey = `mapped_company_${i}_emp_count`;

      const industry = entry[industryKey];
      const empCount = entry[empCountKey];

      if (industry && empCount) {
        const rowIndex = uniqueEmpCounts.indexOf(empCount);
        const colIndex = uniqueIndustries.indexOf(industry);

        heatmapData[rowIndex][colIndex]++;
      }
    }
  });

  // Creating the heatmap trace
  const heatmapTrace = {
    x: uniqueIndustries,
    y: uniqueEmpCounts,
    z: heatmapData,
    type: "heatmap",
    colorscale: "Viridis",
  };

  // Creating the layout
  const layout = {
    autosize: true,
    margin: {
      b: 100,
    },
  };

  return (
    <Plot
      data={[heatmapTrace]}
      layout={layout}
      config={{ displayModeBar: false }}
    />
  );
};

export default HeatmapChart;
