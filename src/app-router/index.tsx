import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/landing-page";
import TemplateComponent from "../pages/tool-page";

const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
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
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
