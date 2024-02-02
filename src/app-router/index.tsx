import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "../pages/landing-page";
import TemplateComponent from "../pages/tool-page";
import InputPage from "../pages/input-page";

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
        <Route
          path="/input"
          element={
            <div style={{display:"grid",placeItems:"center"}}>
              <InputPage />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
