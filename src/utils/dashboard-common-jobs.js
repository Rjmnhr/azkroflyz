import React from "react";

import { CareerTimeline } from "../components/charts/career-time-line";

const titleValuePoints = {
  "Account Manager": 2,
  "Business Analyst": 1,
  CEO: 3,
  CFO: 3,
  CMO: 3,
  CTO: 3,
  Consultant: 1,
  Founder: 3,
  "Founder and CEO": 3,
  "Head of HR": 2,
  President: 3,
  "Product Manager": 2,
  "Project Manager": 2,
  "Software Developer": 1,
};

function calculateAverageJobDuration(data, title, index) {
  const cleanedData = data.filter(
    (profile) => profile[`rare_or_normal`] === "normal"
  );
  // Filter profiles based on title and index
  const filteredProfiles = cleanedData.filter(
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

const findMostCommonValues = (values, i) => {
  const valueCount = countOccurrences(values);

  const sortedValues = Object.keys(valueCount)
    .filter((value) => valueCount[value] > 0)
    .sort((a, b) => valueCount[b] - valueCount[a])
    .slice(0, 5);
  if (i === 1) {
    console.log("🚀 ~ findMostCommonValues ~ sortedValues:", sortedValues);
  }

  return sortedValues;
};
const getLevelForTitle = (title) => {
  const level = titleValuePoints[title];
  return level !== undefined ? level : null;
};

const findMostCommonTitles = (values, i) => {
  const valueCount = countOccurrences(values);

  const sortedValues = Object.keys(valueCount)
    .filter((value) => valueCount[value] > 0)
    .sort((a, b) => {
      const frequencyComparison = valueCount[b] - valueCount[a];

      if (frequencyComparison === 0) {
        const levelA = getLevelForTitle(a);
        const levelB = getLevelForTitle(b);

        // If frequencies are the same, prioritize the one with higher level
        if (levelA !== undefined && levelB !== undefined) {
          return levelB - levelA;
        }
      }

      // If frequencies are different or levels are not applicable, sort by frequency
      return frequencyComparison;
    })
    .slice(0, 5);

  if (i === 1) {
    console.log("🚀 ~ findMostCommonValues ~ sortedValues:", sortedValues);
  }

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

    const commonSectors = findMostCommonValues(sectorValues);

    const commonSizes = findMostCommonValues(filteredSizeValues);

    return { sectors: commonSectors, sizes: commonSizes };
  };

  const commonTitles = [];
  for (let i = 0; i <= 5; i++) {
    commonTitles[i] = findMostCommonTitles(
      filteredProfiles.map((job) => job[`mapped_title_${i}`]),
      i
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

  const desiredTitleLevel = getLevelForTitle(desiredTitle);

  // Extracting prevTitle1
  const prevTitle1 = (() => {
    for (let i = 0; i < commonTitles[1].length; i++) {
      const candidate = commonTitles[1][i];
      const candidateLevel = getLevelForTitle(candidate);

      if (
        candidate !== desiredTitle &&
        candidateLevel !== null &&
        candidateLevel <= desiredTitleLevel
      ) {
        return candidate;
      }
    }
    return null; // Handle the case when no match is found
  })();

  // Extracting prevTitle2
  const prevTitle2 = (() => {
    for (let i = 0; i < commonTitles[2].length; i++) {
      const candidate = commonTitles[2][i];
      const candidateLevel = getLevelForTitle(candidate);
      if (
        candidate !== desiredTitle &&
        candidate !== prevTitle1 &&
        candidateLevel !== null &&
        candidateLevel <= getLevelForTitle(prevTitle1)
      ) {
        return candidate;
      }
    }
    return null; // Handle the case when no match is found
  })();

  const prevTitle3 = (() => {
    for (let i = 0; i < commonTitles[3].length; i++) {
      const candidate = commonTitles[3][i];
      const candidateLevel = getLevelForTitle(candidate);
      if (
        candidate !== desiredTitle &&
        candidate !== prevTitle1 &&
        candidate !== prevTitle2 &&
        candidateLevel !== null &&
        candidateLevel <= getLevelForTitle(prevTitle2)
      ) {
        return candidate;
      }
    }
    return null; // Handle the case when no match is found
  })();

  const prevTitle4 = (() => {
    for (let i = 0; i < commonTitles[4].length; i++) {
      const candidate = commonTitles[4][i];
      const candidateLevel = getLevelForTitle(candidate);
      if (
        candidate !== desiredTitle &&
        candidate !== prevTitle1 &&
        candidate !== prevTitle2 &&
        candidate !== prevTitle3 &&
        candidateLevel !== null &&
        candidateLevel <= getLevelForTitle(prevTitle3)
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
