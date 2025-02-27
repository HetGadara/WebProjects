import React, { createContext, useState, useContext, useEffect } from 'react';
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('authUser ') || 'null');
    if (savedUser) {
      setAuth(savedUser);
    }
  }, []);

  const login = (user) => {
    setAuth(user);
    localStorage.setItem('authUser ', JSON.stringify(user));
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('authUser ');
  };

  const isAuthenticated = auth !== null;

  return <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>{children}</AuthContext.Provider>;
};
