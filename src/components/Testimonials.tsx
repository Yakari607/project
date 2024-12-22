import { Clock, Mail } from 'lucide-react';

const StatCard = ({ icon: Icon, value, label }: { icon: any, value: string, label: string }) => (
  <div className="flex items-center space-x-4 bg-gray-900 p-6 rounded-xl">
    <Icon className="h-10 w-10 text-[#1E90FF]" />
    <div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <section className="bg-black py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Rejoignez les entrepreneurs qui gagnent du temps chaque jour
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-300 mb-4">
              "EmailEase m'a permis de récupérer 10 heures par semaine pour me concentrer sur mes clients."
            </p>
            <p className="text-[#1E90FF] font-semibold">- Alex, Entrepreneur</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <p className="text-gray-300 mb-4">
              "La qualité des réponses automatiques est impressionnante. Mes clients ne voient pas la différence!"
            </p>
            <p className="text-[#1E90FF] font-semibold">- Sophie, Consultante</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <StatCard
            icon={Clock}
            value="10h/semaine"
            label="Temps économisé en moyenne"
          />
          <StatCard
            icon={Mail}
            value="50/jour"
            label="Emails traités automatiquement"
          />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;