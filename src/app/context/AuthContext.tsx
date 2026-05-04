import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, clearStoredToken, getStoredToken, storeToken } from '../api/client';

interface User {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isAuthLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setIsAuthLoading(false);
      return;
    }

    apiFetch<User>('/api/auth/me/')
      .then((data) => setUser(data))
      .catch(() => {
        clearStoredToken();
        setUser(null);
      })
      .finally(() => setIsAuthLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiFetch<{ token: string; user: User }>('/api/auth/login/', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      storeToken(response.token);
      setUser(response.user);
      return true;
    } catch {
      return false;
    }
  };

  const logout = () => {
    clearStoredToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isAdmin: user?.isAdmin || false,
        isAuthLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
