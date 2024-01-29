import React from "react";
import HeatmapGrid from "react-heatmap-grid";

const HeatmapChart = ({ data }) => {
  // Prepare data for the heatmap
  const heatmapData = data.map((profile) => {
    const industries = [];
    const empCounts = [];

    for (let i = 1; i <= 7; i++) {
      const industryKey = `mapped_company_${i}_industry`;
      const empCountKey = `mapped_company_${i}_emp_count`;

      const industry = profile[industryKey];
      const empCount = profile[empCountKey];

      if (industry && empCount) {
        industries.push(industry);
        empCounts.push(empCount);
      }
    }

    return { industries, empCounts };
  });

  // Extract unique values for x-axis (sectors) and y-axis (employee counts)
  const uniqueXValues = [
    ...new Set(heatmapData.flatMap((item) => item.industries)),
  ];
  const uniqueYValues = [
    ...new Set(heatmapData.flatMap((item) => item.empCounts)),
  ];

  // Create the heatmap data array
  const heatmapValues = heatmapData.flatMap((item) =>
    item.industries.map((industry, index) => ({
      x: uniqueXValues.indexOf(industry),
      y: uniqueYValues.indexOf(item.empCounts[index]),
      value: 1, // You can customize this value based on your requirements
    }))
  );
  console.log("🚀 ~ HeatmapChart ~ heatmapValues:", heatmapValues)

  return (
    <HeatmapGrid
      xLabels={uniqueXValues}
      yLabels={uniqueYValues}
      data={heatmapValues}
      height={400}
      xLabelWidth={60}
      cellRender={(x, y, value) => value}
      cellStyle={(background, value, min, max, data, x, y) => ({
        background: `rgb(66, 99, 217, ${1 - (max - value) / (max - min)})`,
        fontSize: "11px",
        color: "#000",
      })}
    />
  );
};

export default HeatmapChart;
