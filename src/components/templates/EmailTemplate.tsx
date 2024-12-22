import React from 'react';
import { ArrowRight } from 'lucide-react';

interface EmailTemplateProps {
  subject: string;
  prompt: string;
  response: string;
  onUse: () => void;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ subject, prompt, response, onUse }) => {
  return (
    <div className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <h3 className="text-xl font-medium text-white mb-2">{subject}</h3>
      <p className="text-gray-400 text-sm mb-4">{prompt}</p>
      <div className="bg-black/30 rounded-lg p-4 mb-4">
        <p className="text-gray-300 text-sm whitespace-pre-wrap">{response}</p>
      </div>
      <button
        onClick={onUse}
        className="flex items-center space-x-2 text-[#1E90FF] hover:text-[#87CEFA] transition-colors text-sm"
      >
        <span>Utiliser ce modèle</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default EmailTemplate;