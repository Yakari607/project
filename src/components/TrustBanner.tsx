import { Building } from 'lucide-react';

const TrustBanner = () => {
  return (
    <section className="bg-gray-900 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-center items-center gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center space-x-2 text-gray-400">
              <Building className="h-6 w-6" />
              <span className="font-semibold">Enterprise {i}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;