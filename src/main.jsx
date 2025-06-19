import "./styles/global.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import AppRouter from "./Router.jsx";
import { UserProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </StrictMode>
  </BrowserRouter>
);
