import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LandingPageStyled } from "./style";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
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

  const handleNavigate = () => {
    if (isMobile) {
      navigate("/input");
    } else {
      navigate("/tool");
    }
  };

  return (
    <div>
      <LandingPageStyled>
        <div
          className="overflow-hidden content-space-t-lg-1"
          style={{ background: "white", height: "100vh" }}
        >
          <div className="container position-relative  content-space-b-2">
            <div>
              <img
                className="img-fluid "
                height={250}
                width={250}
                src="https://res.cloudinary.com/dsw1ubwyh/image/upload/v1692624513/btwkzb24s2odtvrkew12.png"
                alt="na"
              />
              {/* <span className="text-cap">Azkroflyz</span> */}
            </div>

            <div className="w-lg-75 mx-lg-auto">
              <div className="text-center mb-5">
                <h1 style={{ fontWeight: "bold" }} className="display-4">
                  <strong>Are you a college student? </strong>
                </h1>
                <h2 className="text-primary fs-2 mb-3">
                  {" "}
                  How do you become a founder?
                </h2>
                <p className="fs-3 container px-lg-5">
                  We have interviewed thousands of successful founders and
                  reviewed many successful business owners. We have studied
                  patterns of success and our Machine Learning based algorithm
                  will determine the best career path for you
                </p>
              </div>
            </div>

            <div className="w-lg-65 mx-lg-auto">
              <form>
                <div className="input-card input-card-sm">
                  <button
                    onClick={handleNavigate}
                    className="cta btn-primary w-50 mt-3"
                  >
                    <span>Get Started</span>
                    <svg width="15px" height="10px" viewBox="0 0 13 10">
                      <path d="M1,5 L11,5"></path>
                      <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LandingPageStyled>
    </div>
  );
};

export default LandingPage;
