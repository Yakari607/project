import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface EmailFormProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const EmailForm: React.FC<EmailFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div>
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
          Décrivez l'email que vous souhaitez générer
        </label>
        <textarea
          id="prompt"
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#1E90FF] focus:outline-none"
          placeholder="Ex: Répondre poliment à un client mécontent concernant un retard de livraison..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className="w-full bg-[#1E90FF] hover:bg-[#87CEFA] text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Génération en cours...</span>
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            <span>Générer l'email</span>
          </>
        )}
      </button>
    </form>
  );
};

export default EmailForm;