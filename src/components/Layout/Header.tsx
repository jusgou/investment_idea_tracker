import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-300 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center space-x-2">
              <span>InvestIdeas</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <nav className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link to="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              Dashboard
            </Link>
            <Link to="/ideas" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              Ideas
            </Link>
            <Link to="/create" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              Add Idea
            </Link>
            <Link to="/calculator" className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent hover:border-indigo-500 dark:hover:border-indigo-400 text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white">
              Calculator
            </Link>
          </nav>
          
          <div className="flex items-center">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            {/* Mobile menu button */}
            <div className="sm:hidden ml-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-900 shadow-lg absolute w-full z-20">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Dashboard
            </Link>
            <Link 
              to="/ideas" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Ideas
            </Link>
            <Link 
              to="/create" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Add Idea
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;