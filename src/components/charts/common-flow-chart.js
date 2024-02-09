import React from "react";
import { OrganizationGraph } from "@ant-design/graphs";

export const CommonOrganizationGraph = ({ dataObject, title }) => {
  const convertToTree = (data) => {
    const result = {
      id: "root",
      value: {
        name: "Previous Job",
        title: title,

      },
      children: [
        {
          id: "c1",
          value: {
            name: "sectors",
          },
          children: [],
        },
        {
          id: "c2",
          value: {
            name: "sizes",
          },
          children: [],
        },
      ],
    };

    const addChildren = (parent, array, prefix) => {
      for (let i = 0; i < array.length; i++) {
        const id = `${prefix}-${i + 1}`;
        const child = {
          id,
          value: {
            name: array[i],
          },
          children: [],
        };
        parent.children.push(child);
      }
    };

    addChildren(result.children[0], data.sectors, "c1-1"); // "c1" is the sector's parent ID
    addChildren(result.children[1], data.sizes, "c2-1"); // "c2" is the sizes' parent ID

    return result;
  };

  const data = convertToTree(dataObject);

  return (
    <OrganizationGraph
      nodeCfg={{
        style: (node) => {
          return node.id === "root"
            ? {
                fill: "#91d5ff",
                stroke: "#91d5ff",
                padding: "10px",    
        
              }
            : {};
        },

        label: {
          style: (node, group, type) => {
            const styles = {
              icon: {
                width: 32,
                height: 32,
              },
              title: {
                fill: "black",
              },
              name: {
                fill: "#fff",
              },
            };
            return node.id === "root" ? styles[type] : {};
          },
        },
      }}
      behaviors={["drag-canvas"]}
      data={data}
    />
  );
};
