import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/landing-page";
import TemplateComponent from "../pages/tool-page";
import InputPage from "../pages/input-page";
import HomePage from "../pages/home-page";
import UnderMaintenance from "../components/misc/under-maintenance";
import LoginComponent from "../components/auth/login";
import RegisterComponent from "../components/auth/register";

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
            <>
              <TemplateComponent />
            </>
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
          path="/sign-up"
          element={
            <>
              <RegisterComponent />
            </>
          }
        />
        <Route
          path="/demo"
          element={
            <div
              style={{ display: "grid", placeItems: "center", height: "100vh" }}
            >
              <UnderMaintenance />
            </div>
          }
        />
        <Route
          path="/input"
          element={
            <div style={{ display: "grid", placeItems: "center" }}>
              <InputPage />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
