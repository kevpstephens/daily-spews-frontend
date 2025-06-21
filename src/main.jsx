import "normalize.css";
import "./styles/global.css";
import AppRouter from "./Router.jsx";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { UserProvider } from "./context";

const isDev = import.meta.env.DEV;

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    {isDev ? (
      <StrictMode>
        <UserProvider>
          <ErrorBoundary>
            <AppRouter />
          </ErrorBoundary>
        </UserProvider>
      </StrictMode>
    ) : (
      <UserProvider>
        <ErrorBoundary>
          <AppRouter />
        </ErrorBoundary>
      </UserProvider>
    )}
  </BrowserRouter>
);
