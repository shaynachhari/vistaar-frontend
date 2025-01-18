import React, { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    console.log("from auth context ");
    
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setAuthData({ token }); 
    }
  }, []);

  const login = (token) => {
    setAuthData({ token });
    localStorage.setItem("jwtToken", token);
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem("jwtToken");
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider}
export default AuthContext