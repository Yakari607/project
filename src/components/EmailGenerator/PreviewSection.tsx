import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Edit, Send } from 'lucide-react';
import AnimatedButton from '../ui/AnimatedButton';

interface PreviewSectionProps {
  content: string;
  onEdit: () => void;
  onSend: () => void;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({ content, onEdit, onSend }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900/50 rounded-lg backdrop-blur-sm"
    >
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Aperçu de l'email</h3>
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5 rounded-full hover:bg-gray-800"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4 text-green-500" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Copy className="w-4 h-4" />
                </motion.div>
              )}
            </AnimatePresence>
            <span>{copied ? 'Copié!' : 'Copier'}</span>
          </motion.button>

          {content && (
            <>
              <AnimatedButton
                onClick={onEdit}
                variant="secondary"
                icon={<Edit className="w-4 h-4" />}
              >
                Modifier
              </AnimatedButton>
              
              <AnimatedButton
                onClick={onSend}
                icon={<Send className="w-4 h-4" />}
              >
                Envoyer
              </AnimatedButton>
            </>
          )}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6"
      >
        <div className="prose prose-invert max-w-none">
          <AnimatePresence mode="wait">
            {content ? (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="whitespace-pre-wrap"
              >
                {content}
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-400 italic"
              >
                L'email généré apparaîtra ici...
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PreviewSection;