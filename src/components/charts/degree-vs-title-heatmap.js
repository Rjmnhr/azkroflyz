import React from "react";
import Plot from "react-plotly.js";

const HeatmapChartDegreeVsTitle = ({ data }) => {
  // Extracting title and degree columns
  const titles = [];
  const degrees = [];

  data.forEach((entry) => {
    for (let i = 0; i <= 7; i++) {
      const titleKey = `mapped_title_${i}`;
      const degreeKey = `mapped_digree_${i}`;

      const title = entry[titleKey];
      const degree = entry[degreeKey];

      if (title || degree) {
        titles.push(title);
        degrees.push(degree);
      }
    }
  });

  // Creating unique lists for titles and degrees
  const uniqueTitles = Array.from(new Set(titles));
  const uniqueDegrees = Array.from(new Set(degrees));

  // Creating an empty 2D array to store counts for each combination
  const heatmapData = Array(uniqueDegrees.length)
    .fill()
    .map(() => Array(uniqueTitles.length).fill(0));

  // Populating the counts in the 2D array
  data.forEach((entry) => {
    for (let i = 0; i <= 7; i++) {
      const titleKey = `mapped_title_${i}`;
      const degreeKey = `mapped_digree_${i}`;

      const title = entry[titleKey];
      const degree = entry[degreeKey];

      if (title && degree) {
        const rowIndex = uniqueDegrees.indexOf(degree);
        const colIndex = uniqueTitles.indexOf(title);

        heatmapData[rowIndex][colIndex]++;
      }
    }
  });

  // Creating the heatmap trace
  const heatmapTrace = {
    x: uniqueTitles,
    y: uniqueDegrees,
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
    responsive: true, // Set the responsive attribute to true
  };

  const config = {
    responsive: true,
    displayModeBar: false,
  };
  return <Plot data={[heatmapTrace]} layout={layout} config={config} />;
};

export default HeatmapChartDegreeVsTitle;
