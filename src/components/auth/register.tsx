import React, { FormEvent, useEffect, useState } from "react";
import AxiosInstance from "../../config/axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import NavBar from "../layout/navbar";
import { privacy_policy_path, terms_condition_path } from "../../config/config";

const RegisterComponent = () => {
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordSame, setIsPasswordSame] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Passwords do not match",
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (confirmPassword !== password) {
      error();
      return;
    }

    const lowerCasedEmail = email.toLowerCase();
    console.log(lowerCasedEmail);

    AxiosInstance.post("/api/otp/send-otp", {
      email: lowerCasedEmail,
    })
      .then(async (response) => {
        const data = await response.data;
        // Handle successful OTP request
        console.log(data);

        localStorage.setItem("email", lowerCasedEmail);
        localStorage.setItem("first_name", firstName);
        localStorage.setItem("last_name", lastName);
        localStorage.setItem("password", password);

        setIsLoading(false);
        navigate("/otp-validation");
      })
      .catch((err) => console.log(err));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevVisible) => !prevVisible);
  };

  useEffect(() => {
    if (password && confirmPassword) {
      if (password === confirmPassword) {
        setIsPasswordSame(true);
      } else {
        setIsPasswordSame(false);
      }
    }
  }, [password, confirmPassword]);
  return (
    <>
      <NavBar background={"white"} />
      <div className="main-container" style={{ height: "100vh" }}>
        <div
          className="left-container img_container"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1708604866/bkrjtlh8nakn4rdssnih.webp)`,
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat:"no-repeat",
            height: "100vh",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        ></div>
        <div className="right-container">
          <div className="right-sub-container">
            <div className="container-xxl">
              {contextHolder}
              <div className="authentication-wrapper authentication-basic container-p-y">
                <div
                  className="authentication-inner"
                  style={{
                    display: "grid",
                    placeItems: "center",
              
                  }}
                >
                  <div className="card col-12 col-lg-12">
                    <div className="card-body">
                      <div className="app-brand justify-content-center">
                        <a href="index.html" className="app-brand-link gap-2">
                          <span className="app-brand-logo demo"></span>
                          <span className="app-brand-text fs-3 mb-3 text-body fw-bolder">
                            Create your account
                          </span>
                        </a>
                      </div>

                      <form
                        id="formAuthentication"
                        className="mb-3"
                        onSubmit={handleSubmit}
                      >
                        <div className="row ">
                          <div className="mb-3 col-12 col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="first name"
                              name="first name"
                              placeholder="First name"
                              onChange={(e) => setFirstName(e.target.value)}
                            />
                          </div>
                          <div className="mb-3 col-12 col-lg-6">
                            <input
                              type="text"
                              className="form-control"
                              id="last name"
                              name="last name"
                              placeholder="Last name"
                              onChange={(e) => setLastName(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="mb-3">
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3 form-password-toggle">
                          <div className="input-group input-group-merge mb-3">
                            <input
                              type={passwordVisible ? "text" : "password"}
                              id="password"
                              className="form-control"
                              name="password"
                              placeholder="Password"
                              aria-describedby="password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <span
                              onClick={togglePasswordVisibility}
                              className="input-group-text cursor-pointer"
                            >
                              <i
                                className={`bx ${
                                  passwordVisible ? "bx-show" : "bx-hide"
                                } `}
                              ></i>
                            </span>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="confirm password"
                              className="form-control"
                              name="confirm password"
                              placeholder="confirm Password"
                              aria-describedby="confirm password"
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                            />
                            <span className="input-group-text cursor-pointer">
                              <i className="bx bx-hide"></i>
                            </span>
                          </div>
                          {isPasswordSame === false ? (
                            <p
                              style={{
                                color: "red",
                                fontSize: "14px",
                                margin: "0",
                                paddingLeft: "15px",
                              }}
                            >
                              Passwords are not matching
                            </p>
                          ) : (
                            ""
                          )}
                        </div>

                        <div className="mb-3">
                          <div className="form-check d-flex">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="terms-conditions"
                              name="terms"
                              style={{ marginRight: "8px" }}
                            />
                            <label className="form-check-label">
                              I agree to
                              <a href={privacy_policy_path}> privacy policy</a>
                             {" "} and <a href={terms_condition_path}>conditions</a>
                            </label>
                          </div>
                        </div>
                        <button className="btn btn-primary d-grid w-100">
                          {isLoading ? <LoadingOutlined /> : "Sign up"}
                        </button>
                      </form>

                      <p className="text-center">
                        <span>Already have an account?</span>
                        <a href="/login">
                          {" "}
                          <span>Sign in instead</span>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterComponent;
