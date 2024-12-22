import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import EmailForm from './EmailForm';
import EmailPreview from './EmailPreview';
import EmailInbox from './EmailInbox';
import EmailDetail from './EmailDetail';
import ToneSelector from './ToneSelector';
import { Sparkles } from 'lucide-react';
import { sampleEmails, inboxEmails } from '../../utils/sampleData';

const EmailGenerator = () => {
  const location = useLocation();
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTone, setSelectedTone] = useState('professional');
  const [selectedEmail, setSelectedEmail] = useState(null);

  // Simuler la génération d'email avec les exemples
  const handleGenerate = async (prompt: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Chercher un exemple similaire ou utiliser une réponse par défaut
      const similarEmail = sampleEmails.find(email => 
        email.prompt.toLowerCase().includes(prompt.toLowerCase()) ||
        prompt.toLowerCase().includes(email.prompt.toLowerCase())
      );
      
      const response = similarEmail ? similarEmail.response : `Cher client,

Je vous remercie de votre message.

[Réponse générée pour: "${prompt}"]

Cordialement,
L'équipe EmailEase`;
      
      setGeneratedEmail(response);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la réponse à un email
  const handleEmailResponse = (summary: string) => {
    handleGenerate(summary);
  };

  // Utiliser le prompt du template si disponible
  React.useEffect(() => {
    const state = location.state as { prompt?: string };
    if (state?.prompt) {
      handleGenerate(state.prompt);
    }
  }, [location.state]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <Sparkles className="w-8 h-8 text-[#1E90FF]" />
          <h1 className="text-3xl font-medium text-white">Générateur d'emails</h1>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <EmailInbox
              emails={inboxEmails}
              selectedEmail={selectedEmail}
              onSelectEmail={setSelectedEmail}
            />
            {selectedEmail && (
              <EmailDetail
                email={selectedEmail}
                onRespond={handleEmailResponse}
              />
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-lg font-medium text-white mb-4">Choisissez le ton</h2>
              <ToneSelector selectedTone={selectedTone} onToneChange={setSelectedTone} />
            </div>

            <EmailForm onGenerate={handleGenerate} isLoading={isLoading} />
            
            <EmailPreview content={generatedEmail} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailGenerator;