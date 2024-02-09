import React from "react";

const UnderMaintenance = () => {
  return (
    <div className="container-xxl container-p-y">
      <div className="misc-wrapper">
        <h2 className="mb-2 mx-2">Under Maintenance!</h2>
        <p className="mb-4 mx-2">
          Sorry for the inconvenience but we're performing some maintenance at
          the moment
        </p>
        <a href="/" className="btn btn-primary">
          Back to home
        </a>
        <div className="mt-4">
          <img
            src="../assets/img/illustrations/girl-doing-yoga-light.png"
            alt="girl-doing-yoga-light"
            width="500"
            className="img-fluid"
            data-app-dark-img="illustrations/girl-doing-yoga-dark.png"
            data-app-light-img="illustrations/girl-doing-yoga-light.png"
          />
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenance;
