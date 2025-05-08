import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {children}
      </main>
      <footer className="bg-white dark:bg-gray-900 mt-auto py-4 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Investment Ideas Tracker © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;