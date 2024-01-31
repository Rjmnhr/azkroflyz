import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => {
  // Extracting UG degree and mapped titles columns
  const ugDegrees = [];
  const mappedTitles = [];

  data.forEach((entry) => {
    for (let i = 1; i <= 7; i++) {
      const degreeKey = `mapped_digree_${i}`;
      const titleKey = `mapped_title_${i}`;

      const degree = entry[degreeKey];
      const title = entry[titleKey];

      if (degree && title) {
        ugDegrees.push(degree);
        mappedTitles.push(title);
      }
    }
  });

  // Creating unique lists for UG degrees and mapped titles
  const uniqueMappedTitles = Array.from(new Set(mappedTitles));

  // Creating an empty object to store counts for each combination
  const barChartData = {};

  // Populating the counts in the object
  data.forEach((entry) => {
    for (let i = 1; i <= 7; i++) {
      const degreeKey = `mapped_digree_${i}`;
      const titleKey = `mapped_title_${i}`;

      const degree = entry[degreeKey];
      const title = entry[titleKey];

      if (degree && title) {
        if (!barChartData[degree]) {
          barChartData[degree] = {};
        }

        if (!barChartData[degree][title]) {
          barChartData[degree][title] = 0;
        }

        barChartData[degree][title]++;
      }
    }
  });

  // Transform data for Recharts
  const chartData = Object.keys(barChartData).map((degree) => ({
    degree,
    ...barChartData[degree],
  }));

  // Creating bars for each mapped title
  const bars = uniqueMappedTitles.map((title, index) => (
    <Bar key={index} dataKey={title} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
  ));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="degree" />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
