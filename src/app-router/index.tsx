import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/home-page";
import LoginComponent from "../components/auth/login";
import RegisterComponent from "../components/auth/register";
import PageNotFound from "../components/misc/page-not-found";
import DemoVideo from "../pages/demo-video-page";
import ProtectedRoute from "./protected-route";
import ForgotPassword from "../components/auth/forgot-password";
import DashboardPage from "../pages/dashboard-page";
import AccountPage from "../pages/account-page";
import {
  dashboard_path,
  demo_video_path,
  home_path,
  login_app_path,
  login_path,
  privacy_policy_path,
  registration_path,
  reset_password_path,
  terms_condition_path,
  user_account_path,
} from "../config/config";
import TermsAndConditions from "../components/legal/terms-and-conditions";
import PrivacyPolicy from "../components/legal/privacy-policy";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={home_path}
          element={
            <>
              <HomePage />
            </>
          }
        />

        <Route
          path={dashboard_path}
          element={
            <ProtectedRoute
              element={
                <>
                  <DashboardPage />
                </>
              }
            />
          }
        />

        <Route
          path={user_account_path}
          element={
            <>
              <AccountPage />
            </>
          }
        />

        <Route
          path={login_path}
          element={
            <>
              <LoginComponent />
            </>
          }
        />

        <Route
          path={login_app_path}
          element={
            <>
              <LoginComponent />
            </>
          }
        />
        <Route
          path={registration_path}
          element={
            <>
              <RegisterComponent />
            </>
          }
        />
        <Route
          path={reset_password_path}
          element={
            <>
              <ForgotPassword />
            </>
          }
        />
        <Route
          path={terms_condition_path}
          element={
            <>
              <TermsAndConditions />
            </>
          }
        />
        <Route
          path={privacy_policy_path}
          element={
            <>
              <PrivacyPolicy />
            </>
          }
        />
        <Route path={demo_video_path} element={<DemoVideo />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
