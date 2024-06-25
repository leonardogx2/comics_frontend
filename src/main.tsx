import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/userContext";
import "./index.css";
import { CookieProvider } from "./context/cookieContext";
import { MainRoutes } from "./routes/RouteAccessController";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CookieProvider>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </CookieProvider>
  </React.StrictMode>
);
