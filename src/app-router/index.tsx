import { BrowserRouter, Route, Routes } from "react-router-dom";
import InputPage from "../pages/input-page";


const AppRoute: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <InputPage />
            </>
          }
        />
        {/* <Route
          path="/output"
          element={
            <>
              <OutputPage />
            </>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoute;
