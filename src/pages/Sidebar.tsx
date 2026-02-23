import { useState, useEffect } from 'react';
import { X, LogOut, User, Menu } from 'lucide-react';
import { menuConfig } from '../../config/menuConfig';
import { CollapsibleSection } from './CollapsibleSection';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (path: string) => void;
}

export const Sidebar = ({ isOpen, onClose, onNavigate }: SidebarProps) => {
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    onNavigate?.(path);
    if (isMobile) {
      onClose();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-gray-950 border-r border-gray-800">
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-gray-900 font-bold text-xl">H</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-tight">Hopenn Drive</h1>
            <p className="text-gray-400 text-xs">Data Management</p>
          </div>
        </div>
        {isMobile && (
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {menuConfig.map((section) => {
          if (!section.isCollapsible) {
            const Icon = section.icon;
            const isActive = currentPath === section.path;

            return (
              <button
                key={section.id}
                onClick={() => section.path && handleNavigate(section.path)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200 rounded-lg group relative ${
                  isActive
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full" />
                )}
                <Icon className={`w-5 h-5 ${
                  isActive ? 'text-yellow-400' : 'text-gray-400 group-hover:text-yellow-400'
                } transition-colors`} />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          }

          return (
            <CollapsibleSection
              key={section.id}
              id={section.id}
              label={section.label}
              icon={section.icon}
              children={section.children || []}
              currentPath={currentPath}
              onNavigate={handleNavigate}
            />
          );
        })}
      </div>

      <div className="border-t border-gray-800 p-4 space-y-3">
        <div className="flex items-center gap-3 px-3 py-2 bg-gray-900/50 rounded-lg border border-gray-800">
          <div className="w-9 h-9 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-900" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">Admin User</p>
            <p className="text-gray-400 text-xs truncate">admin@hopenn.com</p>
          </div>
        </div>

        <div className="flex items-center justify-between px-2">
          <span className="inline-flex items-center px-2.5 py-1 text-xs font-semibold bg-yellow-400/10 text-yellow-400 rounded-full border border-yellow-400/20">
            Mode démo
          </span>
          <button
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-lg transition-colors group"
            title="Déconnexion"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
            onClick={onClose}
          />
        )}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-[260px] transform transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {sidebarContent}
        </aside>
      </>
    );
  }

  return (
    <aside className="hidden lg:block w-[260px] h-screen sticky top-0">
      {sidebarContent}
    </aside>
  );
};

export const SidebarToggle = ({ onClick }: { onClick: () => void }) => {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
};
