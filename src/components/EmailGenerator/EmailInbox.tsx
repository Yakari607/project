import React from 'react';
import { Mail, Star, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

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

interface EmailInboxProps {
  emails: Email[];
  selectedEmail: Email | null;
  onSelectEmail: (email: Email) => void;
}

const EmailInbox: React.FC<EmailInboxProps> = ({ emails, selectedEmail, onSelectEmail }) => {
  return (
    <div className="bg-gray-900/50 rounded-lg backdrop-blur-sm">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Boîte de réception
        </h2>
      </div>
      <div className="divide-y divide-gray-800">
        {emails.map((email) => (
          <button
            key={email.id}
            onClick={() => onSelectEmail(email)}
            className={`w-full text-left p-4 hover:bg-gray-800/50 transition-colors ${
              selectedEmail?.id === email.id ? 'bg-gray-800/50' : ''
            } ${!email.isRead ? 'bg-gray-900/80' : ''}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {email.isImportant && (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  )}
                  <p className={`text-sm truncate ${email.isRead ? 'text-gray-400' : 'text-white font-medium'}`}>
                    {email.from}
                  </p>
                </div>
                <h3 className={`text-sm truncate mb-1 ${email.isRead ? 'text-gray-400' : 'text-white font-medium'}`}>
                  {email.subject}
                </h3>
                <p className="text-xs text-gray-500 truncate">{email.summary}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                {formatDistanceToNow(new Date(email.date), { addSuffix: true, locale: fr })}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmailInbox;