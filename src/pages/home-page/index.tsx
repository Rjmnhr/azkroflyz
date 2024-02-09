import React from "react";

import { useNavigate } from "react-router-dom";

import collegeStudentImg from "../../images/college-student.png";
import laptopImg from "../../images/laptop_bg.png";
import valuesImg from "../../images/img1.jpg";
import { ArrowRightOutlined } from "@ant-design/icons";
import NavBar from "../../components/layout/navbar";
import { HomePageStyled } from "./style";
import FooterComponent from "../../components/layout/footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <HomePageStyled>
        <div
          className="container py-3 px-0 "
          style={{
            marginTop: "80px",
          }}
        >
          <section id="about" className="about m-0">
            <div className="container p-0" data-aos="fade-up">
              <div className="row no-gutters p-0 ">
                <div
                  className="content container col-xl-7 "
                  style={{ display: "grid", placeItems: "center" }}
                >
                  <div className="content  pr-3">
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "25px",
                        color: "black",
                      }}
                    >
                      Are you a college student?
                    </p>
                    <h2 className="mb-5" style={{ color: "black" }}>
                      {" "}
                      Navigate Your Career Journey with Precision and Purpose
                    </h2>
                    <button
                      onClick={() => navigate("/demo")}
                      className="custom-demo-btn mt-3 m-3 "
                    >
                      Watch Demo
                    </button>
                    <button
                      onClick={() => navigate("/tool")}
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

          <section className="py-5 mb-5 bg-light">
            <div className="col-xl-12 d-flex align-items-stretch mt-5">
              <div className="icon-boxes  d-flex flex-column justify-content-center">
                <div className="section-title mb-5">
                  <h1 style={{ fontWeight: "bolder" }}>WHY CHOOSE US</h1>
                </div>
                <div className="row container">
                  <div
                    className="col-md-6 icon-box mb-5"
                    data-aos="fade-up"
                    data-aos-delay="100"
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
                    data-aos="fade-up"
                    data-aos-delay="200"
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
                    data-aos="fade-up"
                    data-aos-delay="300"
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
                    data-aos="fade-up"
                    data-aos-delay="100"
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

          <section className="mb-5">
            <div className="row">
              <div className="col-12 col-lg-6">
                <div
                  style={{
                    background: `url(${laptopImg})`,
                    height: "400px",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                  }}
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
                className="col-12 col-lg-6 "
                style={{ display: "grid", placeItems: "center" }}
              >
                <p
                  style={{ fontSize: "32px", color: "black" }}
                  className="col-8 text-start"
                >
                  {" "}
                  Our reports provide a deep dive into the current landscape,
                  helping you make informed decisions about your career path.{" "}
                </p>
              </div>
            </div>
          </section>
          <section>
            <div
              style={{
                background: `url(${valuesImg})`,
                height: "500px",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                position: "relative",
              }}
            >
              <div
                className="laptop-bg"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  background: "rgb(18,18,18,0.6)",
                  width: "100%",
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                }}
              >
                <p style={{ zIndex: "1", color: "white", fontSize: "65px" }}>
                  How does Azkroflyz bring value ?
                </p>
                <div
                  className="row container"
                  style={{ zIndex: "5", color: "white" }}
                >
                  <div
                    className="col-md-4 icon-box mb-5"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                    <i className="bx bx-receipt text-primary"></i>
                    <h4 style={{ color: "white" }}>Skill Gap Analysis</h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Identify key skills needed for success in your chosen
                        field. Our reports highlight any skill gaps and offer
                        recommendations for professional development, ensuring
                        you stay competitive in the job market.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <i className="bx bx-cube-alt text-primary"></i>
                    <h4 style={{ color: "white" }}>Job Role Projections</h4>
                    <div style={{ display: "grid", placeItems: "center" }}>
                      <p className="text-left col-12 col-lg-8 ">
                        Explore future job roles and emerging opportunities
                        within your preferred sector. Our insights help you stay
                        ahead of industry trends, allowing you to position
                        yourself for success in a rapidly evolving job market.
                      </p>
                    </div>
                  </div>
                  <div
                    className="col-md-4 icon-box"
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    <i className="bx bx-images text-primary"></i>
                    <h4 style={{ color: "white" }}>Tailored Career Roadmap</h4>
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
          <section
            id="about"
            style={{
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "50vh",
              display: "grid",
              placeItems: "center",
            }}
            className="about container-fluid mb-5 "
          >
            <div style={{ width: "400px" }} className="content">
              <div
                className="col-md-12 icon-box"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <img
                  width={50}
                  src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1704954909/ce816moxqaisi49tgprk.png"
                  alt="Salary survey"
                />
                <h4 className="mt-3">
                  Ensured privacy and data security for all user information.
                </h4>
              </div>
            </div>
          </section>
        </div>
        <FooterComponent />
      </HomePageStyled>
    </>
  );
};

export default HomePage;
