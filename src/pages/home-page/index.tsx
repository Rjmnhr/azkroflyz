import React from "react";

import { useNavigate } from "react-router-dom";

import collegeStudentImg from "../../images/college-student.webp";
import laptopImg from "../../images/laptop_bg.png";
// import valuesImg from "../../images/img1.jpg";
import { ArrowRightOutlined } from "@ant-design/icons";
import NavBar from "../../components/layout/navbar";
import { HomePageStyled } from "./style";
import FooterComponent from "../../components/layout/footer";
import { dashboard_path, demo_video_path } from "../../config/config";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar background={"white"} />
      <HomePageStyled>
        <div
          className="container-fluid pb-0 px-0 "
          style={{
            background: "white",
          }}
        >
          <section
            id="about"
            className="about m-0"
            style={{ background: "#83a3f9", paddingTop: "80px" }}
          >
            <div className="container p-0">
              <div className="row no-gutters p-0 ">
                <div
                  className="content container col-xl-7 "
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <div className="content  pr-3">
                    <h2
                      style={{
                        textAlign: "center",

                        color: "white",
                      }}
                      className=" mb-5"
                      data-aos="zoom-out"
                      data-aos-once="true"
                    >
                      Are you a college student?
                    </h2>
                    <div className="d-flex justify-content-center">
                      <h2
                        className="mb-5  col-10"
                        style={{ color: "rgb(41, 40, 40,0.8)" }}
                        data-aos="zoom-out"
                        data-aos-delay="500"
                        data-aos-once="true"
                      >
                        {" "}
                        Navigate your career journey with precision and purpose
                      </h2>
                    </div>
                    <button
                      onClick={() => navigate(demo_video_path)}
                      className="custom-demo-btn mt-3 m-3 "
                    >
                      Watch Demo
                    </button>
                    <button
                      onClick={() => navigate(dashboard_path)}
                      className="custom-demo-btn m-3 "
                    >
                      <div className="d-flex justify-content-center align-items-start">
                        <span> Get started</span>

                        <span style={{ marginLeft: "8px", fontSize: "18px" }}>
                          <ArrowRightOutlined />
                        </span>
                      </div>
                    </button>{" "}
                    <div
                      className="d-lg-flex "
                      style={{
                        width: "100%",
                        textAlign: "start",

                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {/* <a href="#contact" className="btn-get-started scrollto">
                    Use Free Profile Evaluator
                  </a> */}
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 d-flex align-items-stretch">
                  <div className="icon-boxes d-flex flex-column justify-content-center">
                    <img
                      style={{ width: "90%" }}
                      src={collegeStudentImg}
                      alt="college student"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-5 mb-5 ">
            <div className="col-xl-12 d-flex align-items-stretch mt-5">
              <div className="icon-boxes  d-flex flex-column justify-content-center">
                <div className="section-title mb-5">
                  <h1 style={{ fontWeight: "bolder" }}>WHY CHOOSE US</h1>
                </div>
                <div className="row container">
                  <div
                    className="col-md-6 icon-box mb-5"
                    data-aos="slide-up"
                    data-aos-delay="100"
                    data-aos-once="true"
                  >
                    <i className="bx bx-receipt text-primary"></i>
                    <h4>Personalized Career Insights</h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Tailored advice based on individual educational details
                        and career preferences
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-md-6 icon-box"
                    data-aos="slide-up"
                    data-aos-delay="200"
                    data-aos-once="true"
                  >
                    <i className="bx bx-cube-alt text-primary"></i>
                    <h4>Comprehensive Career Data</h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        A vast database offering insights into various
                        industries, companies, and sectors.
                      </p>
                    </div>
                  </div>

                  <div
                    className="col-md-6 icon-box"
                    data-aos="slide-up"
                    data-aos-delay="300"
                    data-aos-once="true"
                  >
                    <i className="bx bx-images text-primary"></i>
                    <h4>Current Industry Trends</h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Stay updated on the latest trends and changes in
                        different industries.
                      </p>
                    </div>
                  </div>

                  <div
                    className="col-md-6 icon-box"
                    data-aos="slide-up"
                    data-aos-delay="100"
                    data-aos-once="true"
                  >
                    <i className="bx bx-receipt text-primary"></i>
                    <h4>User-Friendly Interface</h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Intuitive and user-friendly tool for a seamless
                        experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-5 section-bg ">
            <div className="row container justify-content-around">
              <div className="col-12 col-lg-5 card bg-light">
                <div className="col-12 col-lg-12 ">
                  <div
                    style={{
                      background: `url(${laptopImg})`,
                      height: "400px",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      position: "relative",
                    }}
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-once="true"
                  >
                    <div
                      className="laptop-bg"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <img
                        src={
                          "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707483457/dxxzwdkb2yoiktadohvv.png"
                        }
                        alt="career insights"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="col-12 col-lg-12 "
                  style={{ display: "grid", placeItems: "center" }}
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-once="true"
                >
                  <h3
                    style={{ color: "black" }}
                    className="col-8 text-start text-primary"
                  >
                    {" "}
                    Empowering Your Career Journey with Insightful Reports
                  </h3>
                  <p
                    style={{ color: "black" }}
                    className="col-8 text-start fs-5"
                  >
                    {" "}
                    Our reports helps you to understand the current job market.
                    Get insights on the skills in demand, helping you make
                    informed decisions for your career. Our goal is to provide
                    straightforward information to guide you in acquiring the
                    skills needed for a successful professional journey aligned
                    with your goals.
                  </p>
                </div>
              </div>
              <div className="col-12 col-lg-5 card bg-light">
                <div className="col-12 col-lg-12 ">
                  <div
                    style={{
                      background: `url(${laptopImg})`,
                      height: "400px",
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      position: "relative",
                    }}
                    data-aos="fade-up"
                    data-aos-delay="200"
                    data-aos-once="true"
                  >
                    <div
                      className="laptop-bg"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    >
                      <img
                        src={
                          "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707741324/zu6occpbgzbsjuv1aaf8.png"
                        }
                        alt="career insights"
                      />
                    </div>
                  </div>
                </div>

                <div
                  className="col-12 col-lg-12 "
                  style={{ display: "grid", placeItems: "center" }}
                  data-aos="fade-up"
                  data-aos-delay="300"
                  data-aos-once="true"
                >
                  <h3
                    style={{ color: "black" }}
                    className="col-8 text-start text-primary"
                  >
                    {" "}
                    Informed Career Decisions with Deep Dive Reports
                  </h3>
                  <p
                    style={{ color: "black" }}
                    className="col-8 text-start fs-5"
                  >
                    {" "}
                    Delve into our reports for a comprehensive exploration of
                    the current professional landscape. Our detailed analysis is
                    designed to empower you with the insights needed to make
                    well-informed decisions regarding your career path. By
                    leveraging our reports, you gain a deeper understanding of
                    industry trends, ensuring your choices align strategically
                    with your career goals.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section style={{ marginTop: "100px" }}>
            <div className="section-title ">
              <h1 style={{ fontWeight: "bolder", marginBottom: "60px" }}>
                {" "}
                HOW DOES AZKROFLYZ BRING VALUE
              </h1>
            </div>

            <div className="row " style={{ zIndex: "5", color: "black" }}>
              <div
                className="col-md-4 icon-box mb-5"
                data-aos="slide-up"
                data-aos-delay="100"
                data-aos-once="true"
              >
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-primary" style={{ color: "black" }}>
                      Skill Gap Analysis
                    </h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Identify key skills needed for success in your chosen
                        field. Our reports highlight any skill gaps and offer
                        recommendations for professional development, ensuring
                        you stay competitive in the job market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 icon-box"
                data-aos="slide-up"
                data-aos-delay="200"
                data-aos-once="true"
              >
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-primary" style={{ color: "black" }}>
                      Job Role Projections
                    </h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Explore future job roles and emerging opportunities
                        within your preferred sector. Our insights help you stay
                        ahead of industry trends, allowing you to position
                        yourself for success in a rapidly evolving job market.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-md-4 icon-box"
                data-aos="slide-up"
                data-aos-delay="300"
                data-aos-once="true"
              >
                <div className="card">
                  <div className="card-body">
                    <h4 className="text-primary" style={{ color: "black" }}>
                      Tailored Career Roadmap
                    </h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Discover a roadmap personalized to your educational
                        background, career aspirations, and desired industries.
                        Our final reports offer a detailed plan, outlining the
                        steps to achieve your professional goals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#83a3f9"
              fill-opacity="1"
              d="M0,224L80,202.7C160,181,320,139,480,144C640,149,800,203,960,202.7C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
        <FooterComponent />
      </HomePageStyled>
    </>
  );
};

export default HomePage;
