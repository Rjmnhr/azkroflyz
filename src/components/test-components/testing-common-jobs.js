import React, { useRef } from "react";
import { JobProfileOrganizationGraph } from "../charts/job-profile-flow-chart";
import { Carousel } from "antd";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

const CommonJobs = ({ jobData }) => {
  const countOccurrences = (values) => {
    const valueCount = {};

    values.forEach((value) => {
      if (value !== null) {
        valueCount[value] = (valueCount[value] || 0) + 1;
      }
    });

    return valueCount;
  };

  const findMostCommonValues = (values) => {
    const valueCount = countOccurrences(values);

    const sortedValues = Object.keys(valueCount)
      .filter((value) => valueCount[value] > 0)
      .sort((a, b) => valueCount[b] - valueCount[a])
      .slice(0, 2);

    return sortedValues;
  };

  const getCommonSectorsAndSizes = (title, index) => {
    const columnPrefix = `mapped_title_${index}`;

    const filteredProfiles = jobData.filter(
      (profile) => profile[columnPrefix] === title
    );

    const sectorValues = filteredProfiles.map(
      (profile) => profile[`mapped_company_${index}_industry`]
    );

    const sizeValues = filteredProfiles.map(
      (profile) => profile[`mapped_company_${index}_emp_count`]
    );

    // Exclude values equal to "unknown" for sectors
    const filteredSizeValues = sizeValues.filter(
      (value) => value !== "Unknown"
    );

    const commonSectors = findMostCommonValues(sectorValues);

    const commonSizes = findMostCommonValues(filteredSizeValues);

    return { sectors: commonSectors, sizes: commonSizes };
  };

  const commonTitles = [];
  for (let i = 0; i <= 5; i++) {
    commonTitles[i] = findMostCommonValues(
      jobData.map((job) => job[`mapped_title_${i}`])
    );
  }

  const finalArray = [];

  commonTitles.forEach((titles, index) => {
    const commonData = [];

    titles.forEach((title) => {
      commonData.push({
        title,
        ...getCommonSectorsAndSizes(title, index),
      });
    });

    finalArray.push(commonData);
  });

  const carouselRef = useRef(null);

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  return (
    <>
      <Carousel ref={carouselRef}>
        {finalArray.map((item, index) => {
          return (
            <div key={index}>
              {item.length > 1 ? (
                <JobProfileOrganizationGraph jobData={item} index={index + 1} />
              ) : (
                "no data"
              )}
            </div>
          );
        })}
      </Carousel>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn  btn-lg" onClick={handlePrev}>
          <LeftCircleOutlined style={{ fontSize: "40px" }} />
        </button>
        <button className="btn  btn-lg" onClick={handleNext}>
          <RightCircleOutlined style={{ fontSize: "40px" }} />
        </button>
      </div>
    </>
  );
};

export default CommonJobs;
