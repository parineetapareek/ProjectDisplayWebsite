import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const initialAuthUser = localStorage.getItem("Users");
  const [authUser, setAuthUser] = useState(
    initialAuthUser ? JSON.parse(initialAuthUser) : null
  );

  const handleSignup = (userData) => {
    setAuthUser(userData);
    localStorage.setItem("Users", JSON.stringify(userData));
  };

  const handleLogin = (userData) => {
    setAuthUser(userData);
    localStorage.setItem("Users", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={[authUser, handleSignup, handleLogin]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
