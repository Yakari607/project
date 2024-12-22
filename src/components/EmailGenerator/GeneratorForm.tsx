import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';

interface GeneratorFormProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
}

const GeneratorForm: React.FC<GeneratorFormProps> = ({ onGenerate, isLoading }) => {
  const [prompt, setPrompt] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="w-full space-y-4"
    >
      <div>
        <motion.label
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          htmlFor="prompt"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Décrivez l'email que vous souhaitez générer
        </motion.label>
        
        <motion.textarea
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          id="prompt"
          rows={4}
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-[#1E90FF] focus:outline-none transition-all"
          placeholder="Ex: Répondre poliment à un client mécontent concernant un retard de livraison..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      <AnimatedButton
        type="submit"
        disabled={isLoading || !prompt.trim()}
        isLoading={isLoading}
        loadingText="Génération en cours..."
        icon={<Send className="w-5 h-5" />}
      >
        Générer l'email
      </AnimatedButton>
    </motion.form>
  );
};

export default GeneratorForm;