/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars

import { createContext, useContext, useState, useCallback } from "react";

const ContextApi = createContext();

export const ContextProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [users, setUsers] = useState([]);
  const [city, setCity] = useState("");

  const showAlert = useCallback((message, severity = "info") => {
    setAlert({ open: true, message, severity });
  }, []);

  const closeAlert = useCallback(() => {
    setAlert((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ContextApi.Provider
      value={{ alert, showAlert, closeAlert, users, setUsers, city, setCity }}
    >
      {children}
    </ContextApi.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useContextApi = () => {
  return useContext(ContextApi);
};
