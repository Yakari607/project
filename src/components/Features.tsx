import { Mail, Bot, BarChart } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="flex flex-col items-center text-center p-6 bg-gradient-to-b from-gray-900 to-black rounded-xl">
    <div className="bg-[#1E90FF] p-4 rounded-full mb-4">
      <Icon className="h-8 w-8 text-white" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-white">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Features = () => {
  return (
    <section id="features" className="bg-black py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Les avantages de EmailEase
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={Mail}
            title="Résumé des emails"
            description="Un aperçu rapide de vos emails pour aller à l'essentiel."
          />
          <FeatureCard
            icon={Bot}
            title="Réponses automatiques"
            description="Des réponses adaptées en un clic, avec un ton professionnel."
          />
          <FeatureCard
            icon={BarChart}
            title="Statistiques"
            description="Mesurez votre productivité et voyez le temps que vous avez économisé."
          />
        </div>
      </div>
    </section>
  );
};

export default Features;