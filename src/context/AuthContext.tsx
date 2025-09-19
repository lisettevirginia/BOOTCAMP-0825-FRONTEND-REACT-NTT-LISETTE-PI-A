/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { type User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>; // ← Cambiado aquí
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    try {
      setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      // Limpiar el dato inválido
      localStorage.removeItem('user');
    }
  }
  setIsLoading(false);
}, []);

  const login = async (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
};

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
  <AuthContext.Provider value={{ user, login, logout, isLoading }}>
    {children}
  </AuthContext.Provider>
);
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};