import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

const Homelogin = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchEmails = async (accessToken: string) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://www.googleapis.com/gmail/v1/users/me/messages', {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erreur serveur : ${errorText}`);
      }

      const data = await response.json();
      const messages = data.messages || [];
      setEmails(messages);
    } catch (error: any) {
      setErrorMessage(`Erreur lors de la récupération des emails : ${error.message || 'Inconnue'}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem('gmailAccessToken');
    if (accessToken) {
      fetchEmails(accessToken);
    }
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl text-center p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Vos Emails Gmail</h1>

      {errorMessage && <div className="text-red-400 mb-4">{errorMessage}</div>}

      {isLoading ? (
        <Loader2 className="w-8 h-8 animate-spin mx-auto" />
      ) : emails.length > 0 ? (
        <div className="text-left space-y-4">
          {emails.map((email, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow">
              <p className="text-white font-semibold">Email ID: {email.id}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">Aucun email trouvé.</p>
      )}
    </div>
  );
};

export default Homelogin;
