
const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EmailEase</h3>
            <p className="text-gray-400">
              Simplifiez votre gestion d'emails grâce à l'intelligence artificielle.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens utiles</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-[#87CEFA]">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-[#87CEFA]">Conditions générales</a></li>
              <li><a href="#" className="hover:text-[#87CEFA]">Contact</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Nous contacter</h3>
            <p className="text-gray-400">
              support@emailease.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© 2024 EmailEase - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;