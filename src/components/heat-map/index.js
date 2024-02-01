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

  const extractRangeValues = (range) => {
    const [min, max] = range.split("-").map((value) => parseInt(value, 10));
    return { min, max };
  };

  // Creating unique lists for industries and employee counts
  const uniqueIndustries = Array.from(new Set(industries));
  const uniqueEmpCounts = Array.from(new Set(empCounts));

  const sortedUniqueEmpCounts = uniqueEmpCounts.sort((a, b) => {
    // Handle the case where one of the company sizes is "Unknown"
    if (a === "Unknown") return 1;
    if (b === "Unknown") return -1;

    const aValues = extractRangeValues(a);
    const bValues = extractRangeValues(b);

    // Compare the minimum values first, then the maximum values
    return aValues.min - bValues.min || aValues.max - bValues.max;
  });

  // Creating an empty 2D array to store counts for each combination
  const heatmapData = Array(sortedUniqueEmpCounts.length)
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
        const rowIndex = sortedUniqueEmpCounts.indexOf(empCount);
        const colIndex = uniqueIndustries.indexOf(industry);

        heatmapData[rowIndex][colIndex]++;
      }
    }
  });

  // Creating the heatmap trace
  const heatmapTrace = {
    x: uniqueIndustries,
    y: sortedUniqueEmpCounts,
    z: heatmapData,
    type: "heatmap",
    colorscale: [
      [0, "RGB(158, 160, 255)"], // color for 0 value
      [0.2, "RGB(105, 255, 196)"], // color for low values
      [0.4, "RGB(255, 105, 112)"],
      [0.6, "RGB(158, 160, 255)"],
      [1, "RGB(74, 76, 184)"], // color for high values
    ],
    zmin: 0, // Minimum value for the color scale
    zmax: 2, // Maximum value for the color scale
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
