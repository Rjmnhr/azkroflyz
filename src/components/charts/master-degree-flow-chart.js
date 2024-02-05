import React from "react";
import { OrganizationGraph } from "@ant-design/graphs";
import { formatTextValue } from "../../utils/tool-helper-functions";

export const MasterDegreeOrganizationGraph = ({ degreeData }) => {
  console.log("🚀 ~ MasterDegreeOrganizationGraph ~ degreeData:", degreeData)
  const convertData = (inputArray) => {
    const result = {
      id: "root",
      value: {
        name: "Top Master Degrees",
      },
      children: [],
    };

    inputArray.forEach((item, index) => {
      const degreeNode = {
        id: `c${index + 1}`,
        value: {
          name: item.degree,
          level: 2,
        },
        children: item.colleges.map((college, subIndex) => ({
          id: `c${index + 1}-${subIndex + 1}`,
          value: {
            name: formatTextValue(college),
          },
        })),
      };

      result.children.push(degreeNode);
    });

    return result;
  };

  // Convert the input array to the desired format
  const data = convertData(degreeData);
  const getTextStyle = (level) => {
    switch (level) {
      case 1:
        return 18;
      case 2:
        return 12;
      default:
        return 12;
    }
  };

  const getRootTextAttrs = () => {
    return {
      fontSize: getTextStyle(1),
      fontWeight: "bold",
      fill: "#fff",
    };
  };

  const getSecondTextStyle = () => {
    return {
      fontSize: getTextStyle(2),
      color: "#000",
    };
  };

  const getRootNodeStyle = () => {
    return {
      fill: "#1E88E5",
      stroke: "#1E88E5",
      radius: 5,
    };
  };

  const getSecondNodeStyle = () => {
    return {
      fill: "#e8e8e8",
      stroke: "#e8e8e8",
      radius: 5,
    };
  };

  const calcStrLen = function calcStrLen(str) {
    var len = 0;
    for (var i = 0; i < str.length; i++) {
      if (str.charCodeAt(i) > 0 && str.charCodeAt(i) < 128) {
        len++;
      } else {
        len += 2;
      }
    }
    return len;
  };

  const config = {
    nodeCfg: {
      size: [40, 40],
      autoWidth: true,
      padding: 10,
      style: (item) => {
        const { level } = item.value;
        return {
          fill: "transparent",
          stroke: "transparent",
          radius: 4,
          cursor: "pointer",
          ...(level === 1 ? getRootNodeStyle() : {}),
          ...(level === 2 ? getSecondNodeStyle() : {}),
        };
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 2,
          stroke: "#96DEFF",
        },
      },
      label: {
        style: (cfg, group, type) => {
          const { level, href } = cfg.value;

          if (type !== "name") {
            return {};
          }
          return {
            fontSize: getTextStyle(),
            cursor: "pointer",
            fill: href ? "#1890ff" : "#000",
            ...(level === 1 ? getRootTextAttrs() : {}),
            ...(level === 2 ? getSecondTextStyle() : {}),
          };
        },
      },
      anchorPoints: [
        [0, 0.5],
        [1, 0.5],
      ],
    },
    edgeCfg: {
      type: "polyline",
      style: {
        stroke: "#000",
        endArrow: false,
      },
    },
    markerCfg: (cfg) => {
      const { level, direction } = cfg.value;
      const show = level !== 1 && cfg.children && cfg.children.length > 0;
      return {
        position: direction,
        show,
      };
    },
    layout: {
      type: "mindmap",
      direction: "H",
      getWidth: (cfg) => {
        const { name, level } = cfg.value;
        const fontSize = getTextStyle(level);
        const width = (fontSize * calcStrLen(name)) / 2;
        return width;
      },
      getHeight: () => {
        return 25;
      },
      getVGap: () => {
        return 20;
      },
      getHGap: () => {
        return 40;
      },
      getSide: (d) => {
        return d.data.value.direction === "left" ? "left" : "right";
      },
    },
    autoFit: true,
    fitCenter: true,
    animate: false,
    behaviors: ["drag-canvas"],
    onReady: (graph) => {
      graph.on("node:click", (evt) => {
        const { item } = evt;
        const { value } = item.get("model");
        if (value.href) {
          window.open(value.href);
        }
      });
    },
  };
  return  (
    <>
    {degreeData.length > 1 ?  <OrganizationGraph {...config} data={data} /> : <p>No data found</p> }
   
    </>
  );
};
