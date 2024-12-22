// LoginForm.jsx
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [emails, setEmails] = useState<any[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const accessToken = credential.accessToken;

        const response = await fetch('http://localhost:5000/api/emails', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ accessToken })
        });
        

        if (!response.ok) {
          // Réponse non 2xx, on essaie de lire le texte d’erreur
          const text = await response.text();
          console.error('Erreur du serveur :', text);
          setErrorMessage('Impossible de récupérer les emails. Vérifiez le serveur.');
          return;
        }

        // Ici, on suppose que la réponse est du JSON valide
        const data = await response.json();
        setEmails(data);
      }
    } catch (error: any) {
      console.error('Erreur de connexion:', error.message || error);
      setErrorMessage(`Erreur lors de la connexion : ${error.message || 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl text-center p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenue sur EmailEase
      </h1>
      <p className="text-gray-300 mb-8">
        Connectez-vous pour voir vos emails Gmail.
      </p>

      {errorMessage && (
        <div className="mb-4 text-red-400">
          {errorMessage}
        </div>
      )}

      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 
                   rounded-lg shadow-lg flex items-center justify-center space-x-3 transition 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span>Continuer avec Google</span>
          </>
        )}
      </button>

      <div className="mt-8 text-left space-y-4">
        <h2 className="text-xl font-bold">Vos Emails :</h2>
        {emails.length === 0 && !errorMessage && (
          <p className="text-gray-300">Aucun email à afficher.</p>
        )}
        {emails.map((email, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg shadow">
            <p className="text-white font-semibold">{email?.subject}</p>
            <p className="text-gray-300 text-sm">De: {email?.from}</p>
            <p className="text-gray-400 text-sm mt-2">{email?.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoginForm;
