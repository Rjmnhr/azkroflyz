import React, { useEffect, useState } from "react";
import AxiosInstance from "../../config/axios";
import { useApplicationContext } from "../../context/app-context";
import { Divider, Progress } from "antd";
import WorldMapComponent from "../../components/india-map";
import ApexChart from "../../components/charts/top-title-bar-chart";
import ApexPieChart from "../../components/charts/top-skills-pie-chart";
import { LoadingOutlined } from "@ant-design/icons";
import HeatmapChartDegreeVsTitle from "../../components/charts/degree-vs-title-heatmap";
import HeatmapChart from "../../components/charts/sector-vs-employee-heatmap";
import {
  LocationCount,
  MasterDegreeData,
  SkillCount,
  TitleCount,
} from "../../utils/interface-types";
import {
  calculateAverageDuration,
  calculateAverageJobChanges,
  formatTextValue,
  getTopJobLocations,
  getTopMasterDegrees,
  getTopSkills,
  getTopTitles,
  getUniqueCompanies,
} from "../../utils/tool-helper-functions";
import InputPage from "../input-page";
import { MasterDegreeOrganizationGraph } from "../../components/charts/master-degree-flow-chart";
import CommonJobs from "../../components/test-components/testing-common-jobs";
import ApexChartDummy from "../../components/charts/profile-dummy-chart";

