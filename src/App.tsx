import { useState, useEffect } from 'react';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { Cities } from './pages/Cities';
import { Agencies } from './pages/Agencies';
import { Zones } from './pages/Zones';
import { supabase } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
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

  return (
    <AppLayout onNavigate={setCurrentPage}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;
