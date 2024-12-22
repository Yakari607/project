import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6">
        <div className="pt-20 pb-32 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-medium text-white mb-6 leading-tight">
            Rédigez des emails parfaits en quelques secondes
          </h1>
          <p className="text-xl text-gray-400 mb-12 leading-relaxed">
            EmailEase utilise l'intelligence artificielle pour vous aider à rédiger
            des emails professionnels et percutants, adaptés à chaque situation.
          </p>
          <Link
            to="/generator"
            className="inline-flex items-center space-x-2 bg-[#1E90FF] hover:bg-[#87CEFA] text-white px-8 py-4 rounded-full text-lg font-medium transition-all transform hover:scale-105"
          >
            <span>Essayer gratuitement</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;