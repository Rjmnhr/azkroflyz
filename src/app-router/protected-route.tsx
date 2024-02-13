import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const accessToken = localStorage.getItem("azkroflyz-accessToken");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const path = location.pathname;

  const VerifyToken = async () => {
    try {
      const res = await fetch(
        "https://backend.2ndstorey.com/api/token/verify",
        // "http://localhost:8002/api/token/verify",
        {
          headers: {
            token: `Bearer ${accessToken}`,
          },
        }
      );

      if (res.status === 200) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err: any) {
      console.error(err);
      // Handle the error here or return an error response if needed
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    VerifyToken();
    //eslint-disable-next-line
  }, []);

  if (isAuthenticated !== null) {
    if (isAuthenticated) {
      return <>{element}</>;
    } else {
      // Redirect to the login page if not authenticated
      localStorage.removeItem("isLoggedIn");
      return <Navigate to={`/login-app?p=${path}`} />;
    }
  }

  // Default return (can be modified based on your requirements)
  return <div>Loading...</div>;
};

export default ProtectedRoute;
