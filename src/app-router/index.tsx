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
          path="/tool"
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
          path="/account"
          element={
            <>
              <AccountPage />
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
