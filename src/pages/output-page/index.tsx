import React, { useEffect, useState } from "react";
import AxiosInstance from "../../components/axios";
import { formatTextValue } from "../input-page";
import { Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { OutputPageStyled } from "./style";

import WorldMapComponent from "../../components/world-map/react-svg";
import { Divider, Progress, Spin } from "antd";

interface Profile {
  [key: string]: string | number | null;
}

interface TitleCount {
  title: string;
  count: number;
}

interface LocationCount {
  location: string;
  count: number;
}

interface SkillCount {
  skill: string;
  count: number;
}

function getUniqueCompanies(
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

function calculateAverageJobChanges(
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
function calculateAverageDuration(
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

function getTopTitles(profiles: Profile[]): TitleCount[] {
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

function getTopJobLocations(profiles: Profile[]): LocationCount[] {
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

function getTopSkills(profiles: Profile[]): SkillCount[] {
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

interface OutputPageProps {
  storedDataString: string; // Define the type for storedDataString
}
// function getColor(index: number): string {
//   const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];
//   return colors[index % colors.length];
// }
const OutputPage: React.FC<OutputPageProps> = ({ storedDataString }) => {
  //   const storedDataString = sessionStorage.getItem("input-data");
  //eslint-disable-next-line
  const [educationAndDesiredOutput, setEducationAndDesiredOutput] = useState(
    []
  );
  const [educationOutput, setEducationOutput] = useState([]);
  const [top5TitleData, setTop5TitleData] = useState<TitleCount[]>([]);
  const [top5Cities, setTop5Cities] = useState<LocationCount[]>([]);
  const [capitalizedLocations, setCapitalizedLocations] = useState<string[]>(
    []
  );
  const [top5Skills, setTop5Skills] = useState<SkillCount[]>([]);
  const [percentageWithTitle, setPercentageWithTitle] = useState<number>(0);
  const [yearsTaken, setYearsTaken] = useState<number>(0);
  const [averageJobChanges, setAverageJobChanges] = useState<number>(0);
  //eslint-disable-next-line
  const [percentageWithEducation, setPercentageWithEducation] =
    useState<number>(0);
  const [uniqueCompanies, setUniqueCompanies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const storedData = storedDataString ? JSON.parse(storedDataString) : null;

  useEffect(() => {
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    const formData = new FormData();

    formData.append("desired_title", storedData?.DesiredTitle);

    formData.append("ug_degree", storedData?.UGDegree);
    formData.append("ug_tier", storedData?.UGTier);

    if (educationOutput?.length > 0) {
      AxiosInstance.post("api/linkedin/education-desired-output", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (res) => {
          const response = await res.data;

          setEducationAndDesiredOutput(response);

          const percentageWithTitle =
            (response[0]?.totalCount / response[0]?.titleCount) * 100 || 0;

          const percentageWithEducation =
            (response?.length / educationOutput.length) * 100 || 0;

          const averageDuration = calculateAverageDuration(
            storedData?.DesiredTitle,
            response
          );
          const averageJobChange = calculateAverageJobChanges(
            storedData?.DesiredTitle,
            response
          );

          const uniqueCompaniesArr = getUniqueCompanies(
            storedData?.DesiredTitle,
            response
          );

          const topLocations = getTopJobLocations(response);
          const capitalizedLocationsArr = topLocations.map(
            (item) =>
              item.location.charAt(0).toUpperCase() + item.location.slice(1)
          );

          setCapitalizedLocations(capitalizedLocationsArr);
          setTop5Cities(topLocations);
          const topSkills = getTopSkills(response);
          setTop5Skills(topSkills);

          setUniqueCompanies(uniqueCompaniesArr);
          setYearsTaken(Math.round(averageDuration / 12));
          setAverageJobChanges(Math.round(averageJobChange));

          setPercentageWithEducation(Math.round(percentageWithEducation));

          setPercentageWithTitle(Math.round(percentageWithTitle));

          setIsLoading(false);
        })

        .catch((err) => console.log(err));
    }
  }, [educationOutput, storedDataString]);

  useEffect(() => {
    setIsLoading(true);
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    const formData = new FormData();

    formData.append("ug_degree", storedData?.UGDegree);
    formData.append("ug_tier", storedData?.UGTier);

    AxiosInstance.post("api/linkedin/education-output", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        setEducationOutput(response);
        const topTitles = getTopTitles(response);

        setTop5TitleData(topTitles);
      })

      .catch((err) => console.log(err));
  }, [storedDataString]);

  return (
    <div>
      <OutputPageStyled>
        <div className="container-fluid px-0 py-3">
          <section
            style={{ overflow: "unset", minHeight: "200px" }}
            id="counts"
            className="counts p-3  m-0"
          >
            <h4 className="mt-3 mb-5">Career Profile Matchings</h4>

            {percentageWithTitle || storedData?.DesiredTitle ? (
              <div className="container">
                <div className="d-flex flex-wrap ">
                  <div className="col-lg-4  col-md-6">
                    <div className="mb-3 mb-lg-0 ">
                      <Progress
                        className="mb-3"
                        strokeColor="#1a6cb6"
                        strokeWidth={8}
                        size={150}
                        type="circle"
                        percent={100}
                        format={() => (
                          <div
                            className="text-dark "
                            style={{ fontSize: "16px" }}
                          >
                            <span
                              style={{
                                fontSize: "36px",
                                display: "block",
                                fontWeight: "700",
                                color: "#111111",
                              }}
                            >
                              {percentageWithTitle}%
                            </span>
                          </div>
                        )}
                      />
                      <p>
                        {" "}
                        Percentage of profiles from your background made it to
                        <br />
                        <span className="text-primary">
                          {formatTextValue(storedData?.DesiredTitle)}
                        </span>{" "}
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4  col-md-6">
                    <div className="mb-3 mb-lg-0 ">
                      <Progress
                        className="mb-3"
                        strokeColor="#1a6cb6"
                        strokeWidth={8}
                        size={150}
                        type="circle"
                        percent={100}
                        format={() => (
                          <div
                            className="text-dark "
                            style={{ fontSize: "16px" }}
                          >
                            <span
                              style={{
                                fontSize: "36px",
                                display: "block",
                                fontWeight: "700",
                                color: "#111111",
                              }}
                            >
                              {yearsTaken}
                            </span>
                          </div>
                        )}
                      />
                      <p>
                        {" "}
                        Average Years required to go from education to desired
                        title
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-4  col-md-6">
                    <div className="mb-3 mb-lg-0 ">
                      <Progress
                        className="mb-3"
                        strokeColor="#1a6cb6"
                        strokeWidth={8}
                        size={150}
                        type="circle"
                        percent={100}
                        format={() => (
                          <div
                            className="text-dark "
                            style={{ fontSize: "16px" }}
                          >
                            <span
                              style={{
                                fontSize: "36px",
                                display: "block",
                                fontWeight: "700",
                                color: "#111111",
                              }}
                            >
                              {averageJobChanges ? averageJobChanges : 0}
                            </span>
                          </div>
                        )}
                      />
                      <p> Average job changes</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Spin tip="Loading" size="large">
                <div className="content" />
              </Spin>
            )}
          </section>

          <Divider />

          <section style={{ minHeight: "200px" }} className="p-3 m-0">
            <h4 className="my-3">
              Top skills you need to become the desired title based on your
              background
            </h4>

            {isLoading ? (
              <Spin
                style={{ height: "100px" }}
                tip="Loading"
                className="mt-3"
                size="large"
              >
                <div className="content" />
              </Spin>
            ) : (
              <div
                className="mb-3"
                style={{ display: "grid", placeItems: "center" }}
              >
                {top5Skills.length > 1 ? (
                  <BarChart
                    margin={{ left: 50 }}
                    width={600}
                    height={300}
                    data={top5Skills}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis
                      dataKey="skill"
                      type="category"
                      tickFormatter={(value) => value}
                      allowDataOverflow={true}
                      orientation="left" // Set the orientation to left
                    />
                    <Tooltip />

                    <Bar dataKey="percentage" fill="#1a6cb6" />
                  </BarChart>
                ) : (
                  // <PieChart width={400} height={280}>
                  //   <Pie
                  //     data={top5Skills}
                  //     cx={200}
                  //     cy={100}
                  //     labelLine={false}
                  //     outerRadius={80}
                  //     fill="#8884d8"
                  //     dataKey="count"
                  //   >
                  //     {top5Skills.map((entry, index) => (
                  //       <Cell
                  //         key={`cell-${index}`}
                  //         fill={getColor(index)}
                  //         name={formatTextValue(entry.skill)}
                  //       />
                  //     ))}
                  //   </Pie>
                  //   <Tooltip />
                  //   <Legend />
                  // </PieChart>
                  <div
                    style={{
                      height: "100px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {" "}
                    <p>No data found</p>
                  </div>
                )}
              </div>
            )}
          </section>
          <Divider />
          <section style={{ minHeight: "200px" }} className=" p-3  m-0">
            <h4 className="my-3">
              Top titles for professionals based on your educational background{" "}
            </h4>
            {isLoading ? (
              <Spin
                style={{ height: "100px" }}
                tip="Loading"
                className="mt-3"
                size="large"
              >
                <div className="content" />
              </Spin>
            ) : (
              <div style={{ display: "grid", placeItems: "center" }}>
                {top5TitleData.length > 1 ? (
                  // <div className="inverted-pyramid">
                  //   {top5TitleData.map((item: TitleCount, index) => (
                  //     <div
                  //       style={{ display: "grid", placeItems: "center" }}
                  //       className={`block p-2   block-${index + 1}`}
                  //       key={item.title}
                  //     >
                  //       <p
                  //         className="m-0"
                  //         style={{ color: "white", fontWeight: "bold" }}
                  //       >
                  //         {formatTextValue(item.title)}
                  //       </p>
                  //     </div>
                  //   ))}
                  // </div>
                  <div>
                    <BarChart
                      margin={{ left: 50 }}
                      width={600}
                      height={300}
                      data={top5TitleData}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="title" type="category" />
                      <Tooltip />

                      <Bar dataKey="percentage" fill="#1a6cb6" />
                    </BarChart>
                  </div>
                ) : (
                  <div
                    style={{
                      height: "100px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {" "}
                    <p>No data found</p>
                  </div>
                )}
              </div>
            )}
          </section>

          <Divider />

          <section style={{ minHeight: "200px" }} className=" p-3  m-0">
            <h4 className="my-3 ">
              Top cities for professionals based on your background and desired
              job title
            </h4>

            {isLoading ? (
              <Spin
                style={{ height: "100px" }}
                tip="Loading"
                className="mt-3"
                size="large"
              >
                <div className="content" />
              </Spin>
            ) : (
              <div>
                {top5Cities.length > 1 ? (
                  <div className="d-flex align-items-center justify-content-center ">
                    <div className="col-6">
                      <WorldMapComponent topCities={capitalizedLocations} />
                    </div>
                    <div
                      className="col-6"
                      style={{ display: "grid", placeItems: "center" }}
                    >
                      <div className="text-left">
                        {top5Cities.map((item: LocationCount, index) => (
                          <p style={{ fontWeight: "bold" }} key={item.location}>
                            <span>{index + 1}.</span>{" "}
                            <span className="text-primary">
                              {formatTextValue(item.location)}
                            </span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      height: "100px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {" "}
                    <p>No data found</p>
                  </div>
                )}
              </div>
            )}
          </section>
          <Divider />
          <section style={{ minHeight: "200px" }} className=" p-3  mb-5">
            <h4 className="my-3">
              Companies professionals typically work for before achieving the
              desired job title
            </h4>
            {isLoading ? (
              <Spin
                style={{ height: "100px" }}
                tip="Loading"
                className="mt-3"
                size="large"
              >
                <div className="content" />
              </Spin>
            ) : (
              <div>
                {uniqueCompanies.length > 0 ? (
                  <div className="d-flex flex-wrap">
                    {uniqueCompanies.map((company) => (
                      <p
                        style={{
                          color: "white",
                          background: "rgb(23, 78, 166)",
                        }}
                        className="card shadow text-left  py-2 px-3 m-2"
                        key={company}
                      >
                        {formatTextValue(company)}
                      </p>
                    ))}
                  </div>
                ) : (
                  <div
                    style={{
                      height: "100px",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    {" "}
                    <p>No data found</p>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </OutputPageStyled>
    </div>
  );
};

export default OutputPage;
