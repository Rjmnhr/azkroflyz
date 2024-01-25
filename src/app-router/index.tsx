import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputPage from "../pages/input-page";
import LandingPage from "../pages/landing-page";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/tool"
          element={
            <>
              <InputPage />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <LandingPage />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
