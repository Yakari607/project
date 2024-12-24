import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

const HomeLogin = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const decodeBase64Url = (str: string) => {
    try {
      const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      return decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join('')
      );
    } catch (e) {
      console.error('Erreur de décodage Base64URL :', e);
      return 'Impossible de décoder le contenu.';
    }
  };

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
        const response = await fetch(
          'https://www.googleapis.com/gmail/v1/users/me/messages?q=category:primary',
          {
            method: 'GET',
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Erreur serveur : ${errorText}`);
        }

        const data = await response.json();
        const messages = data.messages || [];

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
              body: messageData.payload.parts?.[0]?.body?.data
                ? decodeBase64Url(messageData.payload.parts[0].body.data)
                : 'Pas de contenu disponible',
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

  const openEmail = (email: any) => {
    setSelectedEmail(email);
  };

  const closeEmail = () => {
    setSelectedEmail(null);
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl shadow-xl text-center p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Vos Emails Gmail</h1>
      <p className="text-gray-300 mb-8">
        Voici une liste des derniers emails de votre boîte principale Gmail.
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
          <div
            key={index}
            onClick={() => openEmail(email)}
            className="w-full p-4 bg-gray-800 rounded-lg shadow text-left cursor-pointer hover:bg-gray-700 transition"
          >
            <p className="text-white font-semibold">{email.subject}</p>
            <p className="text-gray-300 text-sm">De: {email.from}</p>
            <p className="text-gray-400 text-sm mt-2">{email.snippet}</p>
          </div>
        ))}
      </div>

      {/* Modal pour afficher le contenu de l'email */}
      {selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 text-gray-900 relative">
            <button
              onClick={closeEmail}
              className="absolute top-4 right-4 text-gray-700 hover:text-red-500 transition"
            >
              X
            </button>
            <h2 className="text-xl font-bold mb-4">{selectedEmail.subject}</h2>
            <p className="text-gray-700 mb-2"><strong>De :</strong> {selectedEmail.from}</p>
            <p className="text-gray-700 mb-6">
              <strong>Extrait :</strong> {selectedEmail.snippet}
            </p>
            <p className="text-gray-900 whitespace-pre-line">
              {selectedEmail.body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeLogin;
