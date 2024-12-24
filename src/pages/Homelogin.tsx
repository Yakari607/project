import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const HomeLogin = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchEmails = async () => {
      const accessToken = localStorage.getItem('gmailAccessToken');

      if (!accessToken) {
        setErrorMessage('Token manquant. Connectez-vous à nouveau.');
        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        // Étape 1 : Obtenir les IDs des emails
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

        // Étape 2 : Récupérer les détails de chaque email
        const detailedEmails = await Promise.all(
          messages.slice(0, 10).map(async (message: any) => {
            const messageResponse = await fetch(
              `https://www.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
              {
                method: 'GET',
                headers: { Authorization: `Bearer ${accessToken}` },
              }
            );

            if (!messageResponse.ok) {
              throw new Error(`Erreur lors de la récupération du message ${message.id}`);
            }

            const messageData = await messageResponse.json();
            const subjectHeader = messageData.payload.headers.find(
              (header: any) => header.name === 'Subject'
            );
            const fromHeader = messageData.payload.headers.find(
              (header: any) => header.name === 'From'
            );

            return {
              id: message.id,
              subject: subjectHeader ? subjectHeader.value : 'Sans sujet',
              from: fromHeader ? fromHeader.value : 'Expéditeur inconnu',
              snippet: messageData.snippet,
            };
          })
        );

        setEmails(detailedEmails);
      } catch (error: any) {
        setErrorMessage(`Erreur lors de la récupération des emails : ${error.message || 'Inconnue'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmails();
  }, []);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl text-center p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Vos Emails Gmail</h1>
      <p className="text-gray-300 mb-8">
        Voici une liste des derniers emails de votre compte Gmail.
      </p>

      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader2 className="w-8 h-8 animate-spin text-white" />
        </div>
      )}

      {errorMessage && (
        <div className="mb-4 text-red-400">
          {errorMessage}
        </div>
      )}

      <div className="mt-8 text-left space-y-4">
        <h2 className="text-xl font-bold">Emails :</h2>
        {emails.length === 0 && !isLoading && !errorMessage && (
          <p className="text-gray-300">Aucun email à afficher.</p>
        )}
        {emails.map((email, index) => (
          <div key={index} className="p-4 bg-gray-800 rounded-lg shadow">
            <p className="text-white font-semibold">{email.subject}</p>
            <p className="text-gray-300 text-sm">De: {email.from}</p>
            <p className="text-gray-400 text-sm mt-2">{email.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLogin;
