import React from "react";
import FooterComponent from "../../components/layout/footer";
import NavBar from "../../components/layout/navbar";

const AccountPage = () => {
  return (
    <>
    <NavBar background={"white"} />
      <div className="content-wrapper" style={{marginTop:"80px"}}>
        <div className="container-xxl flex-grow-1 container-p-y">
          <h4 className="fw-bold py-3 mb-4">
            <span className="text-muted fw-light">Account Settings /</span>{" "}
            Account
          </h4>

          <div className="row">
            <div className="col-md-12">
              <ul className="nav nav-pills flex-column flex-md-row mb-3">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    <i className="bx bx-user me-1"></i> Account
                  </a>
                </li>
              </ul>
              <div className="card mb-4">
                <h5 className="card-header">Profile Details</h5>

                <div className="card-body">
                  <div className="d-flex align-items-start justify-content-lg-start align-items-sm-center gap-4">
                    <img
                      src="../assets/img/avatars/1.png"
                      alt="user-avatar"
                      className="d-block rounded"
                      height="100"
                      width="100"
                      id="uploadedAvatar"
                    />
                    <div className="button-wrapper">
                      <label
                        htmlFor="upload"
                        className="btn btn-primary me-2 mb-4"
                        tabIndex={0}
                      >
                        <span className="d-none d-sm-block">
                          Upload new photo
                        </span>
                        <i className="bx bx-upload d-block d-sm-none"></i>
                        <input
                          type="file"
                          id="upload"
                          className="account-file-input"
                          hidden
                          accept="image/png, image/jpeg"
                        />
                      </label>

                      <p className="text-muted mb-0">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                </div>
                <hr className="my-0" />
                <div className="card-body text-start">
                  <form id="formAccountSettings" method="POST">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="firstName" className="form-label">
                          First Name
                        </label>
                        <p>John</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="lastName" className="form-label">
                          Last Name
                        </label>
                        <p>Doe</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label">
                          E-mail
                        </label>
                        <p>john.doe@example.com</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="organization" className="form-label">
                          Organization
                        </label>
                        <p>Example</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label className="form-label" htmlFor="phoneNumber">
                          Phone Number
                        </label>
                        <p className="">+91 12345678910</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="address" className="form-label">
                          Address
                        </label>
                        <p>Example</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <p>Example</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="zipCode" className="form-label">
                          Zip Code
                        </label>
                        <p>12345</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label className="form-label">Country</label>
                        <p>India</p>
                      </div>
                      <div className="mb-3 col-md-6">
                        <label className="form-label">Language</label>
                        <p>English</p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card">
                <h5 className="card-header">Delete Account</h5>
                <div className="card-body">
                  <div className="mb-3 col-12 mb-0">
                    <div className="alert alert-warning">
                      <h6 className="alert-heading fw-bold mb-1">
                        Are you sure you want to delete your account?
                      </h6>
                      <p className="mb-0">
                        Once you delete your account, there is no going back.
                        Please be certain.
                      </p>
                    </div>
                  </div>
                  <form id="formAccountDeactivation">
                    <div className="form-check mb-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name="accountActivation"
                        id="accountActivation"
                      />
                      <label className="form-check-label">
                        I confirm my account deactivation
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-danger deactivate-account"
                    >
                      Deactivate Account
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FooterComponent />
      </div>
    </>
  );
};

export default AccountPage;
