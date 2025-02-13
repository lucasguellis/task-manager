import React from 'react';
import apis from '../../api';
import { decryptJwt } from './jwt.ts';

interface AuthContextType {
  login: (credentials: LoginRequest) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getUserId: () => string;
}

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const getToken = () => localStorage.getItem('token');
const setToken = (token: string) => localStorage.setItem('token', token);
const removeToken = () => localStorage.removeItem('token');

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const logout = () => {
    removeToken();
  };

  const login = async (credentials: LoginRequest) => {
    await apis
      .login(credentials)
      .then((res) => {
        setToken(res.data.token);
      })
      .catch((err) => {
        throw new Error(err.response?.data.error);
      });
  };

  const isAuthenticated = () => {
    const token = getToken();
    if (!token) return false;

    const payload = decryptJwt(token);
    return !!payload;
  };

  const getUserId = () => {
    const token = getToken();
    if (!token) throw new Error('No token found');

    const payload = decryptJwt(token);
    if (!payload) throw new Error('Invalid token');
    return payload.userId;
  };

  return (
    <AuthContext.Provider
      value={React.useMemo(
        () => ({ login, logout, isAuthenticated, getUserId }),
        [],
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
