import { useState } from "react";
import InputPage from "../../components/dashboard/input";
import OutputComponent from "../../components/dashboard/output";

const DashboardPage: React.FC = () => {
  const [isToggleMenu, setIsToggleMenu] = useState<boolean>(true);
  return (
    <div className={`  ${isToggleMenu ? "layout-menu-expanded" : ""}  `}>
      <div className="layout-wrapper layout-content-navbar text-start ">
        <div className="layout-container">
          <aside
            id="layout-menu"
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

            <div
              className="scrollable-container"
              style={{ height: "90vh", overflowY: "scroll" }}
            >
              <InputPage />
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
            <OutputComponent />
          </div>
        </div>

        <div className="layout-overlay layout-menu-toggle"></div>
      </div>
    </div>
  );
};

export default DashboardPage;
