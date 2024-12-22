import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/gmail.readonly');
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);

      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential && credential.accessToken) {
        const accessToken = credential.accessToken;
        localStorage.setItem('gmailAccessToken', accessToken);
      } else {
        throw new Error('Aucun jeton trouvé');
      }

      navigate('/homelogin');
    } catch (error) {
      alert(`Erreur lors de la connexion : ${error instanceof Error ? error.message : 'Erreur inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl text-center p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Bienvenue sur EmailEase</h1>
      <p className="text-gray-300 mb-8 text-sm sm:text-base leading-relaxed">
        Connectez-vous pour commencer à rédiger des emails parfaits avec votre compte Google, 
        et accéder à vos mails Gmail !
      </p>

      <button
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-4 
                   rounded-lg shadow-lg flex items-center justify-center space-x-3 transition-transform 
                   transform hover:-translate-y-0.5 hover:shadow-2xl 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/1280px-Gmail_icon_%282020%29.svg.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            <span>Continuer avec Google</span>
          </>
        )}
      </button>
    </div>
  );
}

export default LoginForm;
