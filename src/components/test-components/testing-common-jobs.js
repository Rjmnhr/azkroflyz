import React from "react";

import { CareerTimeline } from "./time-line";

function calculateAverageJobDuration(data, title, index) {
  // Filter profiles based on title and index
  const filteredProfiles = data.filter(
    (profile) => profile[`mapped_title_${index}`] === title
  );

  // Extract job duration values for the filtered profiles
  const jobDurationValues = filteredProfiles.map(
    (profile) => profile[`job_${index}_duration`]
  );

  // Filter out null and undefined values
  const validJobDurationValues = jobDurationValues.filter(
    (value) => value !== null && value !== undefined
  );

  // Calculate the average
  const average =
    validJobDurationValues.reduce((sum, value) => sum + value, 0) /
    validJobDurationValues.length;

  const roundedAverage = Math.round(average / 12);
  return roundedAverage;
}

const findMostCommonValues = (values, boolean) => {
  const valueCount = countOccurrences(values);

  const sortedValues = Object.keys(valueCount)
    .filter((value) => valueCount[value] > 0)
    .sort((a, b) => valueCount[b] - valueCount[a])
    .slice(0, 5);

  return sortedValues;
};

const countOccurrences = (values) => {
  const valueCount = {};

  values.forEach((value) => {
    if (value !== null) {
      valueCount[value] = (valueCount[value] || 0) + 1;
    }
  });

  return valueCount;
};

const CommonJobs = ({ jobData, desiredTitle }) => {
  const filteredProfiles = jobData.filter(
    (profile) => profile.mapped_title_0 === desiredTitle
  );

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

    const commonSectors = findMostCommonValues(sectorValues, true);

    const commonSizes = findMostCommonValues(filteredSizeValues, true);

    return { sectors: commonSectors, sizes: commonSizes };
  };

  const commonTitles = [];
  for (let i = 0; i <= 5; i++) {
    commonTitles[i] = findMostCommonValues(
      filteredProfiles.map((job) => job[`mapped_title_${i}`])
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

  // Extracting prevTitle1
  const prevTitle1 = (() => {
    for (let i = 0; i < commonTitles[1].length; i++) {
      const candidate = commonTitles[1][i];
      if (candidate !== desiredTitle) {
        return candidate;
      }
    }
    return null; // Handle the case when no match is found
  })();

  // Extracting prevTitle2
  const prevTitle2 = (() => {
    for (let i = 0; i < commonTitles[2].length; i++) {
      const candidate = commonTitles[2][i];
      if (candidate !== desiredTitle && candidate !== prevTitle1) {
        return candidate;
      }
    }
    return null; // Handle the case when no match is found
  })();

  const prevTitle3 = (() => {
    for (let i = 0; i < commonTitles[3].length; i++) {
      const candidate = commonTitles[3][i];
      if (
        candidate !== desiredTitle &&
        candidate !== prevTitle1 &&
        candidate !== prevTitle2
      ) {
        return candidate;
      }
    }
    return null; // Handle the case when no match is found
  })();

  const prevTitle4 = (() => {
    for (let i = 0; i < commonTitles[4].length; i++) {
      const candidate = commonTitles[4][i];
      if (
        candidate !== desiredTitle &&
        candidate !== prevTitle1 &&
        candidate !== prevTitle2 &&
        candidate !== prevTitle3
      ) {
        return candidate;
      }
    }
    return null; // Handle the case when no match is found
  })();

  const commonSectorAndSizesForDesiredTitle = getCommonSectorsAndSizes(
    desiredTitle,
    0
  );

  const commonSectorAndSizesForPrevTitle1 = getCommonSectorsAndSizes(
    prevTitle1,
    1
  );

  const commonSectorAndSizesForPrevTitle2 = getCommonSectorsAndSizes(
    prevTitle2,
    2
  );

  const commonSectorAndSizesForPrevTitle3 = getCommonSectorsAndSizes(
    prevTitle3,
    3
  );

  const commonSectorAndSizesForPrevTitle4 = getCommonSectorsAndSizes(
    prevTitle4,
    4
  );

  const averageJobDurationO = calculateAverageJobDuration(
    jobData,
    desiredTitle,
    0
  );

  const averageJobDuration1 = calculateAverageJobDuration(
    jobData,
    prevTitle1,
    1
  );

  const averageJobDuration2 = calculateAverageJobDuration(
    jobData,
    prevTitle2,
    2
  );

  const averageJobDuration3 = calculateAverageJobDuration(
    jobData,
    prevTitle3,
    3
  );

  const averageJobDuration4 = calculateAverageJobDuration(
    jobData,
    prevTitle4,
    4
  );
  return (
    <>
      <CareerTimeline
        job0={desiredTitle}
        data0={commonSectorAndSizesForDesiredTitle}
        tenure0={averageJobDurationO}
        job1={prevTitle1}
        data1={commonSectorAndSizesForPrevTitle1}
        tenure1={averageJobDuration1}
        job2={prevTitle2}
        data2={commonSectorAndSizesForPrevTitle2}
        tenure2={averageJobDuration2}
        job3={prevTitle3}
        data3={commonSectorAndSizesForPrevTitle3}
        tenure3={averageJobDuration3}
        job4={prevTitle4}
        data4={commonSectorAndSizesForPrevTitle4}
        tenure4={averageJobDuration4}
      />
    </>
  );
};

export default CommonJobs;
