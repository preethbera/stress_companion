import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, History, User, Settings, LogOut, BrainCircuit } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const navLinks = [
    { name: 'Dashboard', path: '/session', icon: LayoutDashboard },
    { name: 'History', path: '/history', icon: History },
    { name: 'Profile', path: '/profile', icon: User },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <nav className="border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/session" className="flex items-center gap-2 font-bold text-xl text-indigo-600 dark:text-indigo-400">
            <BrainCircuit size={28} />
            <span className="hidden sm:inline">Stress Companion</span>
          </Link>
          
          <div className="flex items-center gap-1 sm:gap-4">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                      : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                  }`}
                >
                  <Icon size={20} />
                  <span className="hidden md:inline text-sm font-medium">{link.name}</span>
                </Link>
              );
            })}
            <button
              onClick={logout}
              className="ml-2 p-2 text-neutral-500 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
