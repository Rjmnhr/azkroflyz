import {
  LocationCount,
  Profile,
  SkillCount,
  TitleCount,
} from "./interface-types";

export const formatTextValue = (name: string): string => {
  // Add your formatting logic here
  // For example, capitalize the first letter of each word
  return name
    ?.split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export function getUniqueCompanies(
  desiredTitle: string,
  profiles: Profile[]
): string[] {
  const uniqueCompaniesSet = new Set<string>();

  profiles.forEach((profile) => {
    const mappedTitleIndex = [...Array(8).keys()].find((index) => {
      const mappedTitleKey = `mapped_title_${index}`;
      return profile[mappedTitleKey] === desiredTitle;
    });

    if (mappedTitleIndex !== undefined) {
      for (let i = 0; i < mappedTitleIndex; i++) {
        const companyKey = `org_${i}`;
        const company = profile[companyKey];

        if (company !== null && typeof company === "string") {
          uniqueCompaniesSet.add(company);
        }
      }
    }
  });

  const uniqueCompaniesArray = Array.from(uniqueCompaniesSet);
  return uniqueCompaniesArray;
}

export function calculateAverageJobChanges(
  desiredTitle: string,
  profiles: Profile[]
): number {
  const totalJobChanges = profiles.map((profile) => {
    const mappedTitleIndex = [...Array(8).keys()].find((index) => {
      const mappedTitleKey = `mapped_title_${index}`;
      return profile[mappedTitleKey] === desiredTitle;
    });

    // Check if mappedTitleIndex is undefined
    if (mappedTitleIndex === undefined) {
      return 0; // or any other value that makes sense in your context
    }

    return 7 - mappedTitleIndex;
  });

  // Calculate the average
  const sumJobChanges = totalJobChanges.reduce(
    (sum, jobChange) => sum + jobChange,
    0
  );
  const averageJobChanges = sumJobChanges / profiles.length;

  return averageJobChanges;
}
export function calculateAverageDuration(
  desiredTitle: string,
  profiles: Profile[]
): number {
  // Calculate total duration for each profile based on desired title's position
  const totalDurations = profiles.map((profile) => {
    const mappedTitleIndex = [...Array(8).keys()].find((index) => {
      const mappedTitleKey = `mapped_title_${index}`;
      return profile[mappedTitleKey] === desiredTitle;
    });

    if (mappedTitleIndex !== undefined) {
      let totalDuration = 0;
      for (let i = mappedTitleIndex; i <= 7; i++) {
        const jobDurationKey = `job_${i}_duration`;
        const jobDuration = profile[jobDurationKey];

        if (jobDuration !== null && typeof jobDuration === "number") {
          totalDuration += jobDuration;
        }
      }
      return totalDuration;
    } else {
      return 0; // Return 0 if desired title not found in mapped titles
    }
  });

  // Filter out profiles with 0 total duration
  const nonZeroDurations = totalDurations.filter((duration) => duration > 0);

  // Calculate the average duration
  const totalDurationSum = nonZeroDurations.reduce(
    (sum, duration) => sum + duration,
    0
  );
  const averageDuration =
    nonZeroDurations.length > 0
      ? totalDurationSum / nonZeroDurations.length
      : 0;

  return Math.round(averageDuration);
}

export function getTopTitles(profiles: Profile[]): TitleCount[] {
  const allMappedTitles: string[] = [];

  // Collect all non-null mapped_titles from each profile
  profiles.forEach((profile) => {
    for (let i = 0; i <= 7; i++) {
      const mappedTitle = profile[`mapped_title_${i}`];

      if (mappedTitle !== null && typeof mappedTitle === "string") {
        allMappedTitles.push(mappedTitle);
      }
    }
  });

  // Count the occurrences of each mapped_title
  const titleCounts: Record<string, number> = {};
  allMappedTitles.forEach((title) => {
    titleCounts[title] = (titleCounts[title] || 0) + 1;
  });

  // Convert titleCounts into an array of objects for sorting
  const sortedTitles: TitleCount[] = Object.keys(titleCounts).map((title) => ({
    title,
    count: titleCounts[title],
  }));

  // Sort titles based on the count in descending order
  sortedTitles.sort((a, b) => b.count - a.count);

  // Calculate total number of profiles
  const totalProfiles = profiles.length;

  // Calculate percentage values for each title count
  const top5TitlesWithPercentage = sortedTitles.slice(0, 5).map((title) => ({
    ...title,
    percentage: Math.round((title.count / totalProfiles) * 100),
  }));

  return top5TitlesWithPercentage;
}

export function getTopJobLocations(profiles: Profile[]): LocationCount[] {
  const allJobLocations: string[] = [];

  // Collect all non-null job locations from each profile
  profiles.forEach((profile) => {
    for (let i = 0; i <= 7; i++) {
      const jobLocation = profile[`job_${i}_location`];

      if (jobLocation !== null && typeof jobLocation === "string") {
        allJobLocations.push(jobLocation);
      }
    }
  });

  // Count the occurrences of each job location
  const locationCounts: Record<string, number> = {};
  allJobLocations.forEach((location) => {
    locationCounts[location] = (locationCounts[location] || 0) + 1;
  });

  // Convert locationCounts into an array of objects for sorting
  const sortedLocations: LocationCount[] = Object.keys(locationCounts).map(
    (location) => ({
      location,
      count: locationCounts[location],
    })
  );

  // Sort locations based on the count in descending order
  sortedLocations.sort((a, b) => b.count - a.count);

  // Select the top 5 locations
  const top5Locations = sortedLocations.slice(0, 5);

  return top5Locations;
}

export function getTopSkills(profiles: Profile[]): SkillCount[] {
  const allSkills: string[] = [];

  // Collect all non-null skills from each profile
  profiles.forEach((profile) => {
    for (let i = 0; i <= 19; i++) {
      const skill = profile[`skill_${i}`];

      if (skill !== null && typeof skill === "string") {
        allSkills.push(skill);
      }
    }
  });

  // Count the occurrences of each skill
  const skillCounts: Record<string, number> = {};
  allSkills.forEach((skill) => {
    skillCounts[skill] = (skillCounts[skill] || 0) + 1;
  });

  // Convert skillCounts into an array of objects for sorting
  const sortedSkills: SkillCount[] = Object.keys(skillCounts).map((skill) => ({
    skill: formatTextValue(skill),
    count: skillCounts[skill],
  }));

  // Sort skills based on the count in descending order
  sortedSkills.sort((a, b) => b.count - a.count);

  // Calculate total number of profiles
  const totalProfiles = profiles.length;

  // Calculate percentage values for each skill count
  const top5SkillsWithPercentage = sortedSkills.slice(0, 5).map((skill) => ({
    ...skill,
    percentage: Math.round((skill.count / totalProfiles) * 100),
  }));

  return top5SkillsWithPercentage;
}
