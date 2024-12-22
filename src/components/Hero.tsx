import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="bg-black text-white py-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Automatisez vos emails, concentrez-vous sur ce qui compte.
          </h1>
          <p className="text-[#87CEFA] text-xl mb-8">
            Gagnez du temps en simplifiant votre gestion des emails grâce à l'intelligence artificielle.
          </p>
          <button className="bg-[#1E90FF] hover:bg-[#87CEFA] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2">
            <span>Essayez gratuitement pendant 10 jours</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=600"
            alt="EmailEase Interface"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;