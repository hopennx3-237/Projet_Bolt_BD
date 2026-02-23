import { useState } from 'react';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { MenuItem } from '../../config/menuConfig';

interface CollapsibleSectionProps {
  id: string;
  label: string;
  icon: LucideIcon;
  children: MenuItem[];
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const CollapsibleSection = ({
  id,
  label,
  icon: Icon,
  children,
  currentPath,
  onNavigate
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-2.5 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 rounded-lg group"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
          <span className="font-medium text-sm">{label}</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="py-1 space-y-0.5">
          {children.map((item) => {
            const isActive = currentPath === item.path;
            const ItemIcon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center justify-between pl-12 pr-4 py-2 text-sm transition-all duration-200 rounded-lg group relative ${
                  isActive
                    ? 'bg-yellow-400/10 text-yellow-400'
                    : 'text-gray-400 hover:bg-gray-800/30 hover:text-gray-200'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full" />
                )}
                <div className="flex items-center gap-3">
                  <ItemIcon className={`w-4 h-4 ${
                    isActive ? 'text-yellow-400' : 'text-gray-500 group-hover:text-gray-300'
                  }`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                    typeof item.badge === 'number'
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-yellow-400/20 text-yellow-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};