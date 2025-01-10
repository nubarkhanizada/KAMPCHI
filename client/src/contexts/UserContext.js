import React, { createContext, useState, useEffect } from "react";
import services from "../api/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const decodedUser = await services.authAPI.decodeToken();
          setUser(decodedUser);
        } catch (error) {
          console.error("Failed to decode token:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };
    verifyUser();
  }, [token]);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    services.authAPI.logoutCustomer();
    setToken(null);
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;