const TemplateComponent: React.FC = () => {
  const {
    selectedCompanySizeMatch,
    selectedCompanySectorMatch,
    totalCount,
    UGDegreeMatch,
    UGTierMatch,
    ugDegreeAndDesiredMatch,
    ugDegreeAndUGTierMatch,
    desiredTitle,
    isInputsEntered,
    desiredTitleMatch,
  } = useApplicationContext();

  //eslint-disable-next-line
  const [educationAndDesiredOutput, setEducationAndDesiredOutput] = useState(
    []
  );
  const [educationOutput, setEducationOutput] = useState([]);
  const [top5TitleData, setTop5TitleData] = useState<TitleCount[]>([]);
  const [top5Cities, setTop5Cities] = useState<LocationCount[]>([]);
  const [top5MasterDegrees, setTop5MasterDegrees] = useState<
    MasterDegreeData[]
  >([]);
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
  const [isToggleMenu, setIsToggleMenu] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if the screen width is less than a certain value (e.g., 768px) to determine if it's a mobile device
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Add an event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Initial check
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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

          const topPGDegrees = getTopMasterDegrees(response);
          setTop5MasterDegrees(topPGDegrees);

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
    <div className={`  ${isToggleMenu ? "layout-menu-expanded" : ""}  `}>
      <div className="layout-wrapper layout-content-navbar text-start ">
        <div className="layout-container">
          <aside
            id="layout-menu "
            style={{
              width: "none !important",
              height: "100vh",
              transition: " all 0.5s ease",
            }}
            className="layout-menu menu-vertical menu bg-menu-theme col-lg-3 col-md-4 col-11 "
          >
            <div className="app-brand demo">
              <a href="index.html" className="app-brand-link">
                <span className="fs-2 demo menu-text fw-bolder ms-2">
                  Azkroflyz
                </span>
              </a>

              <div
                onClick={() => setIsToggleMenu(false)}
                className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                style={{ left: "0px" }}
              >
                <i className="bx bx-chevron-left bx-sm align-middle"></i>
              </div>
            </div>

            <InputPage />
          </aside>

          <div
            className="layout-page scrollable-container "
            style={{ height: "100vh", overflowY: "scroll" }}
          >
            <nav
              className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
              id="layout-navbar"
            >
              <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
                <div
                  onClick={() => setIsToggleMenu(true)}
                  className="nav-item nav-link px-0 me-xl-4"
                >
                  <i className="bx bx-menu bx-sm"></i>
                </div>
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
                    <div
                      className="nav-link dropdown-toggle hide-arrow"
                      data-bs-toggle="dropdown"
                    >
                      <div className="avatar avatar-online">
                        <img
                          src="../assets/img/avatars/1.png"
                          alt=""
                          className="w-px-40 h-auto rounded-circle"
                        />
                      </div>
                    </div>
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
                            )
                              ? Math.round(
                                  (ugDegreeAndUGTierMatch / UGDegreeMatch) * 100
                                )
                              : 0}{" "}
                            %
                          </h3>

                          <small className="text-danger fw-semibold"></small>
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
                            {isInputsEntered ? (
                              <div>
                                {" "}
                                {isLoading ? (
                                  <div
                                    style={{
                                      height: "100px",
                                      display: "grid",
                                      placeItems: "center",
                                    }}
                                    className="mt-3"
                                  >
                                    Loading..
                                    <LoadingOutlined />
                                  </div>
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
                                          Top skills you need to become the
                                          desired title
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
                              </div>
                            ) : (
                              <p className=" py-2 px-3">No data</p>
                            )}

                            <Divider />
                            <h5 className="card-header m-0 me-2 pb-3">
                              Popular Titles
                            </h5>
                            {isInputsEntered ? (
                              <div>
                                {" "}
                                {isLoading ? (
                                  <div
                                    style={{
                                      height: "100px",
                                      display: "grid",
                                      placeItems: "center",
                                    }}
                                    className="mt-3"
                                  >
                                    Loading..
                                    <LoadingOutlined />
                                  </div>
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
                                        <ApexChart
                                          top5TitleData={top5TitleData}
                                        />
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
                            ) : (
                              <p className=" py-2 px-4  m-0 me-2 pb-3 container">
                                No data
                              </p>
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
                              <span className="text-primary">
                                {desiredTitle}
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
                              profile to become{" "}
                              <span className="text-primary">
                                {desiredTitle}
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
                                    {yearsTaken}
                                  </span>
                                </div>
                              )}
                            />
                            <p style={{ fontSize: "14px" }}>
                              {" "}
                              Average years required for someone with your
                              profile to become{" "}
                              <span className="text-primary">
                                {desiredTitle}
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-12 mb-4  mt-3">
                      <div className="card pb-2">
                        <div className="card-body">
                          <div className="d-flex justify-content-between flex-sm-row flex-column gap-3">
                            <div className="d-flex flex-sm-column flex-row align-items-start justify-content-between col-6">
                              <div className="card-title  ">
                                <p className=" mb-2">
                                  Your profile matching in our database with the
                                  title{" "}
                                  <span className="text-primary">
                                    {desiredTitle}
                                  </span>
                                </p>
                              </div>
                              <div className="mt-sm-auto">
                                <h3 className="text-primary">
                                  {" "}
                                  {Math.round(
                                    (desiredTitleMatch / totalCount) * 100
                                  )}
                                  %
                                </h3>
                              </div>
                            </div>
                            <div id="profileReportChart">
                              <ApexChartDummy />
                            </div>
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
                              )
                                ? Math.round(
                                    (ugDegreeAndDesiredMatch / UGDegreeMatch) *
                                      100
                                  )
                                : 0}{" "}
                              %
                            </h3>
                            <p></p>
                            <small className="text-success fw-semibold"></small>
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
                              {isInputsEntered ? (
                                <div>
                                  {" "}
                                  {isLoading ? (
                                    <div
                                      style={{
                                        height: "100px",
                                        display: "grid",
                                        placeItems: "center",
                                      }}
                                      className="mt-3"
                                    >
                                      Loading..
                                      <LoadingOutlined />
                                    </div>
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
                                                (
                                                  item: LocationCount,
                                                  index
                                                ) => (
                                                  <p
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
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
                                </div>
                              ) : (
                                <p className=" py-2 px-3">No data</p>
                              )}

                              <p>
                                Top cities match for your profile who become{" "}
                                <span className="text-primary">
                                  {desiredTitle}
                                </span>{" "}
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
                            <small className="text-success fw-semibold"></small>
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
                            <small className="text-success fw-semibold"></small>
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
                            <small className="text-danger fw-semibold"></small>
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
                            <small className="text-success fw-semibold"></small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12 mb-4 mt-3">
                    <div className="">
                      <div className="">
                        <div className="d-block justify-content-between flex-sm-row flex-column gap-3">
                          <div className="card-title">
                            <h2 className="text-nowrap mb-5 text-center ">
                              Career Progression
                            </h2>
                          </div>

                          {isInputsEntered ? (
                            <CommonJobs
                              jobData={educationAndDesiredOutput}
                              desiredTitle={desiredTitle}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 mb-4 ">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-block justify-content-between flex-sm-row flex-column gap-3">
                          <div className="card-title">
                            <h5 className="text-nowrap mb-2">
                              {" "}
                              Prevalence of advanced degrees
                            </h5>
                          </div>

                          {isInputsEntered ? (
                            <MasterDegreeOrganizationGraph
                              degreeData={top5MasterDegrees}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {isMobile ? (
                  ""
                ) : (
                  <div>
                    <div className="row">
                      <div className="col-md-12 col-lg-10 col-xl-10  order-0 mb-4">
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
                                  <div className="w-100">
                                    <p className="text-start">
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 col-lg-10 col-xl-10  order-0 mb-4">
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
                                  ""
                                ) : (
                                  <div className="w-100">
                                    <p className="text-start">
                                      Based on your profile and desired title
                                    </p>
                                    {educationOutput.length > 0 ? (
                                      <HeatmapChartDegreeVsTitle
                                        data={educationOutput}
                                      />
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="card mt-3"></div>
              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default TemplateComponent;
