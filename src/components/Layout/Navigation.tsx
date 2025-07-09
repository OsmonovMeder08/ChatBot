import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  Cloud, 
  MessageCircle, 
  User, 
  BarChart3, 
  Info,
  Menu,
  X
} from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation';

interface NavigationProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isOpen, onToggle }) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  const navigation = [
    { name: t('home'), href: '/', icon: Home },
    { name: t('weather'), href: '/weather', icon: Cloud },
    { name: t('chat'), href: '/chat', icon: MessageCircle },
    { name: t('analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('profile'), href: '/profile', icon: User },
    { name: t('about'), href: '/about', icon: Info },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-colors duration-200"
      >
        {isOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
      </button>

      {/* Navigation sidebar */}
      <nav className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900/95 backdrop-blur-md border-r border-white/10
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <h1 className="text-xl font-bold gradient-text">MEDA</h1>
          </div>

          <ul className="space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={() => window.innerWidth < 768 && onToggle()}
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-blue-400' 
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Navigation;