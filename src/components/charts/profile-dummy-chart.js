import React from "react";
import Chart from "react-apexcharts";

let config = {
  colors: {
    primary: "#696cff",
    secondary: "#8592a3",
    success: "#71dd37",
    info: "#03c3ec",
    warning: "#ffab00",
    danger: "#ff3e1d",
    dark: "#233446",
    black: "#000",
    white: "#fff",
    body: "#f4f5fb",
    headingColor: "#566a7f",
    axisColor: "#a1acb8",
    borderColor: "#eceef1",
  },
};

const ApexChartDummy = () => {
  const profileReportChartConfig = {
    chart: {
      height: 80,
      // width: 175,
      type: "line",
      toolbar: {
        show: false,
      },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 5,
        blur: 3,
        color: config.colors.warning,
        opacity: 0.15,
      },
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      show: false,
      padding: {
        right: 8,
      },
    },
    colors: [config.colors.warning],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 5,
      curve: "smooth",
    },

    xaxis: {
      show: false,
      lines: {
        show: false,
      },
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  const series = [
    {
      data: [110, 270, 145, 245, 205, 285],
    },
  ];

  return (
    <Chart
      options={profileReportChartConfig}
      series={series}
      type="line"
      height={100}
    />
  );
};

export default ApexChartDummy;
