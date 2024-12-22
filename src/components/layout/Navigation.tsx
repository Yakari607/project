import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Mail, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { path: '/', label: 'Accueil' },
    { path: '/generator', label: 'Générateur' },
    { path: '/templates', label: 'Modèles' }
  ];

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <nav className="fixed w-full bg-black/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <NavLink to="/" className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-white" />
            <span className="text-white text-xl font-medium">EmailEase</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm ${isActive ? 'text-[#1E90FF]' : 'text-white'} hover:text-[#87CEFA] transition-colors`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button
              onClick={handleLogin}
              className="bg-[#1E90FF] hover:bg-[#87CEFA] text-white px-4 py-2 rounded-full text-sm transition-all transform hover:scale-105"
            >
              Connexion
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-md py-4">
            <div className="flex flex-col space-y-4 px-6">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-sm ${isActive ? 'text-[#1E90FF]' : 'text-white'} hover:text-[#87CEFA] transition-colors`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
              <button
                onClick={handleLogin}
                className="bg-[#1E90FF] hover:bg-[#87CEFA] text-white px-4 py-2 rounded-full text-sm transition-all transform hover:scale-105 w-full"
              >
                Connexion
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;