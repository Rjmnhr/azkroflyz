import React, { useEffect, useState, FormEvent, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import AxiosInstance from "../../config/axios";
import NavBar from "../layout/navbar";
import "./style.css";

interface LoginComponentProps {}

const LoginComponent: React.FC<LoginComponentProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const Location = useLocation();

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    AxiosInstance.post("/api/user/login", formData, {
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        const data = await response.data;
        setIsLoading(false);

        if (response.status !== 200) {
          error("wrong password or username");
          // Ensure that the refs are non-null before accessing the style property
          if (emailInputRef.current) {
            emailInputRef.current.style.border = "1px solid red";
          }
          if (passwordInputRef.current) {
            passwordInputRef.current.style.border = "1px solid red";
          }
          return;
        }

        success();

        const accessToken = data.accessToken;

        if (!accessToken) return error(data);

        const userType = data.user_type;

        localStorage.setItem("userType", userType);
        localStorage.setItem("azkroflyz-accessToken", accessToken);
        localStorage.setItem("isLoggedIn", "true");
        sessionStorage.setItem("info", "");

        if (userType === "admin") {
          localStorage.setItem("isAdmin", "true");
        } else {
          localStorage.setItem("isAdmin", "false");
        }

        setEmail("");
        setPassword("");
        if (Location.pathname === "/login-app") {
          navigate("/tool");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        error("wrong password or username");
        if (emailInputRef.current) {
          emailInputRef.current.style.border = "1px solid red";
        }
        if (passwordInputRef.current) {
          passwordInputRef.current.style.border = "1px solid red";
        }

        setIsLoading(false);
        console.log(err);
      });
  };

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Login successfully",
    });
  };

  const error = (data: string) => {
    messageApi.open({
      type: "error",
      content: data,
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isLoading) {
      timeoutId = setTimeout(() => {
        setIsLoading(false);
        error("Check your internet connection");
      }, 15000);
    }
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line
  }, [isLoading]);
  return (
    <>
      <NavBar />

      <div className="main-container" style={{ height: "100vh" }}>
        <div
          className="left-container img_container"
          style={{
            backgroundImage: `url(https://res.cloudinary.com/dsw1ubwyh/image/upload/v1707721157/tzcqvmnmvqo6iijy3fs3.jpg)`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "100vh",
            transform: "translate3d(0px, 0px, 0px)",
          }}
        ></div>
        <div className="right-container">
          <div className="right-sub-container">
            <div className="container">
              {contextHolder}
              <div className="authentication-wrapper authentication-basic container-p-y">
                <div
                  className="authentication-inner"
                  style={{
                    display: "grid",
                    placeItems: "center",
                    height: "100vh",
                  }}
                >
                  <div className="card col-12">
                    <div className="card-body">
                      <div className="app-brand justify-content-center">
                        <a href="index.html" className="app-brand-link gap-2">
                          <span className="app-brand-logo demo"></span>
                          <span className="app-brand-text fs-1 mb-3  text-body fw-bolder">
                            Azkroflyz
                          </span>
                        </a>
                      </div>

                      <p className="mb-4">
                        Please sign-in to your account and start the adventure
                      </p>

                      <form
                        id="formAuthentication"
                        className="mb-3"
                        onSubmit={handleSubmit}
                      >
                        <div className="mb-3 text-start">
                          <label className="form-label text-start">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email-username"
                            placeholder="Enter your email "
                            required
                            ref={emailInputRef}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                        <div className="mb-3 form-password-toggle">
                          <div className="d-flex justify-content-between">
                            <label className="form-label">Password</label>
                            <a href="/forgot-password">
                              <small>Forgot Password?</small>
                            </a>
                          </div>
                          <div className="input-group input-group-merge">
                            <input
                              type="password"
                              id="password"
                              className="form-control"
                              name="password"
                              placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                              aria-describedby="password"
                              required
                              ref={passwordInputRef}
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className="input-group-text cursor-pointer">
                              <i className="bx bx-hide"></i>
                            </span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="form-check d-flex">
                            <input
                              className="form-check-input "
                              style={{ marginRight: "8px" }}
                              type="checkbox"
                              id="remember-me"
                            />
                            <label className="form-check-label">
                              {" "}
                              Remember Me{" "}
                            </label>
                          </div>
                        </div>
                        <div className="mb-3">
                          <button
                            style={{ height: "40px" }}
                            className="btn btn-primary d-grid w-100"
                            type="submit"
                          >
                            {isLoading ? <LoadingOutlined /> : "Sign in"}
                          </button>
                        </div>
                      </form>

                      <p className="text-center">
                        <span>New on our platform?</span>
                        <a href="/sign-up">
                          {" "}
                          <span>Create an account</span>
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

export default LoginComponent;
