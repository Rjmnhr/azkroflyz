import HorizontalBarGraph from "@chartiful/react-horizontal-bar-graph";
import VerticalBarGraph from "@chartiful/react-vertical-bar-graph";
const VerticalBarGraphComponent = () => {
  return (
    <div>
      {/* <VerticalBarGraph
        data={[20, 45, 28, 80, 99, 43, 50]}
        labels={["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]}
        width={300}
        height={300}
        barRadius={0}
        barWidthPercentage={0.65}
        baseConfig={{
          hasXAxisBackgroundLines: false,
          xAxisLabelStyle: {
            position: "left",
          },
        }}
        style={{}}
      /> */}

      <HorizontalBarGraph
        data={[125, 100, 50, 75, 100, 125]}
        labels={[
          "Q1, 2019",
          "Q2, 2019",
          "Q3, 2019",
          "Q4, 2019",
          "Q1, 2020",
          "Q2, 2020",
        ]}
        width={500}
        height={300}
        barRadius={0}
        baseConfig={{
          hasYAxisBackgroundLines: false,
          hasAxisBackgroundLines: false,
          xAxisLabelStyle: {
            position: "absolute",
            color: "red",
          },
          yAxisLabelStyle: {},
        }}
        style={{}}
      />
    </div>
  );
};

export default VerticalBarGraphComponent;
