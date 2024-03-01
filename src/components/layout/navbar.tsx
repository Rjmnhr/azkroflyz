import React, { useEffect, useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { home_path, login_path } from "../../config/config";
interface NavBarProps {
  background: string;
}
const NavBar: React.FC<NavBarProps> = ({ background }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
    localStorage.removeItem("azkroflyz-accessToken");
    localStorage.setItem("isLoggedIn", "false");
  };

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
          background: background,
          boxShadow: "0px 2px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container-fluid px-5  d-flex align-items-center">
          <a href={home_path} className="d-flex">
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
              <a href={home_path} className="app-brand-link">
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
                  <button
                    onClick={handleLogOut}
                    className="custom-demo-btn mt-3 m-3 "
                  >
                    Log out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => navigate(login_path)}
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
