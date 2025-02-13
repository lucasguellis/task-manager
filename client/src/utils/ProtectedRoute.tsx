import { useAuth } from './AuthContext.tsx';
import { Navigate } from 'react-router-dom';
import React, { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }): React.ReactElement => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!isAuthenticated()) {
      logout();
    }
  }, [isAuthenticated, logout]);

  if (!isAuthenticated()) return <Navigate to={'/login'} />;
  return <>{children}</>;
};

export default ProtectedRoute;
