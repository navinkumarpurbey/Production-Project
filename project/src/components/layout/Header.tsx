import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Activity, Sun, Moon, Laptop } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface HeaderProps {
  openAuthModal: (mode: 'login' | 'signup') => void;
}

const Header: React.FC<HeaderProps> = ({ openAuthModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { authState, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
    { name: 'Resources', path: '/resources', requiresAuth: true },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const themeOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Laptop, label: 'System' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login'); // Navigate to login after logout
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'}`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Activity className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold text-primary-600">
              HealthPredict
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              if (item.requiresAuth && !authState.isAuthenticated) {
                return null;
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-semibold transition-colors ${location.pathname === item.path
                    ? 'text-primary-600'
                    : 'text-neutral-600 hover:text-primary-600'}`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Theme Selector */}
            <div className="relative">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                className="appearance-none bg-transparent border border-neutral-200 rounded-md px-3 py-1.5 pr-8 text-sm font-medium text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* Auth Buttons */}
            {authState.isAuthenticated ? (
              <button
                type="button"
                className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-primary-600"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-neutral-600 hover:text-primary-600"
                  onClick={() => openAuthModal('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
                  onClick={() => openAuthModal('signup')}
                >
                  Sign Up
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              if (item.requiresAuth && !authState.isAuthenticated) {
                return null;
              }

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50'}`}
                >
                  {item.name}
                </Link>
              );
            })}

            {/* Mobile Theme Selector */}
            <div className="px-3 py-2">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'system')}
                className="w-full bg-transparent border border-neutral-200 rounded-md px-3 py-2 text-sm font-medium text-neutral-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {themeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Mobile Auth Buttons */}
            {authState.isAuthenticated ? (
              <button
                type="button"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-neutral-600 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => openAuthModal('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="block w-full px-3 py-2 mt-1 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  onClick={() => openAuthModal('signup')}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
