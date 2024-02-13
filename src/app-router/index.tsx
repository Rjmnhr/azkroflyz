import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/landing-page";
import TemplateComponent from "../pages/tool-page";
import HomePage from "../pages/home-page";
import LoginComponent from "../components/auth/login";
import RegisterComponent from "../components/auth/register";
import PageNotFound from "../components/misc/page-not-found";
import DemoVideo from "../pages/demo-video-page";
import ProtectedRoute from "./protected-route";
import ForgotPassword from "../components/auth/forgot-password";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
            </>
          }
        />
        <Route
          path="/landing"
          element={
            <>
              <LandingPage />
            </>
          }
        />
        <Route
          path="/tool"
          element={
            <ProtectedRoute
              element={
                <>
                  <TemplateComponent />
                </>
              }
            />
          }
        />

        <Route
          path="/login"
          element={
            <>
              <LoginComponent />
            </>
          }
        />

        <Route
          path="/login-app"
          element={
            <>
              <LoginComponent />
            </>
          }
        />
        <Route
          path="/sign-up"
          element={
            <>
              <RegisterComponent />
            </>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <>
              <ForgotPassword />
            </>
          }
        />
        <Route path="/demo" element={<DemoVideo />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
