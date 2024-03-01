import { useEffect, useState } from "react";
import InputPage from "../../components/dashboard/input";
import OutputComponent from "../../components/dashboard/output";
import { home_path } from "../../config/config";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

const DashboardPage: React.FC = () => {
  const [isToggleMenu, setIsToggleMenu] = useState<boolean>(true);
  const [isResultsOpen, setIsResultsOpen] = useState<boolean>(true);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);
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
  return (
    <div className={`  ${isToggleMenu ? "layout-menu-expanded" : ""}  `}>
      <div className="layout-wrapper layout-content-navbar text-start ">
        <div className="layout-container">
          <aside
            id="layout-menu"
            style={{
              height: "100vh",
              transition: " all 0.5s ease",
              width: isMinimized ? "30px" : "",
              position: "relative", // Add relative positioning to the aside container
            }}
            className={`layout-menu menu-vertical menu bg-menu-theme ${
              isMinimized ? " " : "col-lg-3"
            }  col-md-4 col-11 `}
          >
            {isMobile ? (
              ""
            ) : (
              <div
                style={{
                  background: "rgb(108,105,225)",
                  padding: "8px",
                  borderRadius: "50%",
                  color: "white",
                  width: "30px ",
                  height: "30px",
                  display: "grid",
                  placeItems: "center",
                  margin: "5px",
                  position: "absolute", // Use absolute positioning for the icon div
                  top: "5%", // Position at the vertical center
                  transform: "translateY(-50%)", // Adjust for vertical centering
                  right: -15, // Position at the right border
                  cursor: "pointer", // Add cursor pointer for interaction
                  transition: "background 3s, transform 3s", // Add transition properties
                }}
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? (
                  <RightOutlined style={{ fontWeight: "bolder" }} />
                ) : (
                  <LeftOutlined style={{ fontWeight: "bolder" }} />
                )}
              </div>
            )}

            <div
              className={` ${isResultsOpen ? " " : "col-lg-6"} `}
              style={{ display: isMinimized ? "none" : "block" }}
            >
              <div className="app-brand demo">
                <a href={home_path} className="app-brand-link">
                  <span className="fs-2 demo menu-text fw-bolder ms-2">
                    Azkroflyz
                  </span>
                </a>

                <div
                  onClick={() => setIsToggleMenu(false)}
                  className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none"
                  style={{
                    position: "absolute", // Use absolute positioning for the icon div
                    top: "5%", // Position at the vertical center
                    transform: "translateY(-50%)", // Adjust for vertical centering
                    right: -15, // Position at the right border
                    cursor: "pointer", // Add cursor pointer for interaction
                    transition: "background 3s, transform 3s", // Add transition properties
                    width: "40px ",
                    height: "40px",
                    display:"grid",
                 justifyItems:"center"
                  }}
                >
                  <i className="bx bx-chevron-left bx-sm align-middle"></i>
                </div>
              </div>

              <div
                className="scrollable-container"
                style={{ height: "90vh", overflowY: "scroll" }}
              >
                <InputPage setIsResultsOpen={setIsResultsOpen || (() => {})} />
              </div>
            </div>
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
                        <a className="dropdown-item" href="/account">
                          <i className="bx bx-user me-2"></i>
                          <span className="align-middle">My Profile</span>
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
            <OutputComponent />
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
