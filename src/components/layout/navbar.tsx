import React, { useEffect, useState } from "react";
import "./style.css";
import { useLocation, useNavigate } from "react-router-dom";

import { Dropdown } from "antd";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const Location = useLocation();

  const getActiveLink = (path: string) => {
    switch (path) {
      case "/":
        return "home";
      case "/price-a-job-add-details":
        return "price-a-job";
      case "/reports":
        return "price-a-job";
      case "/price-a-job":
        return "price-a-job";
      case "/executive-compensation":
        return "/executive-compensation";
      case "/training":
        return "training";
      case "/sales":
        return "sales";
      case "/blog":
        return "blog";
      case "/account":
        return "account";
      case "/kpi-client":
        return "kpi";
      // Add more cases for other routes
      default:
        return "";
    }
  };

  const activeLink = getActiveLink(Location.pathname);
  // Add a scroll event listener to the window
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // If the user has scrolled more than 50 pixels, set scrolled to true
        setScrolled(true);
      } else {
        // If the user has scrolled back to the top, set scrolled to false
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  //eslint-disable-next-line
  const handleLogOut = () => {
    navigate("/");
    localStorage.removeItem("accessToken");
    localStorage.setItem("isLoggedIn", "false");
  };

  const items = [
    {
      key: "1",
      label: <a href="/account">My Account</a>,
    },
    {
      key: "2",
      label: (
        <a href="#eq" onClick={handleLogOut}>
          Log out
        </a>
      ),
    },
  ];

  return (
    <body className={`${menuOpen ? "mobile-nav-active" : ""} `}>
      <button
        type="button"
        className="mobile-nav-toggle d-lg-none"
        onClick={handleMenuToggle}
      >
        <i style={{ color: "black" }} className="icofont-navigation-menu"></i>
      </button>
      <header
        id="header"
        className={`navbar fixed-top ${scrolled ? "scrolled" : ""}`}
        style={{
          background: "white",
          boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container-fluid px-5  d-flex align-items-center">
          <a href="/" className="d-flex">
            {" "}
            <img
              style={{ marginRight: "8px" }}
              src={
                "https://res.cloudinary.com/dsw1ubwyh/image/upload/v1692624513/btwkzb24s2odtvrkew12.png"
              }
              alt=""
              height={50}
              width={50}
            />
            <div className="app-brand demo">
              <a href="index.html" className="app-brand-link">
                <span className="fs-2 demo menu-text fw-bolder ms-2">
                  Azkroflyz
                </span>
              </a>
            </div>
          </a>

          <nav
            className={`${
              menuOpen ? "mobile-nav d-lg-none" : " nav-menu d-none d-lg-block"
            } `}
          >
            <ul className="m-0" style={{ listStyle: "none" }}>
              {isLoggedIn === "true" ? (
                <>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottomRight"
                    arrow
                  >
                    <li
                      style={{ cursor: "pointer" }}
                      className={activeLink === "account" ? "active" : ""}
                    >
                      {/*eslint-disable-next-line*/}
                      <a>Account</a>
                    </li>
                  </Dropdown>
                </>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="custom-demo-btn mt-3 m-3 "
                >
                  Login
                </button>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </body>
  );
};

export default NavBar;
