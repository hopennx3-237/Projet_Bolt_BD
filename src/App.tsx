import { useState } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Cities } from './pages/Cities';
import { Agencies } from './pages/Agencies';
import { Zones } from './pages/Zones';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { ProtectedRoute } from './components/ProtectedRoute';
import { useAuth } from './contexts/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('/dashboard');
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const publicPages = ['/login', '/signup', '/forgot-password', '/reset-password'];
  const isPublicPage = publicPages.includes(currentPage);

  if (!isAuthenticated && !isPublicPage) {
    setCurrentPage('/login');
  }

  const renderPage = () => {
    switch (currentPage) {
      case '/login':
        return <Login onNavigate={setCurrentPage} />;
      case '/signup':
        return <Signup onNavigate={setCurrentPage} />;
      case '/forgot-password':
        return <ForgotPassword onNavigate={setCurrentPage} />;
      case '/reset-password':
        return <ResetPassword onNavigate={setCurrentPage} />;
      case '/cities':
        return <Cities />;
      case '/agencies':
        return <Agencies />;
      case '/zones':
        return <Zones />;
      case '/dashboard':
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated && isPublicPage) {
    return renderPage();
  }

  return (
    <ProtectedRoute onNavigateToLogin={() => setCurrentPage('/login')}>
      <AppLayout onNavigate={setCurrentPage}>
        {renderPage()}
      </AppLayout>
    </ProtectedRoute>
  );
}

export default App;
