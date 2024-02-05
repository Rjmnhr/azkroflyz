import React from "react";
import { OrganizationGraph } from "@ant-design/graphs";

export const JobProfileOrganizationGraph = ({ jobData, index }) => {
  function convertData(inputData) {
    const root = {
      id: "root",
      value: {
        name: index === 1 ? `Current Job` : `Previous job ${index - 1}`,
      },
      children: [],
    };

    inputData.forEach((titleData, titleIndex) => {
      const titleNode = {
        id: `c-${titleIndex + 1}`,
        value: {
          name: titleData.title,
        },
        children: [],
      };

      const sectorBranch = {
        id: `c-1-${titleIndex + 1}-sectors`,
        value: {
          name: "Sectors",
        },
        children: [],
      };

      titleData.sectors.forEach((sector, sectorIndex) => {
        const sectorNode = {
          id: `c-1-${titleIndex + 1}-sector-${sectorIndex + 1}`,
          value: {
            name: sector,
          },
        };
        sectorBranch.children.push(sectorNode);
      });

      const sizeBranch = {
        id: `c-1-${titleIndex + 1}-sizes`,
        value: {
          name: "Sizes",
        },
        children: [],
      };

      titleData.sizes.forEach((size, sizeIndex) => {
        const sizeNode = {
          id: `c-1-${titleIndex + 1}-size-${sizeIndex + 1}`,
          value: {
            name: size,
          },
        };
        sizeBranch.children.push(sizeNode);
      });

      // Add a list of last children nodes
      const lastChildrenList = [];
      if (titleIndex === inputData.length - 1) {
        titleData.sectors.forEach((sector, sectorIndex) => {
          const sectorNode = {
            id: `c-1-${titleIndex + 1}-sector-last-${sectorIndex + 1}`,
            value: {
              name: sector,
            },
          };
          lastChildrenList.push(sectorNode);
        });

        titleData.sizes.forEach((size, sizeIndex) => {
          const sizeNode = {
            id: `c-1-${titleIndex + 1}-size-last-${sizeIndex + 1}`,
            value: {
              name: size,
            },
          };
          lastChildrenList.push(sizeNode);
        });
      }

      titleNode.children.push(sectorBranch, sizeBranch);
      root.children.push(titleNode);
    });

    return root;
  }
  // Convert the input array to the desired format
  const data = convertData(jobData);

  return (
    <OrganizationGraph
      nodeCfg={{
        style: (node) => {
          return node.id === "root"
            ? {
                fill: "#91d5ff",
                stroke: "#91d5ff",
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
                fill: "#fff",
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
