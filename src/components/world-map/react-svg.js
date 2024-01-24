// WorldMapComponent.jsx
import React, { useState, useEffect } from "react";
import India from "@svg-maps/india";
import { SVGMap } from "react-svg-map";
import "react-svg-map/lib/index.css"; // Ensure you import the styles
import { CitiesOfIndia } from "../constants/cities";
import { StateCodes } from "../constants/states";
import { WorldMapComponentStyled } from "./style";

const WorldMapComponent = ({ topCities }) => {
  const [highlightedStates, setHighlightedStates] = useState([]);

  useEffect(() => {
    // Extract state codes from the top cities
    const stateCodes = topCities
      .map((city) => {
        const cityData = CitiesOfIndia.find((c) => c.name === city);
        if (cityData) {
          const stateName = cityData.state;
          return Object.keys(StateCodes)
            .find((code) => StateCodes[code] === stateName)
            ?.toLowerCase();
        }
        return null;
      })
      .filter(Boolean);

    setHighlightedStates(stateCodes);
  }, [topCities]);

  const generateCSSRule = (stateCode) => `#${stateCode}`;

  return (
    <div>
      <WorldMapComponentStyled>
        <India/>
        <SVGMap map={India} />
        <style>
          {highlightedStates
            .map((stateCode) => generateCSSRule(stateCode))
            .join(",") + " { fill: rgb(23, 78, 166) !important; }"}
        </style>
      </WorldMapComponentStyled>
    </div>
  );
};

export default WorldMapComponent;
