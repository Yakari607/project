import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-black via-[#0b0f14] to-[#1E90FF] overflow-hidden">
      {/* Effet décoratif */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#1E90FF]/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#87CEFA]/20 rounded-full blur-3xl opacity-25 pointer-events-none" />

      {/* Header */}
      <header className="p-6 z-10 relative">
        <Link to="/" className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-[#1E90FF]" />
          <span className="text-white text-xl font-medium">EmailEase</span>
        </Link>
      </header>

      {/* Main Content (centre vertical/horizontal) */}
      <main className="z-10 relative flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-400 z-10 relative">
        <p className="text-sm">
          © 2024 EmailEase. Tous droits réservés.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
