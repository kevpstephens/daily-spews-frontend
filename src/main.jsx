/** ============================================================
 *! main.jsx

 * Application entry point with provider hierarchy and error boundaries.
 * Sets up routing, user context, error handling, and conditional StrictMode.
 * StrictMode only enabled in development to avoid production warnings.
 *============================================================ */

import "normalize.css";
import "./styles/global.css";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { UserProvider } from "./context";
import AppRouter from "./Router.jsx";

const isDev = import.meta.env.DEV; // Development environment check

// Render app with provider hierarchy
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {isDev ? (
      // Development: Include StrictMode for additional checks and warnings
      <StrictMode>
        <UserProvider>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </UserProvider>
      </StrictMode>
    ) : (
      // Production: Skip StrictMode to avoid unnecessary warnings
      <UserProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </UserProvider>
    )}
  </BrowserRouter>
);
