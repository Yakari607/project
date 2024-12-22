import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface Email {
  id: number;
  from: string;
  subject: string;
  date: string;
  content: string;
  summary: string;
  isRead: boolean;
  isImportant: boolean;
}

interface EmailDetailProps {
  email: Email;
  onRespond: (summary: string) => void;
}

const EmailDetail: React.FC<EmailDetailProps> = ({ email, onRespond }) => {
  return (
    <div className="bg-gray-900/50 rounded-lg backdrop-blur-sm p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {email.isImportant && (
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            )}
            <h2 className="text-xl font-medium text-white">{email.subject}</h2>
          </div>
          <p className="text-sm text-gray-400">De: {email.from}</p>
          <p className="text-sm text-gray-500">
            {new Date(email.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </p>
        </div>
        <button
          onClick={() => onRespond(email.summary)}
          className="flex items-center gap-2 bg-[#1E90FF] hover:bg-[#87CEFA] text-white px-4 py-2 rounded-full text-sm transition-colors"
        >
          <span>Répondre</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-white mb-2">Résumé</h3>
        <p className="text-sm text-gray-400 bg-black/30 rounded-lg p-4">
          {email.summary}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-white mb-2">Contenu de l'email</h3>
        <div className="bg-black/30 rounded-lg p-4">
          <p className="text-sm text-gray-400 whitespace-pre-wrap">{email.content}</p>
        </div>
      </div>
    </div>
  );
};

export default EmailDetail;