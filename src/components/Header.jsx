import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/agents', label: 'Agents', icon: '🤖' },
    { path: '/analytics', label: 'Analytics', icon: '📈' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-soft border-b border-gray-200/50 sticky top-0 z-50 dark:bg-gray-900/95 dark:border-gray-700/50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center gap-3 group transition-transform duration-200 hover:scale-105"
            >
              <div className="text-2xl group-hover:animate-pulse">⚔️</div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-gray-100 leading-none">
                  AgentArmy
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-none">
                  AI Support Platform
                </span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary-100 text-primary-700 shadow-sm dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-slide-down">
            <nav className="flex flex-col gap-2">
              {navItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <div className="mt-4 px-4">
                <ConnectButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
