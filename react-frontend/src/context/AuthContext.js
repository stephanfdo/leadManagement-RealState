import React, { createContext, useState, useContext } from 'react';
import api from '../api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = async (credentials) => {
    try {
      const response = await api.login(credentials); // Use the API client's login method
      setUser({ email: credentials.email }); // Set user state
      localStorage.setItem('token', response.data.token); // Store token
    } catch (error) {
      console.error('Login failed:', error);
      throw error; // Propagate the error
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;