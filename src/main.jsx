import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Header from "./Components/Header.jsx";
import { Toolbar } from "@mui/material";
import { ContextProvider } from "./Context/Context.jsx";
import GlobalAlert from "./Components/GloablAlert.jsx";
import UsersPage from "./pages/UsersPage.jsx";
import UserDetailsPage from "./pages/UserDetailsPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Header />
        <Toolbar />
        <Routes>
          <Route path="/" element={<UsersPage />} />
          <Route path="/:userId" element={<UserDetailsPage />} />
        </Routes>
      </BrowserRouter>
      <GlobalAlert />
    </ContextProvider>
  </StrictMode>
);
