import { useState } from 'react';
import { Sidebar, SidebarToggle } from '../components/layout/Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  onNavigate?: (path: string) => void;
}

export const AppLayout = ({ children, onNavigate }: AppLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onNavigate={onNavigate} />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
          <SidebarToggle onClick={() => setIsSidebarOpen(true)} />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow">
              <span className="text-gray-900 font-bold text-sm">H</span>
            </div>
            <div>
              <h1 className="text-gray-900 font-bold text-sm leading-tight">Hopenn Drive</h1>
              <p className="text-gray-500 text-xs">Data Management</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
