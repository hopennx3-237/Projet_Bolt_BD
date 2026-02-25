import { ReactNode } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  onNavigateToLogin: () => void;
}

export const ProtectedRoute = ({ children, onNavigateToLogin }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    onNavigateToLogin();
    return null;
  }

  return <>{children}</>;
};
