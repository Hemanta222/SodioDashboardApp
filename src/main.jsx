import { BrowserRouter, Route, Routes } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import UserDetailsPage from "./UserDetails/UserDetailsPage.jsx";
import UsersPage from "./Users/UsersPage.jsx";
import Header from "./Components/Header.jsx";
import { Toolbar } from "@mui/material";
import { ContextProvider } from "./Context/Context.jsx";
import GlobalAlert from "./Components/GloablAlert.jsx";

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
        {/* <Routes>
      </Routes> */}
      </BrowserRouter>
      <GlobalAlert />
    </ContextProvider>
  </StrictMode>
);
