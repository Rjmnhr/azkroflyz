import React, { useEffect, useState } from "react";

import InputPage, { formatTextValue } from "../input-page";
import AxiosInstance from "../../components/axios";
import { useApplicationContext } from "../../context/app-context";
import { Divider, Progress } from "antd";

import HeatmapChart from "../../components/heat-map";
import WorldMapComponent from "../../components/world-map/react-svg";
import ApexChart from "../../components/apex-charts";
import ApexPieChart from "../../components/apex-pie-chart";
import HeatmapChartDegreeVsTitle from "../../components/heat-map/degree-vs-title";


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

const TemplateComponent: React.FC = () => {
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
  //eslint-disable-next-line
  const [uniqueCompanies, setUniqueCompanies] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { storedDataString } = useApplicationContext();
  const storedData = storedDataString ? JSON.parse(storedDataString) : null;

  const {
    selectedCompanySizeMatch,
    selectedCompanySectorMatch,
    totalCount,
    UGDegreeMatch,
    UGTierMatch,
    ugDegreeAndDesiredMatch,
    ugDegreeAndUGTierMatch,
    desiredTitle,
  } = useApplicationContext();
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
        console.log("🚀 ~ .then ~ response:", JSON.stringify(response));

        setEducationOutput(response);
        const topTitles = getTopTitles(response);

        setTop5TitleData(topTitles);
      })

      .catch((err) => console.log(err));
  }, [storedDataString]);
  useEffect(() => {
    setIsLoading(true);
    const storedData = storedDataString ? JSON.parse(storedDataString) : null;
    const formData = new FormData();

    formData.append("desired_title", storedData?.DesiredTitle);

    AxiosInstance.post("api/linkedin/title-output", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const response = await res.data;

        const topSkills = getTopSkills(response);
        setTop5Skills(topSkills);
      })

      .catch((err) => console.log(err));
  }, [storedDataString]);

  return (
    <body>
      <div className="layout-wrapper layout-content-navbar text-start">
        <div className="layout-container">
          <aside
            id="layout-menu "
            style={{ width: "none !important", height: "100vh" }}
            className="layout-menu menu-vertical menu bg-menu-theme col-3 "
          >
            <div className="app-brand demo">
              <a href="index.html" className="app-brand-link">
                <span className="fs-2 demo menu-text fw-bolder ms-2">
                  Azkroflyz
                </span>
              </a>

              <a
                href="/"
                className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
              >
                <i className="bx bx-chevron-left bx-sm align-middle"></i>
              </a>
            </div>

            <InputPage />
          </aside>

          <div
            className="layout-page "
            style={{ height: "100vh", overflowY: "scroll" }}
          >
            <nav
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
            >
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <a className="nav-item nav-link px-0 me-xl-4" href="/build">
                  <i className="bx bx-menu bx-sm"></i>
                </a>
              </div>

              <div
                className="navbar-nav-right d-flex align-items-center"
                id="navbar-collapse"
              >
                <div className="navbar-nav align-items-center">
                  <div className="nav-item d-flex align-items-center">
                    <i className="bx bx-search fs-4 lh-0"></i>
                    <input
                      type="text"
                      className="form-control border-0 shadow-none"
                      placeholder="Search..."
                      aria-label="Search..."
                    />
                  </div>
                </div>

                <ul className="navbar-nav flex-row align-items-center ms-auto">
                  <li className="nav-item navbar-dropdown dropdown-user dropdown">
                    <a
                      className="nav-link dropdown-toggle hide-arrow"
                      href="/"
                      data-bs-toggle="dropdown"
                    >
                      <div className="avatar avatar-online">
                        <img
                          src="../assets/img/avatars/1.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li>
                        <a className="dropdown-item" href="/#">
                          <div className="d-flex">
                            <div className="flex-shrink-0 me-3">
                              <div className="avatar avatar-online">
                                <img
                                  src="../assets/img/avatars/1.png"
                                  alt=""
                                  className="w-px-40 h-auto rounded-circle"
                                />
                              </div>
                            </div>
                            <div className="flex-grow-1">
                              <span className="fw-semibold d-block">
                                John Doe
                              </span>
                              <small className="text-muted">Admin</small>
                            </div>
                          </div>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/#">
                          <i className="bx bx-user me-2"></i>
                          <span className="align-middle">My Profile</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/#">
                          <i className="bx bx-cog me-2"></i>
                          <span className="align-middle">Settings</span>
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/#">
                          <span className="d-flex align-items-center align-middle">
                            <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                            <span className="flex-grow-1 align-middle">
                              Billing
                            </span>
                            <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                              4
                            </span>
                          </span>
                        </a>
                      </li>
                      <li>
                        <div className="dropdown-divider"></div>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          href="auth-login-basic.html"
                        >
                          <i className="bx bx-power-off me-2"></i>
                          <span className="align-middle">Log Out</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>

            <div className="content-wrapper">
              <div className="container col-12 flex-grow-1 container-p-y">
                <div className="row">
                  <div className="col-lg-8 mb-4 order-0">
                    <div className="card">
                      <div className="d-flex align-items-end row">
                        <div className="col-sm-7">
                          <div className="card-body">
                            <h5 className="card-title text-primary">
                              Welcome user ! 🎉
                            </h5>
                            <p className="mb-4">
                              Input your details and let us guide you with
                              personalized insights to navigate your career path
                              effectively
                            </p>
                          </div>
                        </div>
                        <div className="col-sm-5 text-center text-sm-left">
                          <div className="card-body pb-0 px-0 px-md-4">
                            <img
                              src="../assets/img/illustrations/man-with-laptop-light.png"
                              height="140"
                              alt="View Badge User"
                              data-app-dark-img="illustrations/man-with-laptop-dark.png"
                              data-app-light-img="illustrations/man-with-laptop-light.png"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 order-1">
                    <div className="col-12 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="card-title d-flex align-items-start justify-content-between">
                            <div className="avatar flex-shrink-0">
                              <img
                                src="../assets/img/icons/unicons/paypal.png"
                                alt="Credit Card"
                                className="rounded"
                              />
                            </div>
                          </div>
                          <span className="fw-semibold d-block mb-1">
                            Percentage of UG tier profiles in selected UG Degree
                          </span>
                          <h3 className="card-title text-nowrap mb-2">
                            {Math.round(
                              (ugDegreeAndUGTierMatch / UGDegreeMatch) * 100
                            )}{" "}
                            %
                          </h3>

                          <small className="text-danger fw-semibold">
                            <i className="bx bx-down-arrow-alt"></i> -14.82%
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-lg-8 order-2 order-md-3 order-lg-2 mb-4">
                    <div className="card">
                      <div className="row row-bordered g-0">
                        <div className="col-md-8">
                          <h5 className="card-header m-0 me-2 pb-3">
                            Total Skills
                          </h5>
                          <div id="totalRevenueChart" className="px-2 ">
                            {isLoading ? (
                              // <Spin
                              //   style={{ height: "100px" }}
                              //   tip="Loading"
                              //   className="mt-3"
                              //   size="large"
                              // >
                              //   <div className="content" />
                              // </Spin>
                              <p className=" py-2 px-3">No data</p>
                            ) : (
                              <div
                                className="mb-3"
                                style={{
                                  display: "grid",
                                  placeItems: "center",
                                }}
                              >
                                {top5Skills.length > 1 ? (
                                  <div>
                                    <ApexPieChart data={top5Skills} />
                                    <p className="text-start">
                                      {" "}
                                      Top skills you need to become the desired
                                      title
                                    </p>
                                  </div>
                                ) : (
                                  <div
                                    style={{
                                      height: "100px",
                                      display: "grid",
                                      placeItems: "center",
                                    }}
                                  >
                                    <p>No data found</p>
                                  </div>
                                )}
                              </div>
                            )}
                            <Divider />
                            <h5 className="card-header m-0 me-2 pb-3">
                              Popular Titles
                            </h5>
                            {isLoading ? (
                              //
                              <p className=" py-2 px-4  m-0 me-2 pb-3 container">
                                No data
                              </p>
                            ) : (
                              <div
                                style={{
                                  display: "grid",
                                  placeItems: "center",
                                }}
                                className="mt-3"
                              >
                                {top5TitleData.length > 1 ? (
                                  <div>
                                    <ApexChart top5TitleData={top5TitleData} />
                                    <p className="container">
                                      {" "}
                                      Most popular titles for your profile
                                    </p>
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
                          </div>
                        </div>

                        <div className="col-md-4">
                          <div className="card-body">
                            <Progress
                              className="mb-3"
                              strokeColor="#696cff"
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
                            <p style={{ fontSize: "14px" }}>
                              {" "}
                              Percentage of profiles similar to you became the{" "}
                              {desiredTitle}
                              <br />
                              <span className="text-primary">
                                {formatTextValue(storedData?.DesiredTitle)}
                              </span>{" "}
                            </p>
                            <Progress
                              className="mb-3"
                              strokeColor="#696cff"
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
                            <p>
                              {" "}
                              Average job change required for someone with your
                              profile to become {desiredTitle}
                            </p>
                            <Progress
                              className="mb-3"
                              strokeColor="#696cff"
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
                            <p style={{ fontSize: "14px" }}>
                              {" "}
                              Average years required for someone with your
                              profile to become {desiredTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-md-8 col-lg-4 order-3 order-md-2">
                    <div className="">
                      <div className="col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/cc-primary.png"
                                  alt="Credit Card"
                                  className="rounded "
                                  style={{ marginRight: "8px" }}
                                />
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Percentage of desired title profiles in selected
                              UG Degree{" "}
                            </span>
                            <h3 className="card-title mb-2">
                              {" "}
                              {Math.round(
                                (ugDegreeAndDesiredMatch / UGDegreeMatch) * 100
                              )}{" "}
                              %
                            </h3>
                            <p></p>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt"></i> +28.14%
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-block justify-content-between flex-sm-row flex-column gap-3">
                              <div className="card-title">
                                <h5 className="text-nowrap mb-2">Top Cities</h5>
                                <span className="badge bg-label-warning rounded-pill">
                                  Year 2024
                                </span>
                              </div>
                              {isLoading ? (
                                // <Spin
                                //   style={{ height: "100px" }}
                                //   tip="Loading"
                                //   className="mt-3"
                                //   size="large"
                                // >
                                //   <div className="content" />
                                // </Spin>
                                <p className=" py-2 px-3">No data</p>
                              ) : (
                                <div>
                                  {top5Cities.length > 1 ? (
                                    <div className="d-flex align-items-center justify-content-center ">
                                      <div className="col-6">
                                        <WorldMapComponent
                                          topCities={capitalizedLocations}
                                        />
                                      </div>
                                      <div
                                        className="col-6"
                                        style={{
                                          display: "grid",
                                          placeItems: "center",
                                        }}
                                      >
                                        <div className="text-left">
                                          {top5Cities.map(
                                            (item: LocationCount, index) => (
                                              <p
                                                style={{ fontWeight: "bold" }}
                                                key={item.location}
                                              >
                                                <span>{index + 1}.</span>{" "}
                                                <span className="text-primary">
                                                  {formatTextValue(
                                                    item.location
                                                  )}
                                                </span>
                                              </p>
                                            )
                                          )}
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
                              <p>
                                Top cities match for your profile who become{" "}
                                {desiredTitle}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="card-title">
                          <strong>Your profile matching in our database</strong>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/chart-success.png"
                                  alt="chart success"
                                  className="rounded"
                                />
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              Company size
                            </span>
                            <h3 className="card-title mb-2">
                              {Math.round(
                                (selectedCompanySizeMatch / totalCount) * 100
                              )}
                              %
                            </h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt"></i> +72.80%
                            </small>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-12 col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/wallet-info.png"
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>
                            </div>
                            <span>Sector match</span>
                            <h3 className="card-title text-nowrap mb-1">
                              {Math.round(
                                (selectedCompanySectorMatch / totalCount) * 100
                              )}
                              %
                            </h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt"></i> +28.42%
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/paypal.png"
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>
                            </div>
                            <span className="d-block mb-1">
                              UG Degree Match
                            </span>
                            <h3 className="card-title text-nowrap mb-2">
                              {Math.round((UGDegreeMatch / totalCount) * 100)}%
                            </h3>
                            <small className="text-danger fw-semibold">
                              <i className="bx bx-down-arrow-alt"></i> -14.82%
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6 mb-4">
                        <div className="card">
                          <div className="card-body">
                            <div className="card-title d-flex align-items-start justify-content-between">
                              <div className="avatar flex-shrink-0">
                                <img
                                  src="../assets/img/icons/unicons/cc-primary.png"
                                  alt="Credit Card"
                                  className="rounded"
                                />
                              </div>
                            </div>
                            <span className="fw-semibold d-block mb-1">
                              UG Tier Match
                            </span>
                            <h3 className="card-title mb-2">
                              {" "}
                              {Math.round((UGTierMatch / totalCount) * 100)}%
                            </h3>
                            <small className="text-success fw-semibold">
                              <i className="bx bx-up-arrow-alt"></i> +28.14%
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-lg-10 col-xl-10 order-0 mb-4">
                    <div className="card h-100">
                      <div className="card-header d-flex align-items-center justify-content-between pb-0">
                        <div className="card-title mb-0">
                          <h5 className="m-0 me-2 mb-5">
                            Company details matching your profile
                          </h5>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className=" justify-content-between align-items-center mb-3">
                          <div id="orderStatisticsChart">
                            {isLoading ? (
                              //
                              ""
                            ) : (
                              <div>
                                <p className="text-center">
                                  Based on your profile
                                </p>
                                {educationOutput.length > 0 ? (
                                  <HeatmapChart data={educationOutput} />
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
                          </div>
                          <p className="text-center mt-5">
                            Based on your profile and desired title
                          </p>
                          <HeatmapChartDegreeVsTitle data={educationOutput} />
                        </div>
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <footer className="content-footer footer bg-footer-theme">
                <div className="container-xxl d-flex flex-wrap justify-content-between py-2 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0"></div>
                  <div>
                    <a
                      href="https://themeselection.com/license/"
                      className="footer-link me-4"
                      target="_blank"
                      rel="noreferrer"
                    >
                      License
                    </a>
                    <a
                      href="https://themeselection.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link me-4"
                    >
                      More Themes
                    </a>

                    <a
                      href="https://themeselection.com/demo/sneat-bootstrap-html-admin-template/documentation/"
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link me-4"
                    >
                      Documentation
                    </a>

                    <a
                      href="https://github.com/themeselection/sneat-html-admin-template-free/issues"
                      target="_blank"
                      rel="noreferrer"
                      className="footer-link me-4"
                    >
                      Support
                    </a>
                  </div>
                </div>
              </footer>

              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </body>
  );
};

export default TemplateComponent;
