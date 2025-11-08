import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const isValid = await authService.validateToken();
          if (isValid) {
            const userData = JSON.parse(localStorage.getItem('user'));
            setUser(userData);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (username, password) => {
    const response = await authService.login(username, password);
    setUser({
      username: response.username,
      email: response.email,
      role: response.role
    });
    return response;
  };

  const register = async (username, email, password) => {
    const response = await authService.register(username, email, password);
    setUser({
      username: response.username,
      email: response.email,
      role: response.role
    });
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isLoggedIn = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoggedIn,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
