import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { authState } = useAuth();
  const location = useLocation();

  if (authState.isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-primary-200 mb-4"></div>
          <div className="h-4 w-24 bg-primary-100 rounded"></div>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated) {
    // Redirect to home page if not authenticated
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected route
  return <>{children}</>;
};

export default ProtectedRoute;