import { Mail, Menu } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-black to-[#1E90FF] py-4">
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail className="h-8 w-8 text-white" />
          <span className="text-white text-xl font-bold">EmailEase</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white hover:text-[#87CEFA] transition-colors">Accueil</a>
          <a href="#features" className="text-white hover:text-[#87CEFA] transition-colors">Fonctionnalités</a>
          <a href="#pricing" className="text-white hover:text-[#87CEFA] transition-colors">Tarifs</a>
          <button className="bg-white text-black px-4 py-2 rounded-lg hover:bg-[#87CEFA] transition-colors">
            Connexion
          </button>
        </div>
        
        <button className="md:hidden text-white">
          <Menu className="h-6 w-6" />
        </button>
      </nav>
    </header>
  );
};

export default Header;