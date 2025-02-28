import React, { useContext, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ArrowLeft } from 'lucide-react'; // Import back arrow icon
import AuthContext from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back Button and Logo */}
          <div className="flex items-center space-x-4 ">
            <button 
              onClick={() => window.history.back()} 
              className="text-gray-300 cursor-pointer transform transition-all duration-300 hover:-translate-y-1 flex items-center"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <a 
              href="/" 
              className="flex items-center no-underline"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                Unhuman Hub
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && user.role === "admin" && (
              <a
                href="/admin"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Admin
              </a>
            )}
            {user && (
              <a
                href="/dashboard"
                className="text-gray-300 hover:text-white transition-colors duration-200 no-underline"
              >
                Dashboard
              </a>
            )}
            
            {user ? (
              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Logout
              </button>
            ) : (
              <a
                href="/login"
                className="no-underline px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white transition-all duration-300 transform hover:scale-105"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800">
          {user && user.role === "admin" && (
            <a
              href="/admin"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Admin
            </a>
          )}
          {user && (
            <a
              href="/dashboard"
              className="block px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Dashboard
            </a>
          )}
          {user ? (
            <button
              onClick={logout}
              className="block w-full text-left px-3 py-2 text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
            >
              Logout
            </button>
          ) : (
            <a
              href="/login"
              className="block px-3 py-2 text-purple-400 hover:text-white hover:bg-purple-600 transition-colors duration-200"
            >
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
