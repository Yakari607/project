import React from 'react';
import { motion } from 'framer-motion';
import { ToneType } from '../../types/email';

interface ToneSelectorProps {
  selectedTone: ToneType;
  onToneChange: (tone: ToneType) => void;
}

const toneOptions: Array<{ value: ToneType; label: string; description: string }> = [
  {
    value: 'formal',
    label: 'Formel',
    description: 'Communication officielle et professionnelle'
  },
  {
    value: 'friendly',
    label: 'Cordial',
    description: 'Ton chaleureux et accessible'
  }
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Ton de l'email</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {toneOptions.map((tone) => (
          <motion.button
            key={tone.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onToneChange(tone.value)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedTone === tone.value
                ? 'border-[#1E90FF] bg-[#1E90FF]/10'
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="text-left">
              <h4 className="text-white font-medium mb-1">{tone.label}</h4>
              <p className="text-sm text-gray-400">{tone.description}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;