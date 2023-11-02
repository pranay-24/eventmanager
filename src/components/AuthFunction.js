import React, { createContext, useContext, useState } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [id, setId] = useState(null);

  const setAuthData = (authData) => {
    setToken(authData.authtoken);
    setRole(authData.role);
    setId(authData.id);
  };

  return (
    <AuthContext.Provider value={{ token, role, id, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
