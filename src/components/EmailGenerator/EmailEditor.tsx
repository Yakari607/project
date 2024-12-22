import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Send, X } from 'lucide-react';

interface EmailEditorProps {
  initialContent: string;
  onClose: () => void;
  onSend: (content: string) => void;
}

const EmailEditor: React.FC<EmailEditorProps> = ({ initialContent, onClose, onSend }) => {
  const [content, setContent] = useState(initialContent);

  const handleSend = useCallback(() => {
    onSend(content);
    onClose();
  }, [content, onClose, onSend]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onMouseDown={handleOverlayClick}
      >
        <motion.div
          className="bg-gray-900 rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-800 flex items-center justify-between">
            <h2 className="text-lg font-medium text-white">Modifier l'email</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Zone de texte */}
          <div className="flex-1 p-4 overflow-auto">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full min-h-[400px] bg-black/30 text-white rounded-lg p-4 
                         resize-none focus:ring-2 focus:ring-[#1E90FF] 
                         focus:outline-none placeholder-gray-400"
              placeholder="Tapez ou modifiez le contenu de votre email ici..."
            />
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={handleSend}
              className="flex items-center space-x-2 bg-[#1E90FF] hover:bg-[#87CEFA]
                         text-white px-6 py-2 rounded-full text-sm transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Envoyer</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default EmailEditor;